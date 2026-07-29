import './App.css'

function App() {
  return (
    <div class="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div class="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-4 py-16 lg:flex-row lg:items-start lg:gap-24">
        <header class="lg:w-[40%] lg:sticky lg:top-0 lg:self-start">
          <div class="mb-16 lg:mb-24">
            <p class="text-sm font-medium uppercase tracking-[0.35em] text-teal-300/80 mb-6">Frontend Developer</p>
            <h1 class="text-5xl font-semibold tracking-tight sm:text-6xl">Hi, I'm Pavel Mikhadziuk</h1>
            <p class="mt-6 max-w-xl text-gray-300 text-lg leading-8">
              Based in Wrocław, Poland, I'm a Frontend Developer with 6+ years of experience in JavaScript and Python development.
              I specialize in building robust web applications using modern frameworks and technologies.
            </p>
          </div>
          <nav aria-label="In-page jump links">
            <ul class="list-none space-y-4">
              <li>
                <a href="#about" class="nav-link inline-flex items-center text-sm uppercase tracking-[0.28em] text-slate-300/80 hover:text-teal-300 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#experience" class="nav-link inline-flex items-center text-sm uppercase tracking-[0.28em] text-slate-300/80 hover:text-teal-300 transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#projects" class="nav-link inline-flex items-center text-sm uppercase tracking-[0.28em] text-slate-300/80 hover:text-teal-300 transition-colors">
                  Projects
                </a>
              </li>
            </ul>
          </nav>

          <article id="contact" class="mt-16 space-y-6 border-t border-slate-800/60 pt-8 text-gray-300 text-lg leading-8">
            <h2 class="text-4xl font-bold tracking-tight sm:text-5xl mb-8">Contact</h2>
            <p>
              Based in Wrocław, Poland. Feel free to reach out for opportunities or just to connect.
            </p>
            <ul class="flex flex-wrap items-center gap-3 list-none p-0 m-0">
              <li>
                <a href="mailto:pavel.mikhadziuk@gmail.com" class="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/80 text-slate-200 transition hover:border-teal-300 hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300" title="Email">
                  <span class="sr-only">Email</span>
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d="M2.25 5.25C2.25 4.00736 3.25736 3 4.5 3h15c1.2426 0 2.25 1.00736 2.25 2.25v13.5c0 1.2426-1.0074 2.25-2.25 2.25h-15c-1.24264 0-2.25-1.0074-2.25-2.25V5.25Zm1.5.75v12.75c0 .41421.33579.75.75.75h15c.4142 0 .75-.3358.75-.75V6a.75.75 0 0 0-.75-.75h-15a.75.75 0 0 0-.75.75Zm1.932 1.303 6.318 4.212 6.318-4.212H5.682Zm12.318 1.852-5.832 3.887a.75.75 0 0 1-.852 0L5.75 7.853v8.147h12.5V8.103Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/pavelmikhadziuk" target="_blank" rel="noopener noreferrer" class="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/80 text-slate-200 transition hover:border-teal-300 hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300" title="LinkedIn">
                  <span class="sr-only">LinkedIn</span>
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d="M4.98 3.5a2.375 2.375 0 1 0 0 4.75 2.375 2.375 0 0 0 0-4.75ZM3.75 8.25h2.46v10.5H3.75V8.25Zm7.5 0h2.34v1.548c.327-.614 1.145-1.234 2.356-1.234 2.52 0 2.99 1.66 2.99 3.82v5.866h-2.46V13.5c0-1.105-.02-2.528-1.54-2.528-1.543 0-1.777 1.204-1.777 2.448v5.33h-2.46V8.25Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://github.com/duza" target="_blank" rel="noopener noreferrer" class="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/80 text-slate-200 transition hover:border-teal-300 hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300" title="GitHub">
                  <span class="sr-only">GitHub</span>
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d="M12 0.5C5.5.5.5 5.5.5 12c0 5 3.2 9.25 7.6 10.75.55.1.75-.25.75-.5 0-.25 0-.9 0-1.75-3.1.7-3.75-1.5-3.75-1.5-.5-1.25-1.25-1.6-1.25-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6.75 1.85 1.1.15-.8.4-1.25.75-1.55-2.45-.25-5.02-1.25-5.02-5.55 0-1.2.42-2.15 1.1-2.9-.1-.25-.5-1.25.1-2.6 0 0 .9-.3 2.95 1.1.85-.25 1.8-.4 2.75-.4.95 0 1.9.15 2.75.4 2.05-1.4 2.95-1.1 2.95-1.1.6 1.35.2 2.35.1 2.6.7.75 1.1 1.7 1.1 2.9 0 4.3-2.57 5.3-5.02 5.55.4.35.75 1.05.75 2.15 0 1.55 0 2.8 0 3.15 0 .25.2.6.75.5C20.8 21.25 24 17 24 12c0-6.5-5-11.5-12-11.5Z" />
                  </svg>
                </a>
              </li>
            </ul>
          </article>
        </header>

        <main class="lg:w-[58%] flex-1 space-y-24 pr-1">
          <article id="about" class="mb-16 scroll-mt-24 md:mb-24 lg:mb-36">
            <div class="space-y-8">
              <h2 class="text-4xl font-bold tracking-tight sm:text-5xl">About</h2>
              <div class="space-y-6 text-gray-300 text-lg leading-8">
                <p>
                  I build accessible, pixel-perfect experiences for the web. I take pride in creating thoughtful,
                  inclusive products and have a sharp eye for the little details that separate a good product from an exceptional one.
                </p>
                <p>
                  Most of my work sits at the intersection of design and engineering, where great user experience meets clean, scalable code.
                </p>
              </div>
            </div>
          </article>

          <article id="experience" class="mb-16 scroll-mt-24 md:mb-24 lg:mb-36">
            <h2 class="text-4xl font-bold tracking-tight sm:text-5xl mb-8">Experience</h2>
            <div class="space-y-12">
              <div>
                <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 class="text-xl font-semibold text-teal-300">Frontend Developer</h3>
                  <span class="text-gray-400">Nov 2021 - Present</span>
                </div>
                <h4 class="text-lg mt-3 mb-4">Coherent Solutions</h4>
                <ul class="list-disc list-inside space-y-2 text-gray-300">
                  <li>Developed Ember.js features for a major US educational content platform.</li>
                  <li>Improved backend logic in Python for business reports and ONIX imports.</li>
                  <li>Implemented synchronization between legacy monolith and new infrastructure.</li>
                  <li>Built Lambda functions to support new deployment pipelines.</li>
                  <li>Optimized PostgreSQL queries using indexes and Elasticsearch analysis.</li>
                </ul>
              </div>

              <div>
                <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 class="text-xl font-semibold text-teal-300">Frontend Developer</h3>
                  <span class="text-gray-400">Nov 2020 - Sep 2021</span>
                </div>
                <h4 class="text-lg mt-3 mb-4">ISsoft</h4>
                <ul class="list-disc list-inside space-y-2 text-gray-300">
                  <li>Built and optimized features using Ember.js.</li>
                  <li>Worked with Django and DRF for backend integrations.</li>
                </ul>
              </div>

              <div>
                <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 class="text-xl font-semibold text-teal-300">Frontend Developer</h3>
                  <span class="text-gray-400">Nov 2019 - Nov 2020</span>
                </div>
                <h4 class="text-lg mt-3 mb-4">av.by</h4>
                <ul class="list-disc list-inside space-y-2 text-gray-300">
                  <li>Implemented finance campaign features and video experiences.</li>
                  <li>Built admin interfaces for paid products and moderation workflows.</li>
                  <li>Delivered mobile app features using React Native.</li>
                </ul>
              </div>
            </div>
          </article>

          <article id="projects" class="mb-16 scroll-mt-24 md:mb-24 lg:mb-36">
            <h2 class="text-4xl font-bold tracking-tight sm:text-5xl mb-8">Projects</h2>
            <div class="grid grid-cols-1 gap-6">
              <div class="project-card bg-slate-900/70 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
                <h3 class="text-xl font-semibold text-teal-300 mb-4">BrainFM</h3>
                <p class="text-gray-300 mb-4">
                  Contributed to Brain.fm platform development, implementing modal interfaces, track autoplay,
                  and improvements to core interactions.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span class="skill-tag">React</span>
                  <span class="skill-tag">Redux-Saga</span>
                  <span class="skill-tag">Express</span>
                  <span class="skill-tag">MySQL</span>
                </div>
              </div>

              <div class="project-card bg-slate-900/70 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
                <h3 class="text-xl font-semibold text-teal-300 mb-4">Heroic</h3>
                <p class="text-gray-300 mb-4">
                  Built payments, content management, and integrations for a media platform with a modern editor experience.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span class="skill-tag">Django</span>
                  <span class="skill-tag">React</span>
                  <span class="skill-tag">PostgreSQL</span>
                  <span class="skill-tag">Redis</span>
                </div>
              </div>
            </div>
          </article>
        </main>
      </div>
    </div>
  )
}

export default App
