import { Component } from "solid-js";

const SkillTag: Component = (props) => {
  return <span class="skill-tag">{props.children}</span>;
};

export default SkillTag;
