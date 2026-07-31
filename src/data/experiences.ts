export type Experience = {
  role: string;
  period: string;
  company: string;
  link?: string;
  bullets: string[];
  skills?: string[];
};

export const experiences: Experience[] = [
  {
    role: "Fullstack Developer",
    period: "Nov 2021 - Present",
    company: "Coherent Solutions",
    link: "https://www.coherentsolutions.com/",
    bullets: [
      "Developed Ember.js features for a major US educational content platform.",
      "Improved backend logic in Python for business reports and ONIX imports.",
      "Implemented synchronization between legacy monolith and new infrastructure.",
      "Built Lambda functions to support new deployment pipelines.",
      "Optimized PostgreSQL queries using indexes and Elasticsearch analysis.",
    ],
    skills: [
      "python",
      "django",
      "django-rest-framework",
      "typescript",
      "nodejs",
      "nestjs",
      "react",
      "graphql",
      "apollo-client",
      "emberjs",
      "postgresql",
      "elasticsearch",
      "aws-lambda",
      "aws-cdk",
      "celery",
      "aws-sns",
      "aws-sqs",
      "aws-eventbridge",
      "docker-sam",
      "cloudformation",
      "sequelize",
    ],
  },
  {
    role: "Frontend Developer",
    period: "Nov 2020 - Sep 2021",
    company: "ISsoft",
    link: "https://issoft.by/",
    bullets: [
      "Built and optimized features using Ember.js.",
      "Worked with Django and DRF for backend integrations.",
    ],
    skills: ["javascript", "emberjs", "python", "django", "drf"],
  },
  {
    role: "Frontend Developer",
    period: "Nov 2019 - Nov 2020",
    company: "av.by",
    link: "https://av.by/",
    bullets: [
      "Implemented finance campaign features and video experiences.",
      "Built admin interfaces for paid products and moderation workflows.",
      "Delivered mobile app features using React Native.",
    ],
    skills: [
      "javascript",
      "react",
      "react-router",
      "react-final-form",
      "redux",
      "redux-thunk",
      "nextjs",
      "nodejs",
      "express",
      "axios",
      "pm2",
    ],
  },
  {
    role: "Junior Developer",
    period: "Feb 2018 - Sep 2019",
    company: "Start Matter",
    link: "https://startmatter.com/",
    bullets: [
      "Worked on mobile and web features, implementing modals and improving onboarding flows.",
      "Implemented pagination and integrations, helped stabilize media handling and editor components.",
      "Contributed to cross-cutting improvements and bug fixes that increased product reliability.",
    ],
    skills: [
      "javascript",
      "react",
      "redux",
      "redux-saga",
      "react-native",
      "express",
      "knexjs",
      "mysql",
      "python",
      "django",
      "drf",
      "postgresql",
      "redis",
      "react-dnd",
      "fluxxor",
      "jquery",
      "tinymce",
    ],
  },
];
