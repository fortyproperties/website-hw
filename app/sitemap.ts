import type { MetadataRoute } from "next"

const SITE_URL = "https://fortyproperties.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/how-it-works", "/contact", "/privacy-policy", "/terms"]
  const lastModified = new Date()

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/contact" ? 0.9 : 0.7,
  }))
}
