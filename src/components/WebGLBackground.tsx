import { Component, onMount, onCleanup } from "solid-js";

// ─────────────────────────────────────────────────────────────────────────────
// HOW THIS COMPONENT WORKS — high-level overview [DONE with AI help :)]
//
// WebGL is a browser API that lets JavaScript talk directly to the GPU.
// Instead of drawing DOM elements, we write small GPU programs called "shaders"
// that run in parallel for every pixel on screen — typically millions of times
// per frame.
//
// The general pipeline is:
//
//   JavaScript (CPU)                GPU
//   ─────────────────               ──────────────────────────────────────────
//   1. Compile shaders         →    tiny programs written in GLSL (a C-like
//                                   language the GPU understands)
//   2. Upload geometry         →    a full-screen rectangle (two triangles)
//   3. Upload uniforms each    →    data that is the same for every pixel:
//      frame (time, resolution)     time elapsed, canvas size, etc.
//   4. Call drawArrays()       →    GPU runs vertex shader once per corner,
//                                   then fragment shader once per pixel
//
// The two shader types:
//   • Vertex shader   — runs per vertex (corner of a triangle). Here we just
//                       pass through the quad corners unchanged.
//   • Fragment shader — runs per pixel. This is where all the visual magic
//                       lives: noise, lighting, color mixing.
// ─────────────────────────────────────────────────────────────────────────────

// ── Shader sources ────────────────────────────────────────────────────────────
//
// Shaders are written in GLSL (OpenGL Shading Language), a C-like language.
// They live as plain strings here and are compiled at runtime by the GPU driver.
// The `/* glsl */` comment is a hint for editor syntax-highlighting plugins.

