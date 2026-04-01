export interface TechStacks {
  name: string;
  icon: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
}

export type SkillCategory =
  | 'Programming Languages'
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'Tools';

export const skillCategories: SkillCategory[] = [
  'Programming Languages',
  'Frontend',
  'Backend',
  'Database',
  'Tools',
];

export const skills: Skill[] = [
  {
    name: 'TypeScript',
    icon: '/programming-icons-svg/typescript.svg',
    category: 'Programming Languages',
  },
  {
    name: 'JavaScript',
    icon: '/programming-icons-svg/javascript.svg',
    category: 'Programming Languages',
  },
  {
    name: 'Python',
    icon: '/programming-icons-svg/python.svg',
    category: 'Programming Languages',
  },
  {
    name: 'Java',
    icon: '/programming-icons-svg/java.svg',
    category: 'Programming Languages',
  },
  {
    name: 'C#',
    icon: '/programming-icons-svg/csharp.svg',
    category: 'Programming Languages',
  },
  {
    name: 'React',
    icon: '/programming-icons-svg/react.svg',
    category: 'Frontend',
  },
  {
    name: 'Next.js',
    icon: '/programming-icons-svg/nextjs-original.svg',
    category: 'Frontend',
  },
  {
    name: 'Tailwind CSS',
    icon: '/programming-icons-svg/tailwindcss-original.svg',
    category: 'Frontend',
  },
  {
    name: 'Framer Motion',
    icon: '/programming-icons-svg/framermotion-original.svg',
    category: 'Frontend',
  },
  {
    name: 'NestJS',
    icon: '/programming-icons-svg/nestjs-original.svg',
    category: 'Backend',
  },
  {
    name: 'ASP.NET Core',
    icon: '/programming-icons-svg/dotnetcore-original.svg',
    category: 'Backend',
  },
  {
    name: 'Django',
    icon: '/programming-icons-svg/django.svg',
    category: 'Backend',
  },
  {
    name: 'FastAPI',
    icon: '/programming-icons-svg/fastapi-original.svg',
    category: 'Backend',
  },
  {
    name: 'Express',
    icon: '/programming-icons-svg/express-original-wordmark.svg',
    category: 'Backend',
  },
  {
    name: 'PostgreSQL',
    icon: '/programming-icons-svg/postgresql.svg',
    category: 'Database',
  },
  {
    name: 'MySQL',
    icon: '/programming-icons-svg/mysql.svg',
    category: 'Database',
  },
  {
    name: 'MongoDB',
    icon: '/programming-icons-svg/mongodb-original.svg',
    category: 'Database',
  },
  {
    name: 'Firebase',
    icon: '/programming-icons-svg/firebase.svg',
    category: 'Database',
  },
  { name: 'Git', icon: '/programming-icons-svg/git.svg', category: 'Tools' },
  {
    name: 'Docker',
    icon: '/programming-icons-svg/docker.svg',
    category: 'Tools',
  },
  {
    name: 'VS Code',
    icon: '/programming-icons-svg/vscode.svg',
    category: 'Tools',
  },
];

export interface QuickFact {
  label: string;
  value: string;
  iconName: 'Code2' | 'GraduationCap' | 'Briefcase' | 'Heart';
}

export const quickFacts: QuickFact[] = [
  { iconName: 'Code2', label: 'Projects Built', value: '6+' },
  { iconName: 'GraduationCap', label: 'IT Student', value: 'BSIT-SD' },
  { iconName: 'Briefcase', label: 'Experience', value: '2+ Years' },
  { iconName: 'Heart', label: 'Coffee Cups', value: '∞' },
];

export interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
  iconName: 'Code2' | 'Briefcase' | 'GraduationCap';
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    year: '2023 - Present',
    title: 'Full-Stack Developer',
    description:
      'Building modern web applications with React, Next.js, and Django. Focused on creating seamless user experiences.',
    iconName: 'Code2',
  },
  {
    year: '2023',
    title: 'Started Freelancing',
    description:
      'Began taking on freelance projects, building real-world applications for clients.',
    iconName: 'Briefcase',
  },
  {
    year: '2022',
    title: 'Information Technology Student',
    description:
      'Enrolled in Laguna University with the course of Bachelor of Science in Information Technology specialized in System Development.',
    iconName: 'GraduationCap',
  },
];

export const positioningStatement = `Full-Stack Developer specializing in scalable web applications, mobile development, and intuitive UI/UX design.`;

export const technicalIdentity = `I build end-to-end digital solutions with a focus on performance, maintainability, and clean architecture. Strong in JavaScript, TypeScript, and Python ecosystems—from React and Next.js frontends to Django, FastAPI, Express and Nest.js backends. I design database schemas that handle complexity with elegance and craft interfaces that prioritize clarity and accessibility.`;

export const valueProposition = [
  'Design and ship production-ready applications end to end',
  'Build robust backend APIs with efficient data models',
  'Create responsive, accessible interfaces across web and mobile',
  'Optimize performance at every layer of the stack',
];

