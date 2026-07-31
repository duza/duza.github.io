import { Component, For } from "solid-js";
import { PROFILE } from "../data/profile";

type ContactItem = {
  title: string;
  href: string;
  external?: boolean;
  pathD: string;
};

const iconStyle =
  "inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/80 text-slate-200 transition hover:border-teal-300 hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300";

const contactLinks: ContactItem[] = [
  {
    title: "Email",
    href: `mailto:${PROFILE.email}`,
    pathD:
      "M2.25 5.25C2.25 4.00736 3.25736 3 4.5 3h15c1.2426 0 2.25 1.00736 2.25 2.25v13.5c0 1.2426-1.0074 2.25-2.25 2.25h-15c-1.24264 0-2.25-1.0074-2.25-2.25V5.25Zm1.5.75v12.75c0 .41421.33579.75.75.75h15c.4142 0 .75-.3358.75-.75V6a.75.75 0 0 0-.75-.75h-15a.75.75 0 0 0-.75.75Zm1.932 1.303 6.318 4.212 6.318-4.212H5.682Zm12.318 1.852-5.832 3.887a.75.75 0 0 1-.852 0L5.75 7.853v8.147h12.5V8.103Z",
  },
  {
    title: "LinkedIn",
    href: PROFILE.socials.linkedin,
    external: true,
    pathD:
      "M4.98 3.5a2.375 2.375 0 1 0 0 4.75 2.375 2.375 0 0 0 0-4.75ZM3.75 8.25h2.46v10.5H3.75V8.25Zm7.5 0h2.34v1.548c.327-.614 1.145-1.234 2.356-1.234 2.52 0 2.99 1.66 2.99 3.82v5.866h-2.46V13.5c0-1.105-.02-2.528-1.54-2.528-1.543 0-1.777 1.204-1.777 2.448v5.33h-2.46V8.25Z",
  },
  {
    title: "GitHub",
    href: PROFILE.socials.github,
    external: true,
    pathD:
      "M12 0.5C5.5.5.5 5.5.5 12c0 5 3.2 9.25 7.6 10.75.55.1.75-.25.75-.5 0-.25 0-.9 0-1.75-3.1.7-3.75-1.5-3.75-1.5-.5-1.25-1.25-1.6-1.25-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6.75 1.85 1.1.15-.8.4-1.25.75-1.55-2.45-.25-5.02-1.25-5.02-5.55 0-1.2.42-2.15 1.1-2.9-.1-.25-.5-1.25.1-2.6 0 0 .9-.3 2.95 1.1.85-.25 1.8-.4 2.75-.4.95 0 1.9.15 2.75.4 2.05-1.4 2.95-1.1 2.95-1.1.6 1.35.2 2.35.1 2.6.7.75 1.1 1.7 1.1 2.9 0 4.3-2.57 5.3-5.02 5.55.4.35.75 1.05.75 2.15 0 1.55 0 2.8 0 3.15 0 .25.2.6.75.5C20.8 21.25 24 17 24 12c0-6.5-5-11.5-12-11.5Z",
  },
];

const ContactIcons: Component = () => {
  return (
    <ul class="flex flex-wrap items-center gap-3 list-none p-0 m-0">
      <For each={contactLinks}>
        {(item) => (
          <li>
            <a
              href={item.href}
              class={iconStyle}
              title={item.title}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span class="sr-only">{item.title}</span>
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d={item.pathD} />
              </svg>
            </a>
          </li>
        )}
      </For>
    </ul>
  );
};

export default ContactIcons;
