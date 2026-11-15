import type { MetadataRoute } from "next";

const baseUrl = "https://www.impressionsbyjz.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "/portfolio", priority: 0.8 },
    { path: "/films", priority: 0.8 },
    { path: "/services", priority: 0.7 },
    { path: "/testimonials", priority: 0.6 },
    { path: "/faq", priority: 0.5 },
    { path: "/contact", priority: 0.7 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${baseUrl}${path}/`.replace(/\/+/g, "/"),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
