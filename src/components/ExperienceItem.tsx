import { Component, For } from "solid-js";

type Props = {
  role: string;
  period: string;
  company: string;
  bullets: string[];
};

const ExperienceItem: Component<Props> = (props) => {
  return (
    <div>
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 class="text-xl font-semibold text-teal-300">{props.role}</h3>
        <span class="text-gray-400">{props.period}</span>
      </div>
      <h4 class="text-lg mt-3 mb-4">{props.company}</h4>
      <ul class="list-disc list-inside space-y-2 text-gray-300">
        <For each={props.bullets}>{(b) => <li>{b}</li>}</For>
      </ul>
    </div>
  );
};

export default ExperienceItem;
