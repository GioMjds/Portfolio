export interface TechStacks {
  name: string;
  icon: string;
}

// Assessment of skill levels for each technology, based on frequency of use and comfort level.
// This may be extensible in the future to include more levels or different criteria for assessment.
export type Level =
  | 'daily'
  | 'comfortable'
  | 'working'
  | 'familiar'
  | 'exploring';

export interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
  level: Level;
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
    name: 'JavaScript',
    icon: '/programming-icons-svg/javascript.svg',
    category: 'Programming Languages',
    level: 'comfortable',
  },
  {
    name: 'TypeScript',
    icon: '/programming-icons-svg/typescript.svg',
    category: 'Programming Languages',
    level: 'daily',
  },
  {
    name: 'Python',
    icon: '/programming-icons-svg/python.svg',
    category: 'Programming Languages',
    level: 'daily',
  },
  {
    name: 'C',
    icon: '/programming-icons-svg/c-original.svg',
    category: 'Programming Languages',
    level: 'familiar',
  },
  {
    name: 'C++',
    icon: '/programming-icons-svg/c++.svg',
    category: 'Programming Languages',
    level: 'familiar',
  },
  {
    name: 'C#',
    icon: '/programming-icons-svg/csharp.svg',
    category: 'Programming Languages',
    level: 'daily',
  },
  {
    name: 'Java',
    icon: '/programming-icons-svg/java.svg',
    category: 'Programming Languages',
    level: 'working',
  },
  {
    name: 'Go',
    icon: '/programming-icons-svg/go-original.svg',
    category: 'Programming Languages',
    level: 'working',
  },
  {
    name: 'HTML',
    icon: '/programming-icons-svg/html.svg',
    category: 'Frontend',
    level: 'comfortable',
  },
  {
    name: 'CSS',
    icon: '/programming-icons-svg/css.svg',
    category: 'Frontend',
    level: 'comfortable',
  },
  {
    name: 'Sass',
    icon: '/programming-icons-svg/sass-original.svg',
    category: 'Frontend',
    level: 'comfortable',
  },
  {
    name: 'React',
    icon: '/programming-icons-svg/react.svg',
    category: 'Frontend',
    level: 'daily',
  },
  {
    name: 'Next.js',
    icon: '/programming-icons-svg/nextjs-original.svg',
    category: 'Frontend',
    level: 'daily',
  },
  {
    name: 'Tailwind CSS',
    icon: '/programming-icons-svg/tailwindcss-original.svg',
    category: 'Frontend',
    level: 'daily',
  },
  {
    name: 'Motion',
    icon: '/programming-icons-svg/framermotion-original.svg',
    category: 'Frontend',
    level: 'daily',
  },
  {
    name: 'GSAP',
    icon: '/programming-icons-svg/gsap.webp',
    category: 'Frontend',
    level: 'exploring',
  },
  {
    name: 'Three.js',
    icon: '/programming-icons-svg/threejs-original.svg',
    category: 'Frontend',
    level: 'exploring',
  },
  {
    name: 'NestJS',
    icon: '/programming-icons-svg/nestjs-original.svg',
    category: 'Backend',
    level: 'daily',
  },
  {
    name: 'ASP.NET Core',
    icon: '/programming-icons-svg/dotnetcore-original.svg',
    category: 'Backend',
    level: 'familiar',
  },
  {
    name: 'Django',
    icon: '/programming-icons-svg/django.svg',
    category: 'Backend',
    level: 'working',
  },
  {
    name: 'FastAPI',
    icon: '/programming-icons-svg/fastapi-original.svg',
    category: 'Backend',
    level: 'comfortable',
  },
  {
    name: 'Express',
    icon: '/programming-icons-svg/express-original-wordmark.svg',
    category: 'Backend',
    level: 'familiar',
  },
  {
    name: 'C# Worker Service',
    icon: '/programming-icons-svg/csharp.svg',
    category: 'Backend',
    level: 'comfortable',
  },
  {
    name: 'PostgreSQL',
    icon: '/programming-icons-svg/postgresql.svg',
    category: 'Database',
    level: 'daily',
  },
  {
    name: 'MySQL',
    icon: '/programming-icons-svg/mysql.svg',
    category: 'Database',
    level: 'comfortable',
  },
  {
    name: 'MongoDB',
    icon: '/programming-icons-svg/mongodb-original.svg',
    category: 'Database',
    level: 'familiar',
  },
  {
    name: 'Firebase',
    icon: '/programming-icons-svg/firebase.svg',
    category: 'Database',
    level: 'comfortable',
  },
  {
    name: 'SQLite',
    icon: '/programming-icons-svg/sqlite-original.svg',
    category: 'Database',
    level: 'daily',
  },
  {
    name: 'Arduino IDE',
    icon: '/programming-icons-svg/arduino-original.svg',
    category: 'Tools',
    level: 'comfortable',
  },
  {
    name: 'Git',
    icon: '/programming-icons-svg/git.svg',
    category: 'Tools',
    level: 'daily',
  },
  {
    name: 'Docker',
    icon: '/programming-icons-svg/docker.svg',
    category: 'Tools',
    level: 'comfortable',
  },
  {
    name: 'Expo',
    icon: '/programming-icons-svg/expo-original.svg',
    category: 'Tools',
    level: 'daily',
  },
  {
    name: 'Firebase',
    icon: '/programming-icons-svg/firebase-original.svg',
    category: 'Tools',
    level: 'comfortable',
  },
  {
    name: 'Jest',
    icon: '/programming-icons-svg/jest-plain.svg',
    category: 'Tools',
    level: 'daily',
  },
  {
    name: 'OpenCV',
    icon: '/programming-icons-svg/opencv-original.svg',
    category: 'Tools',
    level: 'comfortable',
  },
  {
    name: 'Prisma',
    icon: '/programming-icons-svg/prisma-original.svg',
    category: 'Tools',
    level: 'daily',
  },
  {
    name: 'Postman',
    icon: '/programming-icons-svg/postman-original.svg',
    category: 'Tools',
    level: 'daily',
  },
  {
    name: 'PowerShell',
    icon: '/programming-icons-svg/powershell-original.svg',
    category: 'Tools',
    level: 'comfortable',
  },
  {
    name: 'Supabase',
    icon: '/programming-icons-svg/supabase-original.svg',
    category: 'Tools',
    level: 'comfortable',
  },
  {
    name: 'VS Code',
    icon: '/programming-icons-svg/vscode.svg',
    category: 'Tools',
    level: 'daily',
  },
  {
    name: 'Zustand',
    icon: '/programming-icons-svg/zustand-original.svg',
    category: 'Tools',
    level: 'daily',
  },
];

