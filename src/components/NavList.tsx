import { Component, For } from "solid-js";

const items = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
];

const NavList: Component = () => {
  return (
    <nav aria-label="In-page jump links">
      <ul class="list-none space-y-4">
        <For each={items}>{(it) => (
          <li>
            <a href={it.href} class="nav-link inline-flex items-center text-sm uppercase tracking-[0.28em] text-slate-300/80 hover:text-teal-300 transition-colors">
              {it.label}
            </a>
          </li>
        )}</For>
      </ul>
    </nav>
  );
};

export default NavList;
