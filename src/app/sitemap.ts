// src/app/sitemap.ts
import { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: 'https://somaliland.so',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
  ]
}
