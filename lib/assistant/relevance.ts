import 'server-only';

import type {
  AssistantSection,
  KnowledgeSlice,
  RelevanceResult,
} from '@/lib/assistant/types';

const SECTION_ROUTE_BOOST: Record<string, AssistantSection> = {
  '/': 'homepage',
  '/about': 'identity',
  '/projects': 'projects',
  '/certificates': 'certifications',
  '/contact': 'services',
};

const SECTION_KEYWORDS: Record<AssistantSection, string[]> = {
  identity: ['about', 'who', 'background', 'experience', 'bio', 'journey'],
  skills: ['skills', 'stack', 'technology', 'tools', 'languages'],
  projects: ['project', 'portfolio', 'work', 'build', 'application'],
  certifications: ['certificate', 'certification', 'credential', 'course'],
  services: ['service', 'offer', 'help', 'freelance', 'consulting'],
  homepage: ['home', 'homepage', 'overview', 'intro'],
};

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[^a-z0-9.+#-]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 1);
}

function scoreSlice(
  slice: KnowledgeSlice,
  tokens: string[],
  routeSection?: AssistantSection,
): number {
  if (tokens.length === 0) {
    return routeSection === slice.section ? 2 : 0;
  }

  let score = 0;
  const keywordSet = new Set(slice.keywords);

  for (const token of tokens) {
    if (keywordSet.has(token)) {
      score += 3;
    } else if (slice.keywords.some((keyword) => keyword.includes(token))) {
      score += 1;
    }
  }

  if (routeSection === slice.section) {
    score += 2;
  }

  const sectionTokens = SECTION_KEYWORDS[slice.section];
  for (const token of tokens) {
    if (sectionTokens.includes(token)) {
      score += 1;
    }
  }

  return score;
}

export function selectRelevantKnowledge(
  slices: KnowledgeSlice[],
  question: string,
  route?: string,
): RelevanceResult {
  const normalizedRoute = route?.startsWith('/') ? route : undefined;
  const routeSection = normalizedRoute ? SECTION_ROUTE_BOOST[normalizedRoute] : undefined;
  const tokens = tokenize(question);

  const scored = slices
    .map((slice) => ({
      slice,
      score: scoreSlice(slice, tokens, routeSection),
    }))
    .sort((a, b) => b.score - a.score);

  const strongMatches = scored.filter((item) => item.score >= 3).slice(0, 6);
  const fallbackBase = scored.slice(0, 3).map((item) => item.slice);

  const selectedSlices =
    strongMatches.length > 0
      ? strongMatches.map((item) => item.slice)
      : fallbackBase;

  const ensureIdentity = slices.find((slice) => slice.id === 'identity-main');
  const withIdentity =
    ensureIdentity && !selectedSlices.some((slice) => slice.id === ensureIdentity.id)
      ? [ensureIdentity, ...selectedSlices].slice(0, 6)
      : selectedSlices;

  const usedSections = Array.from(new Set(withIdentity.map((slice) => slice.section)));
  const totalKeywordMatches = scored.reduce(
    (accumulator, item) => accumulator + Math.max(item.score, 0),
    0,
  );

  let confidence: RelevanceResult['confidence'] = 'low';
  if (strongMatches.length >= 3 || totalKeywordMatches >= 20) {
    confidence = 'high';
  } else if (strongMatches.length >= 1 || totalKeywordMatches >= 8) {
    confidence = 'medium';
  }

  return {
    slices: withIdentity,
    usedSections,
    confidence,
    totalKeywordMatches,
  };
}

