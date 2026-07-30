import { Component } from "solid-js";
import NavList from "./NavList";
import ContactIcons from "./ContactIcons";

const Header: Component = () => {
  return (
    <header class="py-24 lg:w-[40%] lg:sticky lg:top-0 lg:self-start">
      <div class="mb-16 lg:mb-24">
        <p class="text-sm font-medium uppercase tracking-[0.35em] text-teal-300/80 mb-6">Full Stack Developer</p>
        <h1 class="text-5xl font-semibold tracking-tight sm:text-6xl">Hi, I'm Pavel Mikhadziuk</h1>
        <p class="mt-6 max-w-xl text-gray-300 text-lg leading-8">
          Based in Wrocław, Poland, I'm a Full Stack Developer with 8+ years of experience building web
          applications using JavaScript and Python. I work across frontend and backend boundaries to deliver
          reliable, maintainable systems that people enjoy using.
        </p>
        <p class="mt-4 max-w-xl text-gray-400 text-sm">Outside of work I enjoy swimming and playing squash.</p>
        <div class="mt-6">
          <a
            href="/CV/CV_Pavel_Mikhadziuk_FullStack_Engineer_2026-07.pdf"
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
        <h2 class="text-4xl font-bold tracking-tight sm:text-5xl mb-8">Contact</h2>
        <p>
          Feel free to reach out for opportunities or just to connect.
        </p>
        <ContactIcons />
      </article>
    </header>
  );
};

export default Header;
