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

export interface ProjectScreenshot {
  src: `/${string}`;
  /** Short visible label shown under the screenshot. */
  caption: string;
  /** Full description for screen readers. */
  alt: string;
  /** Desktop shots are 16:9; mobile shots are 9:20 phone captures. */
  device: 'desktop' | 'mobile';
}

export interface Projects {
  projectId: number;
  projectName: string;
  description: string;
  stacks: TechStack[];
  image: `/${string}`;
  screenshots?: ProjectScreenshot[];
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
    projectName: 'SariSari',
    description:
      'An offline-first mobile app for sari-sari store owners to manage inventory, record sales, and track customer utang, built with React Native, Expo, and SQLite.',
    stacks: [
      { name: 'React Native', icon: '/programming-icons-svg/react.svg' },
      { name: 'Expo', icon: '/programming-icons-svg/expo-original.svg' },
      { name: 'SQLite', icon: '/programming-icons-svg/sqlite-original.svg' },
    ],
    image: '/projects/sarisari.png',
    screenshots: [
      {
        src: '/projects/sarisari/1.jpg',
        caption: 'Store dashboard',
        alt: "SariSari home screen with today's sales, a New Sale button, quick actions, profit, expenses, low stock, and overdue utang tiles.",
        device: 'mobile',
      },
      {
        src: '/projects/sarisari/2.jpg',
        caption: 'Ring up a sale',
        alt: "Sell screen with today's sales total, product search, a fast lane of +1, +2, and +5 buttons, and products showing stock levels and prices.",
        device: 'mobile',
      },
      {
        src: '/projects/sarisari/3.jpg',
        caption: 'Review order',
        alt: 'Review order sheet with Cash or Utang payment, a suki selector, item quantities, a Park button, and a slide-to-confirm control.',
        device: 'mobile',
      },
      {
        src: '/projects/sarisari/4.jpg',
        caption: 'Sale recorded',
        alt: 'Receipt confirmation with the SariSari jar mascot celebrating and the total, item count, and payment method.',
        device: 'mobile',
      },
      {
        src: '/projects/sarisari/5.jpg',
        caption: 'Digital resibo',
        alt: 'Official resibo marked Paid in Full and Cash, with date, reference number, itemised list, and Void Sale, Refund, and Edit Price actions.',
        device: 'mobile',
      },
      {
        src: '/projects/sarisari/6.jpg',
        caption: 'Inventory',
        alt: 'Inventory screen with Products, Movements, Stocktake, and Restock tabs, listing products with prices and Newly Added or Low Stock badges.',
        device: 'mobile',
      },
      {
        src: '/projects/sarisari/7.jpg',
        caption: 'Suki and utang list',
        alt: 'Customers screen with total utang to collect, filters for with utang and paid up, and each suki with their balance.',
        device: 'mobile',
      },
      {
        src: '/projects/sarisari/8.jpg',
        caption: 'Utang to collect',
        alt: 'To collect tab listing the longest outstanding balances, with follow-up dates and Mark Contacted and Record Payment buttons.',
        device: 'mobile',
      },
      {
        src: '/projects/sarisari/9.jpg',
        caption: 'Record a payment',
        alt: 'Record payment screen with amount chips, Pay Full and Pay Half buttons, an oldest-first allocation receipt, and cash, bank, or other payment methods.',
        device: 'mobile',
      },
    ],
    githubLink: 'https://github.com/GioMjds/SariSari',
    status: 'in-development',
    features: [
      'Works fully offline, since all data lives on the device',
      'Fast checkout with a fast lane of +1, +2, and +5 buttons for best-selling items',
      'Cash or utang at checkout, with a digital resibo that supports void, refund, and price edits',
      'Utang (customer credit) ledger with follow-up reminders and payments applied to the oldest balance first',
      'Inventory with stock movements, stocktake, restock, and low-stock alerts',
      'Daily dashboard for sales, profit, expenses, low stock, and overdue utang',
      'Data export and backup so records are never lost with the phone',
    ],
    problemStatement:
      'Most sari-sari stores run on memory and a notebook. Owners cannot tell which items actually earn money, and utang entries get forgotten or disputed. Existing POS apps assume stable internet and a laptop, which most stores do not have.',
    solutionStatement:
      "SariSari runs entirely on the owner's phone with local SQLite storage, so it works with no signal and no subscription. Inventory, sales, and utang are tracked in one place, with export and backup as a safety net.",
    performanceMetric:
      'Fully functional with zero connectivity | Local SQLite queries under 100ms | Built for low-end Android phones',
  },
  {
    projectId: 3,
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
    screenshots: [
      {
        src: '/projects/printbit/13.png',
        caption: 'Attract screen',
        alt: 'PrintBit idle screen reading "Print, copy, and scan. All you need is coins and your phone." with a tap-anywhere-to-start prompt.',
        device: 'desktop',
      },
      {
        src: '/projects/printbit/1.png',
        caption: 'Choose a service',
        alt: 'Service selection screen with Print, Copy, and Scan cards, the accepted coins (1, 5, 10, and 20 pesos), a clock, and language, Wi-Fi help, report issue, and feedback buttons.',
        device: 'desktop',
      },
      {
        src: '/projects/printbit/2.png',
        caption: 'Join the kiosk Wi-Fi',
        alt: 'Modal with a Wi-Fi QR code and three steps to connect a phone to the PrintBit network, plus a warning to turn off mobile data.',
        device: 'desktop',
      },
      {
        src: '/projects/printbit/3.png',
        caption: 'Upload by QR code',
        alt: 'Upload screen showing a session QR code, one-phone-per-session and 10-page print limit notes, and an empty received-files panel waiting for a phone upload.',
        device: 'desktop',
      },
      {
        src: '/projects/printbit/3.1.jpg',
        caption: 'Phone upload page',
        alt: 'Phone browser on the kiosk upload page, connected to the kiosk, accepting PDF, Word, and image files up to 25 MB each.',
        device: 'mobile',
      },
      {
        src: '/projects/printbit/3.2.jpg',
        caption: 'File sent to kiosk',
        alt: 'Phone upload page confirming "Files Received at Kiosk!" for a PDF, with a note that the 25-page document exceeds the 10-page session limit.',
        device: 'mobile',
      },
      {
        src: '/projects/printbit/4.png',
        caption: 'Configure the print',
        alt: 'Configure screen with a live document preview, color mode, print quality, ink coverage check, orientation, rotation, paper size, and page range options, priced at 30 pesos.',
        device: 'desktop',
      },
      {
        src: '/projects/printbit/5.png',
        caption: 'Coin payment in progress',
        alt: 'Confirm and pay screen with 20 of 30 pesos inserted and a prompt to insert 10 more pesos.',
        device: 'desktop',
      },
      {
        src: '/projects/printbit/6.png',
        caption: 'Paid with change due',
        alt: 'Confirm and pay screen with 40 pesos inserted for a 30 peso job, showing 10 pesos change and an enabled Confirm and Print button.',
        device: 'desktop',
      },
      {
        src: '/projects/printbit/7.png',
        caption: 'Paper tray check',
        alt: 'Step 1 of 2 dialog asking the user to check that short bond paper is loaded, with guidance for out-of-paper and paper jam cases.',
        device: 'desktop',
      },
      {
        src: '/projects/printbit/8.png',
        caption: 'Final review',
        alt: 'Step 2 of 2 summary of the print job with total cost 30 pesos, total paid 40 pesos, and change of 10 pesos.',
        device: 'desktop',
      },
      {
        src: '/projects/printbit/9.png',
        caption: 'Printing and dispensing change',
        alt: 'Print in progress screen with a printer illustration, a pages-printed counter, and a message that coin change is being dispensed.',
        device: 'desktop',
      },
      {
        src: '/projects/printbit/10.png',
        caption: 'Photocopy a document',
        alt: 'Copy screen with a document selected, A4, short, and long bond paper sizes, and a Check Document button.',
        device: 'desktop',
      },
      {
        src: '/projects/printbit/11.png',
        caption: 'Photocopy an ID card',
        alt: 'Copy screen in ID card mode, guiding the user to scan the front side and then the back side.',
        device: 'desktop',
      },
      {
        src: '/projects/printbit/12.png',
        caption: 'Scan to soft copy',
        alt: 'Scan screen with paper size and PDF, JPG, or PNG output options, scanning steps, and a note that a 5 peso soft copy fee gives a download QR code.',
        device: 'desktop',
      },
    ],
    githubLink: 'https://github.com/GioMjds/printbit',
    status: 'finished',
    features: [
      'Wireless upload from any phone over the kiosk Wi-Fi, with no cables or USB drives',
      'Three services in one kiosk: print, photocopy (documents and both sides of ID cards), and scan to PDF, JPG, or PNG',
      'Coin payment with live balance tracking and automatic change dispensing',
      'Per-page color detection, so grayscale and color pages are priced separately',
      'Touchscreen interface built for first-time users, with guided steps and help at every screen',
      'Live print job monitoring from submission to completion',
      'Secure handling: one phone per session, and uploaded files are wiped after printing',
    ],
    problemStatement:
      'Campus print shops mean long queues, staff-dependent hours, and students passing documents around on shared USB drives. Cash-only service and manual handling slow everyone down and leave private files exposed.',
    solutionStatement:
      'PrintBit is an unattended kiosk that handles the whole transaction: upload, configure, pay in coins, and collect, with change returned automatically. A Node.js service coordinates coin hardware and printing, and files are deleted after the job so nothing private is left behind.',
    performanceMetric:
      'Coin verification under 1 second | Hardware, payment, and print pipeline working end to end | Files deleted after every job',
  },
  {
    projectId: 4,
    projectName: 'CVTEC EDMS',
    description:
      'An engineering document management system for a Dubai engineering consultancy, built with Next.js and Supabase. It tracks authority NOCs, submittal reviews and approvals, project teams, and contract value in one role-based workspace.',
    stacks: [
      { name: 'Next.js', icon: '/programming-icons-svg/nextjs-original.svg' },
      { name: 'TypeScript', icon: '/programming-icons-svg/typescript.svg' },
      {
        name: 'Supabase',
        icon: '/programming-icons-svg/supabase-original.svg',
      },
      { name: 'PostgreSQL', icon: '/programming-icons-svg/postgresql.svg' },
      {
        name: 'Tailwind CSS',
        icon: '/programming-icons-svg/tailwindcss-original.svg',
      },
      {
        name: 'TanStack Query',
        icon: '/programming-icons-svg/tanstack-query.png',
      },
    ],
    image: '/projects/cvtec-edms/2.png',
    screenshots: [
      {
        src: '/projects/cvtec-edms/1.png',
        caption: 'Sign in',
        alt: 'CVTEC EDMS sign-in page with a summary of authority NOC tracking, controlled review and approval, and role-based access.',
        device: 'desktop',
      },
      {
        src: '/projects/cvtec-edms/2.png',
        caption: 'Executive dashboard',
        alt: 'Executive Command Deck with active projects, pending delays, 14-day expiries, authority clearance, and a financial portfolio table of contract sums per project.',
        device: 'desktop',
      },
      {
        src: '/projects/cvtec-edms/3.png',
        caption: 'Projects directory',
        alt: 'Projects directory with lifecycle stage counts, search and filters, and project cards listing contract values and assigned roles and personnel.',
        device: 'desktop',
      },
      {
        src: '/projects/cvtec-edms/4.png',
        caption: 'Register a project',
        alt: 'Step 1 of 2 register project dialog with project code, master authority, initial stage, client, contractor, and notification email fields.',
        device: 'desktop',
      },
      {
        src: '/projects/cvtec-edms/5.png',
        caption: 'Assign the project team',
        alt: 'Step 2 of 2 register project dialog assigning oversight roles and discipline leads, with a searchable staff picker.',
        device: 'desktop',
      },
      {
        src: '/projects/cvtec-edms/6.png',
        caption: 'Project NOC tracker',
        alt: 'NOC tracker for one project showing the team, lifecycle stages with a gate checklist, discipline coordination status, and a table of authority NOCs with plan and expiry dates.',
        device: 'desktop',
      },
      {
        src: '/projects/cvtec-edms/7.png',
        caption: 'Discipline coordination',
        alt: 'Side panel with discipline progress for architecture, structure, and MEP, authority stages, and specialist studies.',
        device: 'desktop',
      },
      {
        src: '/projects/cvtec-edms/8.png',
        caption: 'Update discipline status',
        alt: 'Dialog to update the architecture engineering stage and add remarks or transmittal notes.',
        device: 'desktop',
      },
      {
        src: '/projects/cvtec-edms/9.png',
        caption: 'NOC detail',
        alt: 'NOC detail panel with submit and record decision actions, approved submittals bundle, authority reference, payment fee, and a requirements checklist.',
        device: 'desktop',
      },
      {
        src: '/projects/cvtec-edms/10.png',
        caption: 'NOC matrix blueprints',
        alt: 'Authority NOC matrix showing a building permit blueprint with default validity, baseline fee, dependencies, and a mandatory statutory requirements checklist.',
        device: 'desktop',
      },
      {
        src: '/projects/cvtec-edms/11.png',
        caption: 'Add a NOC blueprint',
        alt: 'Add standard NOC blueprint form with reviewing authority, project stage, prerequisite sequence, fee, validity, requirements, a required reason for the change, and automatic propagation to active projects.',
        device: 'desktop',
      },
      {
        src: '/projects/cvtec-edms/12.png',
        caption: 'Master authorities',
        alt: 'Authorities admin page listing master authorities with linked project and matrix item counts.',
        device: 'desktop',
      },
      {
        src: '/projects/cvtec-edms/13.png',
        caption: 'Reviewing authorities',
        alt: 'Reviewing authorities tab listing statutory agencies with their matrix template and project NOC counts.',
        device: 'desktop',
      },
    ],
    githubLink:
      'https://github.com/GioMjds/Engineer-Document-Management-System',
    status: 'in-development',
    features: [
      'Authority NOC tracker per project, grouped by design, construction, information, and handover stages',
      'NOC matrix blueprints with statutory checklists, fees, validity periods, and prerequisite sequences per jurisdiction',
      'Blueprint changes require a logged reason and update unobtained NOCs across active projects',
      'Controlled review and approval, with Resident Engineer and Area Manager sign-off and full history',
      'Two-step project registration that assigns oversight roles and discipline leads',
      'Executive dashboard for contract portfolio totals, delayed submittals, and NOC expiry alerts',
      'Role- and assignment-based access, so people only see the projects and files they are assigned to',
    ],
    problemStatement:
      'Engineering consultancies juggle many authority NOCs per project, each with its own reviewing body, prerequisites, fees, and expiry date. Tracked in shared folder trees and Excel masterlogs, renewals get missed, document versions blur, and there is no reliable record of who approved what.',
    solutionStatement:
      'CVTEC EDMS puts projects, teams, NOC registers, and document reviews in one workspace. Standard NOC blueprints per jurisdiction seed each project, and access is filtered by role and project assignment, so contract values stay with leadership while engineers see only their own work.',
    performanceMetric:
      'Access scoped by role and project assignment | Logged reason on every blueprint change | Expiry alerts before NOCs lapse',
  },
];
