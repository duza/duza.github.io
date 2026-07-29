import { Component } from "solid-js";
import SkillTag from "./SkillTag";

const MainContent: Component = () => {
  return (
    <main class="py-24 lg:w-[58%] flex-1 space-y-24 pr-1">
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
