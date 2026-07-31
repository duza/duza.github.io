export type NavItem = {
  href: string;
  label: string;
  id: string;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "#about", label: "About", id: "about" },
  { href: "#experience", label: "Experience", id: "experience" },
  // { href: "#projects", label: "Projects", id: "projects" },
];
