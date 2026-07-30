import { Component, For } from "solid-js";
import ExperienceItem from "./ExperienceItem";
import SectionHeading from "./SectionHeading";
import { experiences } from "../data/experiences";
import { PROFILE } from "../data/profile";

const MainContent: Component = () => {
  return (
    <main class="py-24 lg:w-[58%] flex-1 space-y-24 pr-1">
      <article id="about" class="mb-16 scroll-mt-24 md:mb-24 lg:mb-36">
        <div class="space-y-8">
          <SectionHeading class="mb-0">About</SectionHeading>
          <div class="space-y-6 text-gray-300 text-lg leading-8">
            <For each={PROFILE.aboutParagraphs}>
              {(paragraph) => <p>{paragraph}</p>}
            </For>
          </div>
        </div>
      </article>

      <article id="experience" class="mb-16 scroll-mt-24 md:mb-24 lg:mb-36">
        <SectionHeading>Experience</SectionHeading>
        <div class="space-y-12">
          <For each={experiences}>
            {(exp) => <ExperienceItem {...exp} />}
          </For>
        </div>
      </article>

      {/* <article id="projects" class="mb-16 scroll-mt-24 md:mb-24 lg:mb-36">
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
      </article> */}
    </main>
  );
};

export default MainContent;
