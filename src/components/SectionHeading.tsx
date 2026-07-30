import { Component, JSX } from "solid-js";

type Props = {
  children: JSX.Element | string;
  class?: string;
};

const SectionHeading: Component<Props> = (props) => {
  return (
    <h2 class={`text-4xl font-bold tracking-tight sm:text-5xl ${props.class || "mb-8"}`}>
      {props.children}
    </h2>
  );
};

export default SectionHeading;
