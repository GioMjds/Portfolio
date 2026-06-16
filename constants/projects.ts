import type { Route } from 'next';

export type ProjectStatus =
  | 'finished'
  | 'pending'
  | 'in-development'
  | 'archived';

export interface TechStack {
  name: string;
  icon: string;
}

export interface Projects {
  projectId: number;
  projectName: string;
  description: string;
  stacks: TechStack[];
  image: string;
  githubLink?: Route;
  status: ProjectStatus;
  liveLink?: Route;
  features?: string[];
  problemStatement?: string;
  solutionStatement?: string;
  performanceMetric?: string;
}

export const projects: Projects[] = [
  {
    projectId: 1,
    projectName: 'Azurea Hotel Management System',
    description:
      'A comprehensive hotel management system built with React and Django. Features booking verification, area reservation management, transaction cancellation, guest reviews per room/area, detailed reporting dashboard, and full CRUD operations for amenities, rooms, areas, and admin users.',
    stacks: [
      { name: 'React', icon: '/programming-icons-svg/react.svg' },
      { name: 'Django', icon: '/programming-icons-svg/django.svg' },
      { name: 'MySQL', icon: '/programming-icons-svg/mysql.svg' },
      { name: 'TypeScript', icon: '/programming-icons-svg/typescript.svg' },
      {
        name: 'Tailwind CSS',
        icon: '/programming-icons-svg/tailwindcss-original.svg',
      },
    ],
    image: '/projects/azureahotel.png',
    githubLink: 'https://github.com/GioMjds/AzureaHotel',
    status: 'finished',
    features: [
      'Real-time booking management',
      'CRUD Rooms & Areas',
      'Guest reviews and ratings',
      'Comprehensive reporting dashboard',
      'User authentication and roles',
      'Responsive design for all devices',
      'CRUD Room Amenities',
      'Admin-side user management',
      'Manage Guest Bookings',
      'Review and Ratings System',
    ],
    problemStatement:
      'Manual booking tracking and room administration created high administrative overhead and double-booking risks.',
    solutionStatement:
      'Developed a unified dashboard with transaction validation, room CRUD management, and a guest rating system.',
    performanceMetric:
      'Simulated API Latency: <150ms | 99.8% booking verification accuracy',
  },
  {
    projectId: 2,
    projectName: 'Chatify',
    description:
      'A simple real-time chat application powered by React and Firebase. Enables seamless user registration, instant messaging, online status indicators, and persistent chat history with beautiful, intuitive UI design.',
    stacks: [
      { name: 'React', icon: '/programming-icons-svg/react.svg' },
      { name: 'Firebase', icon: '/programming-icons-svg/firebase.svg' },
      { name: 'JavaScript', icon: '/programming-icons-svg/javascript.svg' },
      { name: 'CSS', icon: '/programming-icons-svg/css.svg' },
      { name: 'HTML', icon: '/programming-icons-svg/html.svg' },
    ],
    image: '/projects/chatify.png',
    githubLink: 'https://github.com/GioMjds/Chatify',
    status: 'finished',
    features: [
      'Real-time messaging',
      'User authentication',
      'Online status tracking',
      'Message persistence',
      'Responsive chat interface',
    ],
  },
  {
    projectId: 3,
    projectName: 'WiseWaste',
    description:
      'An innovative waste management system that empowers communities to report and track waste issues in their local areas. Built with Next.js and PostgreSQL for scalable waste monitoring and environmental improvement.',
    stacks: [
      { name: 'Next.js', icon: '/programming-icons-svg/nextjs-original.svg' },
      { name: 'PostgreSQL', icon: '/programming-icons-svg/postgresql.svg' },
      { name: 'TypeScript', icon: '/programming-icons-svg/typescript.svg' },
      {
        name: 'Tailwind CSS',
        icon: '/programming-icons-svg/tailwindcss-original.svg',
      },
      { name: 'React', icon: '/programming-icons-svg/react.svg' },
    ],
    image: '/projects/wisewaste.png',
    githubLink: 'https://github.com/GioMjds/WiseWaste',
    status: 'pending',
    features: [
      'Geolocation-based reporting',
      'Issue tracking system',
      'Community dashboard',
      'Admin management panel',
      'Mobile-first design',
    ],
  },
  {
    projectId: 4,
    projectName: 'Printify',
    description:
      'A streamlined print-on-demand portal that simplifies document printing services. Users can easily upload documents, customize printing options, and manage orders through an elegant and user-friendly interface.',
    stacks: [
      { name: 'Next.js', icon: '/programming-icons-svg/nextjs-original.svg' },
      { name: 'PostgreSQL', icon: '/programming-icons-svg/postgresql.svg' },
      { name: 'TypeScript', icon: '/programming-icons-svg/typescript.svg' },
      { name: 'React', icon: '/programming-icons-svg/react.svg' },
      {
        name: 'Tailwind CSS',
        icon: '/programming-icons-svg/tailwindcss-original.svg',
      },
    ],
    image: '/projects/printify.png',
    githubLink: 'https://github.com/GioMjds/Printify',
    status: 'finished',
    features: [
      'Upload and manage documents',
      'File upload system',
      'Order management',
      'Payment processing',
      'Print customization',
      'Order tracking',
    ],
  },
  {
    projectId: 5,
    projectName: 'Savoury',
    description:
      'A recipe-sharing platform that connects food enthusiasts worldwide. Users can discover, share, and save recipes, create shopping lists, and follow their favorite chefs in a vibrant culinary community.',
    stacks: [
      { name: 'Next.js', icon: '/programming-icons-svg/nextjs-original.svg' },
      { name: 'TypeScript', icon: '/programming-icons-svg/typescript.svg' },
      { name: 'React', icon: '/programming-icons-svg/react.svg' },
      {
        name: 'Tailwind CSS',
        icon: '/programming-icons-svg/tailwindcss-original.svg',
      },
      { name: 'PostgreSQL', icon: '/programming-icons-svg/postgresql.svg' },
    ],
    image: '/projects/savoury.png',
    githubLink: 'https://github.com/GioMjds/Savoury',
    status: 'finished',
    features: [
      'Recipe discovery',
      'User profiles',
      'Save and share recipes',
      'Post new recipes',
      'Edit profile',
    ],
    problemStatement:
      'Cooking enthusiasts lacked an integrated tool to discover recipes and dynamically generate coordinate shopping lists.',
    solutionStatement:
      'Created a recipe-sharing portal built with Next.js App Router and PostgreSQL listing matching.',
    performanceMetric: 'PostgreSQL Indexed Search: <50ms under load',
  },
  {
    projectId: 6,
    projectName: 'Commitly',
    description:
      'Developers lose track of daily accomplishments, GitHub activity is isolated, and establishing consistent coding habits feels like an uphill battle. Commitly solves this by combining manual assessment with automated GitHub commit tracking—allowing you to see every step of your journey, celebrate streaks, and stay accountable without friction',
    stacks: [
      { name: 'React Native', icon: '/programming-icons-svg/react.svg' },
      { name: 'Firebase', icon: '/programming-icons-svg/firebase.svg' },
      { name: 'Zustand', icon: '/programming-icons-svg/zustand-original.svg' },
      {
        name: 'GitHub API',
        icon: '/programming-icons-svg/github-original.svg',
      },
    ],
    image: '/projects/commitly.jpg',
    githubLink: 'https://github.com/GioMjds/Commitly',
    status: 'finished',
    features: [
      'User Authentication using Firebase Authentication',
      'Adding Manual Entry of Commits',
      'Calendar, Streak, and Stats',
      'Motivational Coaching',
      'User Settings for Preferences',
      "'Call It a Day' Feature",
    ],
    problemStatement:
      'Developers struggle to build coding habits due to isolated GitHub streak tracking and lack of active notifications.',
    solutionStatement:
      'A React Native mobile app integrating manual entry sync, stats dashboards, and automated GitHub API calendars.',
    performanceMetric:
      'Local DB Sync: <50ms | offline persistence using Zustand & Firebase',
  },
	{
		projectId: 7,
		projectName: 'PrintBit',
		description: 'A Coin-Operated Self-Service Document Printing Kiosk Machine built using Node.js, Express.js + Static Pages.',
		stacks: [
			{ name: 'HTML', icon: '/programming-icons-svg/html.svg' },
			{ name: 'CSS', icon: '/programming-icons-svg/css.svg' },
			{ name: 'TypeScript', icon: '/programming-icons-svg/typescript.svg' },
			{ name: 'Node.js', icon: '/programming-icons-svg/nodejs.svg' },
			{ name: 'Express.js', icon: '/programming-icons-svg/express-original-wordmark.svg' },
		],
		image: '/projects/printbit.png',
		githubLink: 'https://github.com/GioMjds/printbit',
		status: 'in-development',
		features: [
			'Wireless document upload',
			'Can do print, photocopy, and scan of choice',
			'Coin-operated payment and change dispensing',
			'User-friendly touchscreen interface',
			'Real-time print job monitoring',
			'Secure document handling and disposal',
		],
		problemStatement:
			'Lack of self-service document printing stations forced manual operations in academic universities, leading to inefficiencies and long wait times.',
		solutionStatement:
			'Engineered a coin-operated document printing kiosk machine with multi-format support and real-time monitoring.',
		performanceMetric:
			'Coin Verification: <1s | Node.js serial controller verification',
	},
  {
    projectId: 8,
    projectName: 'SariSari',
    description: 'An offline-first sari-sari store inventory, sales tracker, and loan tracker mobile app built with React Native, Expo, and SQLite.',
    stacks: [
      { name: 'React Native', icon: '/programming-icons-svg/react.svg' },
      { name: 'Expo', icon: '/programming-icons-svg/expo-original.svg' },
      { name: 'SQLite', icon: '/programming-icons-svg/sqlite-original.svg' },
    ],
    image: '/projects/sarisari.png',
    githubLink: 'https://github.com/GioMjds/SariSari',
    status: 'pending',
    features: [
      'Offline-first inventory management',
      'Sales tracking and reporting',
      'Loan management for customers',
      'User-friendly mobile interface',
      'Data export and backup options',
    ],
    problemStatement: 'Small sari-sari store owners lacked accessible tools for inventory and sales management, leading to manual tracking and financial inefficiencies.',
    solutionStatement: 'Developed an offline-first React Native app with SQLite for inventory, sales, and loan tracking tailored to small sari-sari store needs.',
    performanceMetric: 'SQLite local queries: <100ms | Offline data sync on reconnect',
  }
];
