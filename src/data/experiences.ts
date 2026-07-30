export type Experience = {
  role: string;
  period: string;
  company: string;
  bullets: string[];
};

export const experiences: Experience[] = [
  {
    role: "Frontend Developer",
    period: "Nov 2021 - Present",
    company: "Coherent Solutions",
    bullets: [
      'Developed Ember.js features for a major US educational content platform.',
      'Improved backend logic in Python for business reports and ONIX imports.',
      'Implemented synchronization between legacy monolith and new infrastructure.',
      'Built Lambda functions to support new deployment pipelines.',
      'Optimized PostgreSQL queries using indexes and Elasticsearch analysis.'
    ]
  },
  {
    role: "Frontend Developer",
    period: "Nov 2020 - Sep 2021",
    company: "ISsoft",
    bullets: [
      'Built and optimized features using Ember.js.',
      'Worked with Django and DRF for backend integrations.'
    ]
  },
  {
    role: "Frontend Developer",
    period: "Nov 2019 - Nov 2020",
    company: "av.by",
    bullets: [
      'Implemented finance campaign features and video experiences.',
      'Built admin interfaces for paid products and moderation workflows.',
      'Delivered mobile app features using React Native.'
    ]
  },
  {
    role: "Junior Developer",
    period: "Feb 2018 - Sep 2019",
    company: "Start Matter",
    bullets: [
      'Worked on mobile and web features, implementing modals and improving onboarding flows.',
      'Implemented pagination and integrations, helped stabilize media handling and editor components.',
      'Contributed to cross-cutting improvements and bug fixes that increased product reliability.'
    ]
  }
];
