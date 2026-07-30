import { Component, JSX } from "solid-js";

type Props = {
  children?: JSX.Element | string;
  class?: string;
};

const SkillTag: Component<Props> = (props) => {
  return (
    <span class={props.class || "text-xs px-2 py-1 rounded-full bg-white/5 text-teal-300 border border-white/5"}>
      {props.children}
    </span>
  );
};

export default SkillTag;
