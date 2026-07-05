import type { MetadataRoute } from "next";
import { getShowcases } from "@/lib/data";

export const dynamic = "force-static";

const BASE_URL = "https://cwxian.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const showcases = await getShowcases();
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/services/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services/domain/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services/hosting/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/get-started/`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/get-started/domain/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/get-started/hosting/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/get-started/eligibility/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/showcase/`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/docs/`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/docs/faq/`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/docs/guides/`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/docs/domain-guide/`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/docs/hosting-guide/`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/docs/sub-sites/`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about/`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about/team/`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/about/partners/`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/about/volunteers/`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/about/contact/`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/terms/`, lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/privacy/`, lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/open-source/`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];

  const showcaseRoutes: MetadataRoute.Sitemap = showcases.map((showcase) => ({
    url: `${BASE_URL}/showcase/${showcase.slug}/`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...showcaseRoutes];
}
