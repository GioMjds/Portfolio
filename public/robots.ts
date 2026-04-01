import type { MetadataRoute } from "next";

const BASE_URL = "https://giomjds.vercel.app";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/_next/", "/static/"],
            },
            {
                userAgent: "Googlebot",
                allow: "/",
            },
            {
                userAgent: "Bingbot",
                allow: "/",
            },
            {
                userAgent: "Slurp",
                allow: "/",
            },
            {
                userAgent: "ClaudeBot",
                allow: "/",
            },
            {
                userAgent: "DuckDuckBot",
                allow: "/",
            },
            {
                userAgent: "YandexBot",
                allow: "/",
            },
            {
                userAgent: "Applebot",
                allow: "/",
            },
            {
                userAgent: "ChatGPT-User",
                allow: "/",
            },
            {
                userAgent: "Claude-Web",
                allow: "/",
            },
            {
                userAgent: "GPTBot",
                allow: "/",
            },
            {
                userAgent: "Anthropic-AI",
                allow: "/",
            },
            {
                userAgent: "Google-Extended",
                allow: "/",
            },
            {
                userAgent: "facebookexternalhit",
                allow: "/",
            },
            {
                userAgent: "Twitterbot",
                allow: "/",
            },
            {
                userAgent: "LinkedInBot",
                allow: "/",
            },
            {
                userAgent: "PerplexityBot",
                allow: "/",
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
        host: BASE_URL,
    };
}