const VERTEX_SRC = /* glsl */ `
  // "attribute" = per-vertex input data uploaded from JavaScript.
  // a_position holds the (x, y) coordinates of each triangle corner.
  // Values range from -1 to +1 in both axes (this is called "clip space").
  attribute vec2 a_position;

  void main() {
    // gl_Position is a built-in output — the final clip-space position of
    // this vertex. We pass z=0 (flat) and w=1 (no perspective divide needed).
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SRC = /* glsl */ `
  // "precision highp float" tells the GPU to use 32-bit floats.
  // Some mobile GPUs default to lower precision; this avoids banding artefacts.
  precision highp float;

  // "uniform" variables are set once from JavaScript and are the same for
  // every pixel in a given frame — think of them as read-only globals.
  uniform vec2  u_resolution; // canvas width and height in pixels
  uniform float u_time;       // seconds since the component mounted

  // ─── Simplex-style 2D noise ─────────────────────────────────────────────
  //
  // "Noise" here means a smooth pseudo-random function: feed it a 2D point
  // and get back a value in [-1, 1] that varies continuously as the point
  // moves. It is the foundation of the procedural terrain.

  // hash22 — a "hash without sin" by Dave Hoskins.
  //
  // A hash function maps an input to a seemingly random output.
  // We use it to get a pseudo-random gradient vector for each integer grid
  // cell. Avoiding sin() matters because sin() is slow and can have precision
  // issues on some GPUs.
  //
  // Input:  a 2D point p (usually integer grid coordinates)
  // Output: a 2D vector with components in [-1, 1]
  vec2 hash22(vec2 p) {
    // Swizzle p into a vec3 (p.xyx) and multiply by magic constants to
    // scatter the bits — makes each output component look independent.
    vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
    // Mix the components together so small input changes produce large output
    // changes (avalanche effect).
    p3 += dot(p3, p3.yzx + 33.33);
    // fract() keeps only the fractional part (range 0..1), then remap to -1..1.
    return fract((p3.xx + p3.yz) * p3.zy) * 2.0 - 1.0;
  }

  // noise — gradient noise (similar to Perlin noise).
  //
  // The space is divided into a regular grid. At each integer grid corner we
  // place a random gradient vector (from hash22). For a given point p we:
  //   1. Find which cell it is in (floor → i) and where inside (fract → f).
  //   2. Compute a dot product between the corner gradient and the vector from
  //      that corner to p. This gives the "contribution" of each corner.
  //   3. Smoothly blend the four corner contributions using quintic easing.
  //
  // The result is a smooth scalar in roughly [-0.7, 0.7].
  float noise(vec2 p) {
    vec2 i = floor(p); // integer grid cell
    vec2 f = fract(p); // position within the cell (0..1)

    // Quintic interpolation curve: 6t^5 - 15t^4 + 10t^3
    // This gives zero first AND second derivative at t=0 and t=1, which
    // eliminates visible grid artefacts ("C2 continuity").
    // Compare: a plain linear mix would show hard seams at cell boundaries.
    vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);

    // Dot products: gradient at each of the four corners × distance from it.
    float a = dot(hash22(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0));
    float b = dot(hash22(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));
    float c = dot(hash22(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));
    float d = dot(hash22(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));

    // Bilinear mix driven by the smooth curve u.
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  // ─── Fractional Brownian Motion (fBm) ───────────────────────────────────
  //
  // A single noise call gives soft, blob-like shapes (low frequency).
  // fBm layers multiple noise octaves — each one twice as fast (frequency×2)
  // and half as strong (amplitude×0.5). The result looks like natural terrain:
  // large gentle hills with small rocky details on top.
  //
  //   Octave 1: big, gentle hills      (amplitude 0.50, frequency 1.0)
  //   Octave 2: medium bumps on top    (amplitude 0.25, frequency 2.0)
  //   Octave 3: smaller ripples        (amplitude 0.125, frequency 4.0)
  //   …and so on for 5 octaves total
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p * frequency);
      frequency *= 2.0;   // each octave is twice as detailed
      amplitude *= 0.5;   // each octave is half as strong
    }
    return value; // final range roughly [-1, 1]
  }

  // ─── Height function ─────────────────────────────────────────────────────
  //
  // Wraps fBm and adds time-based drift so the terrain slowly "breathes"
  // even when the cursor is still.
  float height(vec2 p) {
    // u_time * 0.08 → very slow scroll so the motion is barely perceptible.
    // Offsetting both axes at different rates prevents linear-looking sliding.
    float t = u_time * 0.08;
    // p * 2.5 zooms into the noise field so the hills are medium-sized
    // relative to the screen. Larger multiplier → smaller, more hills.
    return fbm(p * 2.5 + vec2(t, t * 0.7));
  }

  // ─── Main fragment shader ─────────────────────────────────────────────────
  //
  // This function runs once for every pixel. gl_FragCoord is the built-in
  // input that gives the pixel's position in window coordinates (bottom-left
  // origin). We output a final color to gl_FragColor.
  void main() {
    // uv: normalized screen coordinates in [0, 1] — useful for effects that
    // should be relative to the screen edges (like the vignette below).
    vec2 uv = gl_FragCoord.xy / u_resolution;

    // p: aspect-corrected coordinates centered at the screen origin.
    // Dividing by min(width, height) means "1 unit" equals the shorter
    // screen dimension, preventing the terrain from stretching on wide screens.
    vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

    // ── Compute a surface normal from the height field ───────────────────
    //
    // We don't have actual 3D geometry, so we fake a normal by sampling the
    // height function at three nearby points and comparing.
    //
    // Think of it like measuring the slope of a hill:
    //   • Sample height directly at p         → h
    //   • Sample a tiny step to the right     → hx
    //   • Sample a tiny step upward           → hy
    //   • The differences (hx-h)/eps and (hy-h)/eps give the gradient (slope).
    //   • The normal points "away from" that slope.
    float eps = 0.005; // finite-difference step size — smaller = more detail,
                       // but too small causes floating-point precision issues
    float h   = height(p);
    float hx  = height(p + vec2(eps, 0.0));
    float hy  = height(p + vec2(0.0, eps));

    // bumpStrength controls how "steep" the hills appear to the light.
    // Higher = more dramatic light/shadow contrast.
    float bumpStrength = 1.8;
    vec3 normal = normalize(vec3(
      -(hx - h) / eps * bumpStrength, // x-component of normal
      -(hy - h) / eps * bumpStrength, // y-component of normal
      1.0                             // z always points "toward the camera"
    ));

    // ── Lambertian diffuse lighting ──────────────────────────────────────
    //
    // The simplest physically-based lighting model: brightness depends solely
    // on the angle between the surface normal and the light direction.
    //   diffuse = max(dot(normal, lightDir), 0)
    // When they point the same way (dot=1) the surface is fully lit.
    // When perpendicular or away (dot≤0) the surface is in shadow.
    vec3 lightDir = normalize(vec3(0.4, 0.6, 0.8)); // upper-right diagonal
    float diffuse = max(dot(normal, lightDir), 0.0);

    // ── Color palette ─────────────────────────────────────────────────────
    //
    // Three colors that match the site's design tokens:
    vec3 bgDark    = vec3(0.020, 0.031, 0.086); // very dark slate (~slate-950)
    vec3 bgMid     = vec3(0.035, 0.055, 0.120); // slightly lighter slate
    vec3 highlight = vec3(0.180, 0.420, 0.380); // muted teal — the accent color

    // Base: blend between the two slate values based on terrain height.
    // h * 0.5 + 0.5 remaps h from [-1,1] to [0,1] for the mix() call.
    vec3 baseColor = mix(bgDark, bgMid, h * 0.5 + 0.5);

    // Lighting: add a small amount of teal highlight proportional to how
    // directly the terrain faces the light. The 0.25 factor keeps it subtle.
    vec3 color = baseColor + diffuse * highlight * 0.25;

    // ── Vignette ──────────────────────────────────────────────────────────
    //
    // Darkens the edges of the screen by multiplying by a value slightly
    // below 1 at the corners. length(uv - 0.5) is the distance from the
    // screen center (0 at center, ~0.7 at corners).
    float vignette = 1.0 - 0.35 * length(uv - 0.5);
    color *= vignette;

    // Output the final RGBA color. Alpha is 1.0 (fully opaque).
    gl_FragColor = vec4(color, 1.0);
  }