export const originStory = `Started as a designer who wanted to bring ideas to life, I transitioned into development to bridge the gap between stunning visuals and powerful functionality. Now I see the full picture—from wireframes to production code.`;

export const coreStrengths = [
  'Full-stack web application development',
  'Database architecture and optimization (PostgreSQL, MongoDB, MySQL)',
  'API design patterns (REST, WebSockets)',
  'Cross-platform development (web, mobile via React Native)',
  'UI/UX design with focus on accessibility',
  'DevOps basics and deployment workflows',
];

export const notableAchievements = [
  'Built multiple full-stack applications from concept to deployment',
  'Designed and implemented responsive UIs used across web and mobile',
  'Created scalable backend architectures with Django, FastAPI and Nest.js',
];

export const personalTouch = {
  interests: ['UI/UX design', 'Building side projects', 'Gaming'],
  philosophy: 'Ship fast, refactor often, prioritize user experience.',
};

export const aboutParagraph = `${positioningStatement}\n\n${technicalIdentity}`;

export const webDevelopment: TechStacks[] = [
  { name: 'HTML', icon: '/programming-icons-svg/html.svg' },
  { name: 'CSS', icon: '/programming-icons-svg/css.svg' },
  { name: 'JavaScript', icon: '/programming-icons-svg/javascript.svg' },
  { name: 'Sass', icon: '/programming-icons-svg/sass-original.svg' },
  { name: 'TypeScript', icon: '/programming-icons-svg/typescript.svg' },
  {
    name: 'Tailwind CSS',
    icon: '/programming-icons-svg/tailwindcss-original.svg',
  },
  { name: 'Next.js', icon: '/programming-icons-svg/nextjs-original.svg' },
  { name: 'SvelteKit', icon: '/programming-icons-svg/svelte-original.svg' },
];

export const frontendFrameworks: TechStacks[] = [
  { name: 'Astro', icon: '/programming-icons-svg/astro-original.svg' },
  { name: 'Next.js', icon: '/programming-icons-svg/nextjs-original.svg' },
  { name: 'React', icon: '/programming-icons-svg/react.svg' },
  { name: 'Svelte', icon: '/programming-icons-svg/svelte-original.svg' },
];

export const backendFrameworks: TechStacks[] = [
  { name: 'Django', icon: '/programming-icons-svg/django.svg' },
  {
    name: 'Django REST Framework',
    icon: '/programming-icons-svg/djangorest-original.svg',
  },
  {
    name: 'Express.js',
    icon: '/programming-icons-svg/express-original-wordmark.svg',
  },
  { name: 'Flask', icon: '/programming-icons-svg/flask.svg' },
  { name: 'FastAPI', icon: '/programming-icons-svg/fastapi-original.svg' },
  { name: 'Nest.js', icon: '/programming-icons-svg/nestjs-original.svg' },
];

export const programmingLanguages: TechStacks[] = [
  { name: 'JavaScript', icon: '/programming-icons-svg/javascript.svg' },
  { name: 'TypeScript', icon: '/programming-icons-svg/typescript.svg' },
  { name: 'Python', icon: '/programming-icons-svg/python.svg' },
  { name: 'Java', icon: '/programming-icons-svg/java.svg' },
  { name: 'C#', icon: '/programming-icons-svg/csharp.svg' },
  {
    name: 'Visual Basic',
    icon: '/programming-icons-svg/visualbasic-original.svg',
  },
];

export const databases: TechStacks[] = [
  { name: 'MySQL', icon: '/programming-icons-svg/mysql.svg' },
  { name: 'PostgreSQL', icon: '/programming-icons-svg/postgresql.svg' },
  { name: 'MongoDB', icon: '/programming-icons-svg/mongodb-original.svg' },
  { name: 'SQLite', icon: '/programming-icons-svg/sqlite-original.svg' },
];

export const mobileDevelopment: TechStacks[] = [
  { name: 'Java', icon: '/programming-icons-svg/java.svg' },
  { name: 'React Native', icon: '/programming-icons-svg/react.svg' },
];

export const tools: TechStacks[] = [
  { name: 'Git', icon: '/programming-icons-svg/git.svg' },
  { name: 'GitHub', icon: '/programming-icons-svg/github-original.svg' },
  {
    name: 'PowerShell',
    icon: '/programming-icons-svg/powershell-original.svg',
  },
  { name: 'Postman', icon: '/programming-icons-svg/postman-original.svg' },
  { name: 'Docker', icon: '/programming-icons-svg/docker.svg' },
  { name: 'Jest', icon: '/programming-icons-svg/jest-plain.svg' },
  { name: 'Expo', icon: '/programming-icons-svg/expo-original-wordmark.svg' },
  { name: 'Firebase', icon: '/programming-icons-svg/firebase-original.svg' },
  { name: 'Supabase', icon: '/programming-icons-svg/supabase-original.svg' },
  { name: 'GSAP', icon: '/programming-icons-svg/gsap.webp' },
  { name: 'Three.js', icon: '/programming-icons-svg/threejs-original.svg' },
];
