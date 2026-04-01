import type { MetadataRoute } from "next";
import { projects } from "@/constants/projects";

const BASE_URL = "https://giomjds.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
    const currentDate = new Date();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/projects`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/services`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/certificates`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: currentDate,
            changeFrequency: "yearly",
            priority: 0.6,
        },
    ];

    // Dynamic project pages
    const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
        url: `${BASE_URL}/projects/${project.projectId}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...staticPages, ...projectPages];
}