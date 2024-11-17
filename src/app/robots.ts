import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://somaliland.so/sitemap.xml',
    host: 'https://somaliland.so',
  }
}
