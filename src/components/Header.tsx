import { Component } from "solid-js";
import NavList from "./NavList";
import ContactIcons from "./ContactIcons";

const Header: Component = () => {
  return (
    <header class="py-24 lg:w-[40%] lg:sticky lg:top-0 lg:self-start">
      <div class="mb-16 lg:mb-24">
        <p class="text-sm font-medium uppercase tracking-[0.35em] text-teal-300/80 mb-6">Frontend Developer</p>
        <h1 class="text-5xl font-semibold tracking-tight sm:text-6xl">Hi, I'm Pavel Mikhadziuk</h1>
        <p class="mt-6 max-w-xl text-gray-300 text-lg leading-8">
          Based in Wrocław, Poland, I'm a Frontend Developer with 6+ years of experience in JavaScript and Python development.
          I specialize in building robust web applications using modern frameworks and technologies.
        </p>
      </div>

      <NavList />

      <article id="contact" class="mt-16 space-y-6 border-t border-slate-800/60 pt-8 text-gray-300 text-lg leading-8">
        <h2 class="text-4xl font-bold tracking-tight sm:text-5xl mb-8">Contact</h2>
        <p>
          Based in Wrocław, Poland. Feel free to reach out for opportunities or just to connect.
        </p>
        <ContactIcons />
      </article>
    </header>
  );
};

export default Header;