export interface QuickFact {
  label: string;
  value: string;
  iconName: 'Code2' | 'GraduationCap' | 'Briefcase' | 'Heart';
}

export const quickFacts: QuickFact[] = [
  { iconName: 'Code2', label: 'Projects Built', value: '8' },
  { iconName: 'GraduationCap', label: 'Education', value: 'BSIT-SD' },
  { iconName: 'Briefcase', label: 'Experience', value: '2+ Years' },
  { iconName: 'Heart', label: 'Based In', value: 'Philippines' },
];

export interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
  iconName: 'Code2' | 'Briefcase' | 'GraduationCap';
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    year: '2024 - Present',
    title: 'Full-Stack Developer',
    description:
      'Building web and mobile products on my own, from database schema to deployed interface, with React, Next.js, React Native, and NestJS.',
    iconName: 'Code2',
  },
  {
    year: '2024',
    title: 'Started Freelancing',
    description:
      'Took on my first freelance projects, building real applications for real clients.',
    iconName: 'Briefcase',
  },
  {
    year: '2023',
    title: 'Information Technology Student',
    description:
      'Enrolled in Laguna University for a Bachelor of Science in Information Technology, specializing in System Development.',
    iconName: 'GraduationCap',
  },
];

export const positioningStatement = `I'm a solo full-stack developer. I take products from a blank repo to a deployed app, and I'm comfortable on every layer in between: interface, API, database, and sometimes the hardware.`;

export const technicalIdentity = `My day-to-day is TypeScript with React and Next.js. When a product needs more, I go down the stack with NestJS, Express, FastAPI, Django, or ASP.NET Core, and I model data in PostgreSQL and MySQL. I also build mobile apps with React Native and Expo, and I've written the C#, Node.js, and PowerShell that connect software to physical hardware. I pick the simplest stack that fits the problem.`;

export const valueProposition = [
  'Take a product from idea to deployed without handing it off',
  'Design data models and APIs that stay simple as features grow',
  'Build apps that keep working when the connection does not',
  'Connect software to real hardware: coin acceptors, printers, and serial devices',
];

export const originStory = `I started as a designer who wanted ideas to work, not just look right. That pulled me into code, and I've been building ever since. Having both sides is why I care about the whole product: the wireframe, the schema, and everything between.`;

export const coreStrengths = [
  'Full-stack web apps: React and Next.js in front, Node, Python, or .NET behind',
  'Relational data modeling with PostgreSQL and MySQL',
  'REST API design',
  'Cross-platform mobile with React Native and Expo',
  'Offline-first apps with local SQLite storage',
  'Hardware integration: serial devices, coin acceptors, and printers',
];

export const notableAchievements = [
  'Building PrintBit, a coin-operated print kiosk, end to end: touchscreen UI, backend, coin payment, and printing',
  'Built Azurea, a full-stack hotel management system with booking verification and role-based admin tools',
  'Freelancing since 2024, building applications for real clients',
];

export const personalTouch = {
  interests: [
    'UI/UX design',
    'Building side projects',
    'Embedded hardware',
    'Gaming',
  ],
  philosophy:
    'Start with the person using it, then pick the simplest stack that serves them.',
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
