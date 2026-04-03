import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/static/'],
      },
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'Slurp',
          'DuckDuckBot',
          'YandexBot',
          'Applebot',
          'ChatGPT-User',
          'Claude-Web',
          'ClaudeBot',
          'GPTBot',
          'Anthropic-AI',
          'Google-Extended',
          'facebookexternalhit',
          'Twitterbot',
          'LinkedInBot',
          'PerplexityBot',
        ],
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
