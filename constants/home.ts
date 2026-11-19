export const homepageSkillSet: string[] = [
  'Web/Mobile Developer',
  'UI/UX Designer',
  'Database Engineer',
];

/**
 * Homepage "Proof of Work" copy, keyed by projectId. A casual retelling of
 * each project's problem/solution statements in constants/projects.ts (the
 * project detail pages keep the formal versions). Keep every claim traceable
 * to those statements: no invented metrics, clients, or outcomes.
 */
export interface ProjectStory {
  /** Episode-style title, e.g. "The one with the double bookings". */
  episode: string;
  /** One-line hook shown under the project name. */
  logline: string;
  /** The problem, told casually. */
  itch: string;
  /** What was built, told casually. */
  build: string;
}

export const projectStories = {
  1: {
    episode: 'The one with the double bookings',
    logline: 'A hotel system that refuses to sell the same room twice.',
    itch: 'Picture a front desk running on notebooks and group chats. Verifying a booking takes forever, and one slip means two guests show up for the same room. Cancellations, payments, and reviews end up scattered everywhere.',
    build:
      'So I put the whole booking lifecycle in one place: reserve, verify, confirm, cancel, review. The server checks availability before anything is saved, so a clashing booking never makes it in. Admins run rooms, areas, amenities, and reports from one role-gated dashboard.',
  },
  2: {
    episode: 'The one where the signal drops',
    logline: 'A point of sale for the corner store that never needs Wi-Fi.',
    itch: "Most sari-sari stores run on memory and a notebook. Owners can't tell which items actually make money, and utang gets forgotten or argued over. The POS apps out there expect stable internet and a laptop, and most stores have neither.",
    build:
      "So SariSari lives entirely on the owner's phone, backed by local SQLite. No signal needed, no subscription. Inventory, sales, and utang sit in one place, with export and backup as the safety net.",
  },
  3: {
    episode: 'The one that talks to coin slots, printer, and the physical kiosk itself',
    logline: 'A printing kiosk machine that runs itself, paid via coins.',
    itch: 'Campus print shops mean long lines, hours that depend on staff, and USB drives passed from hand to hand. Cash-only, manual handling slows everyone down and leaves private files lying around.',
    build:
      'PrintBit is an unattended kiosk that handles the whole run: upload from your phone, set up the job, pay in coins, collect, and get your change back. A Node.js service talks to the coin hardware and the printer, and every file is wiped once the job is done.',
  },
  4: {
    episode: 'The one with all the paperwork',
    logline: 'Taming authority NOCs for an engineering consultancy.',
    itch: 'Every project at an engineering consultancy carries a stack of authority NOCs, each with its own reviewer, prerequisites, fees, and expiry date. Kept in folder trees and Excel masterlogs, renewals slip, versions blur, and nobody can say for sure who approved what.',
    build:
      'CVTEC EDMS pulls projects, teams, NOC registers, and document reviews into one workspace. Standard NOC blueprints per jurisdiction seed each new project, and access follows role and assignment, so contract values stay with leadership while engineers see only their own work.',
  },
} satisfies Record<number, ProjectStory>;

/**
 * Homepage journey, oldest first, written as a git log. Sourced from
 * originStory, journeyMilestones, and notableAchievements in ./about.
 */
export interface JourneyCommit {
  /** Conventional-commit style prefix shown in mono. */
  type: 'init' | 'feat' | 'build' | 'next';
  /** Visible time label. Omitted when the date isn't on record. */
  when?: string;
  title: string;
  body: string;
}

export const journeyCommits = [
  {
    type: 'init',
    when: 'Way back',
    title: 'Started as a designer',
    body: "I started out designing things and kept wanting my ideas to actually work, not just look right. That itch pulled me into code, and I've been building ever since.",
  },
  {
    type: 'feat',
    when: '2023',
    title: 'Enrolled in BSIT at Laguna University',
    body: 'Picked the System Development track of a Bachelor of Science in Information Technology. More classes, more reasons to build things.',
  },
  {
    type: 'feat',
    when: '2024',
    title: 'Took on my first freelance clients',
    body: 'Real clients, real deadlines, real applications. Nobody grades on a curve out there.',
  },
  {
    type: 'build',
    title: 'Shipped Azurea and PrintBit',
    body: 'A full-stack hotel system with booking verification, and a coin-operated print kiosk with actual hardware on the other end of the serial port.',
  },
  {
    type: 'feat',
    when: '2024 – now',
    title: 'Going full-stack, solo',
    body: "These days I take products from a blank repo to a deployed app on my own: schema, API, interface, and deploy. Right now that's SariSari and CVTEC EDMS.",
  },
  {
    type: 'next',
    when: 'Next',
    title: 'Your project?',
    body: "I'm open to freelance and full-time work. If you've got a product that needs the whole stack handled, let's talk.",
  },
] satisfies JourneyCommit[];
