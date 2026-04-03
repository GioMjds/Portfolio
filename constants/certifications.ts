export type CertificateCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'analytics'
  | 'ai'
  | 'career'
  | 'cybersecurity';

export interface Certificate {
  name: string;
  path: string;
  issuer: string;
  year: number;
  category: CertificateCategory;
  featured?: boolean;
  icons?: string[];
}

export interface CertificateStats {
  totalCertificates: number;
  latestYear: number;
  featuredCount: number;
  uniqueIssuers: number;
  topIssuers: string[];
}

export const certificates: Certificate[] = [
  {
    name: 'JavaScript Algorithms and Data Structures',
    path: '/certifications/javascript-algo-and-data-structures.png',
    issuer: 'freeCodeCamp',
    year: 2023,
    category: 'backend',
    featured: true,
    icons: ['/programming-icons-svg/javascript.svg'],
  },
  {
    name: 'Meta Front-End Developer',
    path: '/certifications/meta-frontend.png',
    issuer: 'Meta (Coursera)',
    year: 2024,
    category: 'frontend',
    featured: true,
    icons: [
      '/programming-icons-svg/html.svg',
      '/programming-icons-svg/css.svg',
      '/programming-icons-svg/javascript.svg',
      '/programming-icons-svg/react.svg',
    ],
  },
  {
    name: 'Front-End Development Libraries',
    path: '/certifications/front-end-development-libraries.png',
    issuer: 'freeCodeCamp',
    year: 2023,
    category: 'frontend',
    featured: true,
    icons: [
      '/programming-icons-svg/sass-original.svg',
      '/programming-icons-svg/react.svg',
    ],
  },
  {
    name: 'Meta Database Engineer',
    path: '/certifications/meta-database-engineer.png',
    issuer: 'Meta (Coursera)',
    year: 2024,
    category: 'database',
    featured: true,
    icons: [
      '/programming-icons-svg/mysql.svg',
      '/programming-icons-svg/python.svg',
    ],
  },
  {
    name: 'Back-End Development and APIs',
    path: '/certifications/backend-development-and-apis.png',
    issuer: 'freeCodeCamp',
    year: 2023,
    category: 'backend',
    featured: true,
    icons: [
      '/programming-icons-svg/express-original-wordmark.svg',
      '/programming-icons-svg/mongodb-original.svg',
      '/programming-icons-svg/npm.svg',
      '/programming-icons-svg/nodejs.svg',
    ],
  },
  {
    name: 'CCS Summit 2024: Basics of PowerBI',
    path: '/certifications/basics-of-powerbi.png',
    issuer: 'CCS Summit 2024',
    year: 2024,
    category: 'analytics',
  },
  {
    name: 'CCS Summit 2024: Chatbot using Natural Language Processing with Regex',
    path: '/certifications/nlp-using-regex.png',
    issuer: 'CCS Summit 2024',
    year: 2024,
    category: 'ai',
  },
  {
    name: 'CCS Summit 2025: Transforming Industries Through Technology',
    path: '/certifications/industries-through-tech.png',
    issuer: 'CCS Summit 2025',
    year: 2025,
    category: 'career',
  },
  {
    name: 'CCS Summit 2025: The Road to IT Consulting',
    path: '/certifications/road-to-it-consulting.png',
    issuer: 'CCS Summit 2025',
    year: 2025,
    category: 'career',
  },
  {
    name: 'IT General Assembly 2025: Pushing to Progress',
    path: '/certifications/pushing-to-progress.png',
    issuer: 'IT General Assembly 2025',
    year: 2025,
    category: 'career',
  },
  {
    name: 'Cyber Security Webinar 2025: Mastering Cybersecurity Essentials',
    path: '/certifications/mastering-cybersecurity.png',
    issuer: 'Cyber Security Webinar 2025',
    year: 2025,
    category: 'cybersecurity',
  },
  {
    name: 'Cyber Security Webinar 2025: Introduction to Secure Coding Practices',
    path: '/certifications/secure-coding-practices.png',
    issuer: 'Cyber Security Webinar 2025',
    year: 2025,
    category: 'cybersecurity',
  },
  {
    name: 'Cybersecurity CCS Summit 2026',
    path: '/certifications/cybersecurity-ccs-summit-2026.png',
    issuer: 'CCS Summit 2026',
    year: 2026,
    category: 'cybersecurity',
  },
  {
    name: 'Interpersonal Communication',
    path: '/certifications/interpersonal-communication.png',
    issuer: 'Professional Development',
    year: 2026,
    category: 'career',
  },
  {
    name: "Vice President's Lister 2026",
    path: '/certifications/vice-president-lister-2026.png',
    issuer: 'Academic Recognition',
    year: 2026,
    category: 'career',
    featured: true,
  },
];

export function sortCertificatesByYear(items: Certificate[]): Certificate[] {
  return [...items].sort(
    (a, b) => b.year - a.year || a.name.localeCompare(b.name),
  );
}

export function getTopIssuers(
  items: Certificate[],
  limit: number = 3,
): string[] {
  return Array.from(
    items.reduce((counts, item) => {
      counts.set(item.issuer, (counts.get(item.issuer) ?? 0) + 1);
      return counts;
    }, new Map<string, number>()),
  )
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([issuer]) => issuer);
}

export function getFeaturedCertificates(
  items: Certificate[],
  fallbackCount: number = 4,
): Certificate[] {
  const sorted = sortCertificatesByYear(items);
  const featured = sorted.filter((item) => item.featured);

  if (featured.length >= fallbackCount) {
    return featured.slice(0, fallbackCount);
  }

  const fallback = sorted.filter((item) => !item.featured);
  return [...featured, ...fallback].slice(0, fallbackCount);
}

export function getCertificateStats(items: Certificate[]): CertificateStats {
  const years = items.map((item) => item.year);

  return {
    totalCertificates: items.length,
    latestYear:
      years.length > 0 ? Math.max(...years) : new Date().getFullYear(),
    featuredCount: items.filter((item) => item.featured).length,
    uniqueIssuers: new Set(items.map((item) => item.issuer)).size,
    topIssuers: getTopIssuers(items),
  };
}
