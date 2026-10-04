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

export const projects = [
  {
    projectId: 1,
    projectName: 'Azurea Hotel Management System',
    description:
      'A full-stack hotel management system built with React and Django. It handles room and area reservations, booking verification, cancellations, guest reviews, and admin reporting in one dashboard.',
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
      'Booking verification flow that confirms transactions before a room or area is locked in',
      'Room and area reservations with availability checks to prevent double-booking',
      'Guest-side cancellation with admin-visible transaction status',
      'Per-room and per-area guest reviews and ratings',
      'Reporting dashboard for bookings, revenue, and occupancy',
      'Role-based access with full admin CRUD for rooms, areas, amenities, and staff accounts',
    ],
    problemStatement:
      'Hotels that track bookings by hand lose time on verification and risk selling the same room twice. Cancellations, payments, and guest feedback end up scattered across chats, notebooks, and spreadsheets.',
    solutionStatement:
      'Azurea puts the whole booking lifecycle in one system: reserve, verify, confirm, cancel, review. Availability is checked server-side so a conflicting booking is rejected before it is saved, and admins manage every room, area, amenity, and report from a single role-gated dashboard.',
    performanceMetric:
      'Server-side availability check on every reservation | Zero double-bookings in test runs | Local API responses under 150ms',
  },
  {
    projectId: 2,
    projectName: 'Chatify',
    description:
      'A real-time chat app built with React and Firebase. Users sign up, see who is online, and message each other instantly with history that persists across sessions.',
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
      'Instant messaging that updates live without refreshing the page',
      'Email-based sign-up and login through Firebase Authentication',
      'Online and offline presence indicators',
      'Persistent chat history, so conversations pick up where they left off',
      'Responsive layout that works on phones and desktops',
    ],
    problemStatement:
      'Building real-time features usually means standing up and maintaining your own socket server, which is heavy for a small app. Many simple chat clones also lose messages on refresh and give no sense of who is actually available.',
    solutionStatement:
      'Chatify uses Firebase real-time listeners instead of a custom backend, so messages sync to every connected client as they are written. Auth, presence, and message storage all come from one managed service, which keeps the codebase small and the experience instant.',
    performanceMetric:
      'Live message sync with no page refresh | Full history restored on every login | Zero custom servers to maintain',
  },
  {
    projectId: 3,
    projectName: 'WiseWaste',
    description:
      'A community waste-reporting platform built with Next.js and PostgreSQL. Residents report waste problems with their location, and local admins track each issue through to resolution.',
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
      'Geolocation-tagged reports so collectors know exactly where to go',
      'Status tracking from reported to in-progress to resolved',
      'Community dashboard showing open and resolved issues in the area',
      'Admin panel to triage, assign, and close reports',
      'Mobile-first interface designed for reporting on the spot',
    ],
    problemStatement:
      'Illegal dumping and missed collections often go unreported because residents do not know who to tell, and local offices have no structured way to see where problems cluster. Reports that do get made vanish with no feedback.',
    solutionStatement:
      'WiseWaste turns a complaint into a trackable record: a photo-ready, location-tagged report with a visible status. Admins get one queue to triage, and residents can see that their report was received and acted on.',
    performanceMetric:
      'Report in a few taps from any phone | Every report carries coordinates and a visible status | PostgreSQL-backed issue queue',
  },
  {
    projectId: 4,
    projectName: 'Printify',
    description:
      'A print-on-demand web portal where users upload documents, choose print options, pay, and track their orders without visiting a counter.',
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
      'Document upload and personal file management',
      'Print customization: copies, paper size, color, and page range',
      'Integrated payment processing at checkout',
      'Order management for both customers and shop operators',
      'Order tracking from submitted to ready for pickup',
    ],
    problemStatement:
      'Walk-in print shops rely on USB drives, messaged files, and verbal instructions. Orders get mixed up, customers wait without knowing their status, and operators repeat the same clarifying questions all day.',
    solutionStatement:
      'Printify moves the whole order online. Customers upload a file, set their exact print options, and pay in one flow, while the shop receives a clean, structured order with nothing left to clarify.',
    performanceMetric:
      'Upload to paid order in a single flow | Print options captured up front, no back-and-forth | Live order status for every job',
  },
  {
    projectId: 5,
    projectName: 'Savoury',
    description:
      'A recipe-sharing platform built with the Next.js App Router and PostgreSQL. Users discover, post, and save recipes, and build a profile around what they cook.',
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
      'Recipe discovery with search across the full catalog',
      'Post and edit your own recipes',
      'Save favorite recipes to revisit later',
      "Public user profiles showing a cook's recipes",
      'Profile editing and account management',
    ],
    problemStatement:
      'Good home recipes are buried in social media posts and screenshots that are impossible to search or save. Home cooks have no single place to publish their own dishes and build a following around them.',
    solutionStatement:
      "Savoury gives recipes a proper home: structured posts that are searchable, savable, and attached to a cook's profile. Server-rendered pages with the App Router keep browsing fast, and indexed PostgreSQL queries keep search responsive as the catalog grows.",
    performanceMetric:
      'Search over 10,000 seeded recipes | Indexed PostgreSQL queries averaging 42ms locally | Server-rendered pages',
  },
  {
    projectId: 6,
    projectName: 'Commitly',
    description:
      'A React Native habit tracker for developers that combines manual daily check-ins with automatic GitHub commit data, so streaks reflect all the work you do, not just what lands on GitHub.',
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
      'Secure sign-in with Firebase Authentication',
      'Manual commit entries for work that never reaches GitHub',
      'Calendar view with streak tracking and activity stats',
      'Motivational coaching messages tied to your progress',
      '"Call It a Day" check-in to close out a session and protect your streak',
      'Preference settings for reminders and tracking',
    ],
    problemStatement:
      "GitHub's contribution graph only counts pushes, so a day of debugging, studying, or reviewing code looks like a day off. Developers lose streaks and motivation even when they worked, and nothing nudges them back.",
    solutionStatement:
      'Commitly merges two sources of truth: automatic GitHub commit data and manual entries for everything else. One calendar, one streak, and coaching prompts that keep the habit going on days the graph would stay empty.',
    performanceMetric:
      'Streaks combine GitHub and manual activity | Instant local state with Zustand | Firebase sync across sessions',
  },
  {
    projectId: 7,
    projectName: 'PrintBit',
    description:
      'A coin-operated, self-service document printing kiosk. Users upload files from their phone, pay with coins, and collect prints, photocopies, or converted soft copies without staff.',
    stacks: [
      { name: 'HTML', icon: '/programming-icons-svg/html.svg' },
      { name: 'CSS', icon: '/programming-icons-svg/css.svg' },
      { name: 'TypeScript', icon: '/programming-icons-svg/typescript.svg' },
      { name: 'Node.js', icon: '/programming-icons-svg/nodejs.svg' },
      {
        name: 'Express.js',
        icon: '/programming-icons-svg/express-original-wordmark.svg',
      },
      { name: 'SQLite', icon: '/programming-icons-svg/sqlite-original.svg' },
      { name: 'C# Worker Service', icon: '/programming-icons-svg/csharp.svg' },
      {
        name: 'PowerShell',
        icon: '/programming-icons-svg/powershell-original.svg',
      },
    ],
    image: '/projects/printbit.png',
    githubLink: 'https://github.com/GioMjds/printbit',
    status: 'finished',
    features: [
      'Wireless upload from any phone, with no cables or USB drives',
      'Three services in one kiosk: print, photocopy, and convert to a soft copy',
      'Coin payment with automatic change dispensing',
      'Touchscreen interface built for first-time users',
      'Live print job monitoring from submission to completion',
      'Secure handling with uploaded files removed after the job',
    ],
    problemStatement:
      'Campus print shops mean long queues, staff-dependent hours, and students passing documents around on shared USB drives. Cash-only service and manual handling slow everyone down and leave private files exposed.',
    solutionStatement:
      'PrintBit is an unattended kiosk that handles the whole transaction: upload, configure, pay in coins, and collect, with change returned automatically. A Node.js service coordinates coin hardware and printing, and files are deleted after the job so nothing private is left behind.',
    performanceMetric:
      'Coin verification under 1 second | Hardware, payment, and print pipeline working end to end | Files deleted after every job',
  },
  {
    projectId: 8,
    projectName: 'SariSari',
    description:
      'An offline-first mobile app for sari-sari store owners to manage inventory, record sales, and track customer utang, built with React Native, Expo, and SQLite.',
    stacks: [
      { name: 'React Native', icon: '/programming-icons-svg/react.svg' },
      { name: 'Expo', icon: '/programming-icons-svg/expo-original.svg' },
      { name: 'SQLite', icon: '/programming-icons-svg/sqlite-original.svg' },
    ],
    image: '/projects/sarisari.png',
    githubLink: 'https://github.com/GioMjds/SariSari',
    status: 'pending',
    features: [
      'Works fully offline, since all data lives on the device',
      'Inventory tracking with stock levels per product',
      'Quick sales recording with daily and period reports',
      'Utang (customer credit) ledger with balances and payment history',
      'Simple, touch-friendly interface for busy store counters',
      'Data export and backup so records are never lost with the phone',
    ],
    problemStatement:
      'Most sari-sari stores run on memory and a notebook. Owners cannot tell which items actually earn money, and utang entries get forgotten or disputed. Existing POS apps assume stable internet and a laptop, which most stores do not have.',
    solutionStatement:
      "SariSari runs entirely on the owner's phone with local SQLite storage, so it works with no signal and no subscription. Inventory, sales, and utang are tracked in one place, with export and backup as a safety net.",
    performanceMetric:
      'Fully functional with zero connectivity | Local SQLite queries under 100ms | Built for low-end Android phones',
  },
] as const satisfies Projects[];
