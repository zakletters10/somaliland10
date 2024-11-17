import { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: 'https://somaliland.so',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: 'https://somaliland.so/results',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    }
  ]
}