`;

// ── WebGL helper functions ────────────────────────────────────────────────────
//
// These are utilities that set up the WebGL plumbing. In a real app you might
// import these from a shared library; here they are inlined to keep the
// component self-contained.

/**
 * Compiles a single shader (vertex or fragment) from a GLSL source string.
 *
 * WebGL compiles shaders at runtime — the GPU driver translates GLSL into
 * its own machine code each time the page loads. If the source has a syntax
 * error the driver logs it; we surface that in the console here.
 *
 * @param gl     - The WebGL rendering context
 * @param type   - gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
 * @param source - The GLSL source code as a string
 * @returns      - A compiled WebGLShader object, or null on failure
 */
function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source); // upload source text to GPU driver
  gl.compileShader(shader); // ask driver to compile it

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    // getShaderInfoLog returns the compiler error message (line numbers, etc.)
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * Links a vertex shader and a fragment shader into a WebGL "program".
 *
 * A program is the complete GPU pipeline for one draw call.
 * Linking checks that the outputs of the vertex shader match the inputs of
 * the fragment shader, and resolves all uniform/attribute locations.
 *
 * @param gl    - The WebGL rendering context
 * @param vsSrc - Vertex shader GLSL source
 * @param fsSrc - Fragment shader GLSL source
 * @returns     - A linked WebGLProgram, or null on failure
 */
function createProgram(
  gl: WebGLRenderingContext,
  vsSrc: string,
  fsSrc: string
): WebGLProgram | null {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vsSrc);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSrc);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vs); // attach both compiled shaders
  gl.attachShader(program, fs);
  gl.linkProgram(program); // link them into a single pipeline

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * WebGLBackground
 *
 * Renders a full-screen animated noise terrain into a <canvas> that sits
 * behind all other content via `position: fixed; z-index: 0`.
 *
 * Lifecycle:
 *   onMount   → get canvas ref → init WebGL → start rAF loop
 *   onCleanup → cancel rAF → remove resize listener → free GPU resources
 */
const WebGLBackground: Component = () => {
  // canvasRef will be set to the actual <canvas> DOM node by SolidJS after
  // the component mounts. We declare it here so the onMount closure can access it.
  let canvasRef: HTMLCanvasElement | undefined;

  onMount(() => {
    const canvas = canvasRef;
    if (!canvas) return;

    // ── Acquire a WebGL context ───────────────────────────────────────────
    //
    // getContext() returns the rendering context — the main object through
    // which all WebGL calls are made. We try WebGL2 first (more features,
    // ~95% browser support) and fall back to WebGL1.
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) {
      // Very old browsers or certain privacy settings may block WebGL.
      // The page still works; the background is just absent.
      console.warn("WebGL not supported — background shader disabled");
      return;
    }

    // ── Compile and link shaders ─────────────────────────────────────────
    const program = createProgram(gl, VERTEX_SRC, FRAGMENT_SRC);
    if (!program) return;

    // Tell WebGL to use this program for all subsequent draw calls.
    gl.useProgram(program);

    // ── Upload a full-screen quad ─────────────────────────────────────────
    //
    // We need geometry that covers the entire screen so the fragment shader
    // runs for every pixel. A full-screen quad is two triangles sharing a
    // diagonal edge, described by 6 vertices (no index buffer needed):
    //
    //   (-1, 1) ─────── (1, 1)
    //      │  ╲  top      │
    //      │    ╲         │
    //      │   bottom  ╲  │
    //   (-1,-1) ─────── (1,-1)
    //
    // These clip-space coordinates map exactly to the canvas edges.

    // getAttribLocation returns the numeric slot the shader bound "a_position"
    // to. We need this number to wire our buffer to the right input.
    const posAttr = gl.getAttribLocation(program, "a_position");

    // A buffer is a chunk of GPU memory. We create one and fill it with the
    // six 2D vertex positions (two floats each = 12 floats total).
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf); // "select" this buffer for next ops
    // prettier-ignore
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      // Triangle 1 (bottom-left half)
      -1, -1,   // bottom-left
       1, -1,   // bottom-right
      -1,  1,   // top-left
      // Triangle 2 (top-right half)
      -1,  1,   // top-left
       1, -1,   // bottom-right
       1,  1,   // top-right
    ]), gl.STATIC_DRAW);
    // gl.STATIC_DRAW hints that the data won't change — the driver may
    // place it in faster memory.

    // Tell WebGL how to read the buffer as vec2 attributes:
    //   • posAttr  — which attribute slot
    //   • 2        — two floats per vertex (x, y)
    //   • gl.FLOAT — data type
    //   • false    — don't normalize
    //   • 0, 0     — no stride/offset (tightly packed)
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // ── Cache uniform locations ───────────────────────────────────────────
    //
    // getUniformLocation is a relatively expensive lookup — caching the
    // result and reusing it each frame is best practice.
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");

    // ── Canvas resize logic ───────────────────────────────────────────────
    //
    // The <canvas> element has two separate size concepts:
    //   • CSS size   (canvas.style.width/height) — how big it looks on screen.
    //                We set this to 100vw × 100vh via inline styles below.
    //   • Buffer size (canvas.width/height)       — the actual pixel grid the
    //                GPU renders into. This must be set explicitly.
    //
    // DPR_SCALE < 1 renders at a lower resolution than the physical display.
    // 0.5 means we render at half size — the GPU does 4× less work, with only
    // a slight softness that is barely noticeable for a background effect.
    const DPR_SCALE = 0.5;
    function resize() {
      const dpr = window.devicePixelRatio * DPR_SCALE;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      // Tell WebGL about the new render target dimensions.
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }
    resize();
    window.addEventListener("resize", resize);

    // ── Animation loop ────────────────────────────────────────────────────
    //
    // requestAnimationFrame (rAF) asks the browser to call our function
    // before the next paint — typically 60 times per second, or at the
    // monitor's native refresh rate. It automatically pauses when the tab
    // is hidden, saving battery.
    let animId = 0;
    const startTime = performance.now(); // high-res timestamp in milliseconds

    function render() {
      // Convert milliseconds to seconds for the time uniform.
      const elapsed = (performance.now() - startTime) * 0.001;

      // Upload the latest uniform values. These must be set every frame
      // because the canvas size can change and time always advances.
      gl!.uniform2f(uResolution, canvas!.width, canvas!.height);
      gl!.uniform1f(uTime, elapsed);

      // Issue the actual draw call: draw TRIANGLES, starting at vertex 0,
      // reading 6 vertices total (our two triangles).
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);

      // Schedule the next frame.
      animId = requestAnimationFrame(render);
    }
    animId = requestAnimationFrame(render);

    // ── Cleanup on unmount ────────────────────────────────────────────────
    //
    // SolidJS calls onCleanup when the component is removed from the DOM.
    // We must cancel the rAF loop (otherwise it keeps running forever) and
    // release GPU-side resources to avoid memory leaks.
    onCleanup(() => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      gl!.deleteBuffer(buf); // free the vertex buffer on the GPU
      gl!.deleteProgram(program); // free the compiled shader program
    });
  });

  return (
    // The canvas is positioned fixed so it covers the viewport regardless of
    // scroll position. pointer-events: none ensures it never intercepts clicks
    // or hover events that should reach the content above it.
    // aria-hidden hides it from screen readers — it's purely decorative.
    <canvas
      ref={canvasRef}
      id="webgl-background"
      style={{
        position: "fixed",
        inset: "0",
        width: "100vw",
        height: "100vh",
        "z-index": "0",
        "pointer-events": "none",
      }}
      aria-hidden="true"
    />
  );
};

export default WebGLBackground;
