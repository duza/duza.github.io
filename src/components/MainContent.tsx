import { Component } from "solid-js";
import SkillTag from "./SkillTag";
import ExperienceItem from "./ExperienceItem";
import { For } from "solid-js";
import { experiences } from "../data/experiences";

const MainContent: Component = () => {
  return (
    <main class="py-24 lg:w-[58%] flex-1 space-y-24 pr-1">
      <article id="about" class="mb-16 scroll-mt-24 md:mb-24 lg:mb-36">
        <div class="space-y-8">
          <h2 class="text-4xl font-bold tracking-tight sm:text-5xl">About</h2>
          <div class="space-y-6 text-gray-300 text-lg leading-8">
            <p>
              I'm an engineer who builds accessible, reliable web experiences end-to-end. Over the years I've
              worked on everything from frontend UI and design systems to backend APIs and data ingestion
              pipelines, focusing on performance, correctness and developer ergonomics.
            </p>
            <p>
              I enjoy translating product ideas into pragmatic implementations, improving system reliability,
              and mentoring teammates. In my spare time I build small tools to automate repetitive tasks and
              explore new web platform capabilities.
            </p>
          </div>
        </div>
      </article>

      <article id="experience" class="mb-16 scroll-mt-24 md:mb-24 lg:mb-36">
        <h2 class="text-4xl font-bold tracking-tight sm:text-5xl mb-8">Experience</h2>
        <div class="space-y-12">
          <For each={experiences}>{(e) => (
            <ExperienceItem role={e.role} period={e.period} company={e.company} bullets={e.bullets} />
          )}</For>
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
              <SkillTag>React</SkillTag>
              <SkillTag>Redux-Saga</SkillTag>
              <SkillTag>Express</SkillTag>
              <SkillTag>MySQL</SkillTag>
            </div>
          </div>

          <div class="project-card bg-slate-900/70 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
            <h3 class="text-xl font-semibold text-teal-300 mb-4">Heroic</h3>
            <p class="text-gray-300 mb-4">
              Built payments, content management, and integrations for a media platform with a modern editor experience.
            </p>
            <div class="flex flex-wrap gap-2">
              <SkillTag>Django</SkillTag>
              <SkillTag>React</SkillTag>
              <SkillTag>PostgreSQL</SkillTag>
              <SkillTag>Redis</SkillTag>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

export default MainContent;
