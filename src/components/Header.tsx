import { Component } from "solid-js";
import NavList from "./NavList";
import ContactIcons from "./ContactIcons";
import SectionHeading from "./SectionHeading";
import { PROFILE } from "../data/profile";

const Header: Component = () => {
  return (
    <header class="py-24 lg:w-[40%] lg:sticky lg:top-0 lg:self-start">
      <div class="mb-16 lg:mb-24">
        <p class="text-sm font-medium uppercase tracking-[0.35em] text-teal-300/80 mb-6">{PROFILE.role}</p>
        <h1 class="text-5xl font-semibold tracking-tight sm:text-6xl">Hi, I'm {PROFILE.name}</h1>
        <p class="mt-6 max-w-xl text-gray-300 text-lg leading-8">
          {PROFILE.bio}
        </p>
        <p class="mt-4 max-w-xl text-gray-400 text-sm">{PROFILE.hobbies}</p>

        <div class="animate-fadeIn mt-8 rounded-3xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-sm">
          <div class="flex items-start gap-4">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400/30 to-sky-400/20 ring-1 ring-teal-300/20">
              <svg class="h-6 w-6 text-teal-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 7h14" />
                <path d="M7 3h10" />
                <path d="M8 21h8" />
                <path d="M9 10h6" />
                <path d="M9 14h4" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.3em] text-teal-300/80">{PROFILE.tagline}</p>
              <p class="mt-2 text-sm leading-7 text-slate-300">
                {PROFILE.valueProposition}
              </p>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <a
            href={PROFILE.cvUrl}
            class="inline-flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-md text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CV
          </a>
        </div>
      </div>

      <NavList />

      <article id="contact" class="mt-16 space-y-6 border-t border-slate-800/60 pt-8 text-gray-300 text-lg leading-8">
        <SectionHeading>Contact</SectionHeading>
        <p>
          {PROFILE.contactPrompt}
        </p>
        <ContactIcons />
      </article>
    </header>
  );
};

export default Header;
