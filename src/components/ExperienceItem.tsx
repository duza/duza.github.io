import { Component, For } from "solid-js";

type Props = {
  role: string;
  period: string;
  company: string;
  link?: string;
  bullets: string[];
  skills?: string[];
};

const ExperienceItem: Component<Props> = (props) => {
  return (
    <div class="experience-card bg-slate-900/70 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 class="text-xl font-semibold text-teal-300">{props.role}</h3>
        <span class="text-gray-400">{props.period}</span>
      </div>
      <h4 class="text-lg mt-3 mb-4 inline-flex items-center gap-3">
        {props.company}
        {props.link && (
          <a
            href={props.link}
            target="_blank"
            rel="noopener noreferrer"
            class="text-teal-300 hover:text-teal-200 inline-flex items-center"
            title={`Open ${props.company} website`}
            aria-label={`Open ${props.company} website`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 17 L17 7" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 7h-6 M17 7v6" />
            </svg>
          </a>
        )}
      </h4>
      <ul class="list-disc list-inside space-y-2 text-gray-300">
        <For each={props.bullets}>{(b) => <li>{b}</li>}</For>
      </ul>
      {props.skills && props.skills.length > 0 && (
        <div class="mt-4 flex flex-wrap gap-2">
          <For each={props.skills}>{(s) => (
            <span class="text-xs px-2 py-1 rounded-full bg-white/5 text-teal-300 border border-white/5">{s}</span>
          )}</For>
        </div>
      )}
    </div>
  );
};

export default ExperienceItem;
