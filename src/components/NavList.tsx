import { Component, For, createSignal, onMount, onCleanup } from "solid-js";
import { NAV_ITEMS } from "../data/navigation";

const NavList: Component = () => {
  const [active, setActive] = createSignal<string>(NAV_ITEMS[0].id);

  let observer: IntersectionObserver | null = null;

  onMount(() => {
    observer = new IntersectionObserver(
      (entries) => {
        // pick the entry that isIntersecting (centered) or the one with largest intersectionRatio
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          // choose the one with largest intersectionRatio
          visible.sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
          setActive((visible[0].target as HTMLElement).id);
          return;
        }
        // fallback: if none intersecting in this callback, check all sections and pick nearest to viewport top
        const sections = NAV_ITEMS
          .map((it) => document.getElementById(it.id))
          .filter(Boolean) as HTMLElement[];
        let nearest: { id: string; distance: number } | null = null;
        sections.forEach((s) => {
          const rect = s.getBoundingClientRect();
          const distance = Math.abs(rect.top || 0);
          if (!nearest || distance < nearest.distance) nearest = { id: s.id, distance };
        });
        if (nearest) setActive(nearest.id);
      },
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    // observe section elements
    NAV_ITEMS.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer?.observe(el);
    });
  });

  onCleanup(() => {
    observer?.disconnect();
    observer = null;
  });

  return (
    <nav aria-label="In-page jump links">
      <ul class="list-none space-y-4">
        <For each={NAV_ITEMS}>
          {(it) => (
            <li>
              <a
                href={it.href}
                class="nav-link inline-flex items-center text-sm uppercase tracking-[0.28em] transition-colors"
                classList={{
                  "text-slate-300/80": active() !== it.id,
                  "text-teal-300 font-semibold": active() === it.id,
                  "is-active": active() === it.id,
                }}
                onClick={() => setActive(it.id)}
              >
                {it.label}
              </a>
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
};

export default NavList;
