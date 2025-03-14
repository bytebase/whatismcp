import { MetadataRoute } from 'next'
import glob from 'fast-glob'
import { getAvailableLanguages } from '@/lib/languages'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://whatismcp.com'
  
  // Main pages
  const routes = [
    '',
    '/about',
    '/articles',
    '/mcps',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
  
  // Localized pages - dynamically detect available languages
  const languages = getAvailableLanguages()
  const localizedRoutes = languages
    .filter(lang => lang.code !== '') // Skip English (default) as it's already in routes
    .map(lang => ({
      url: `${baseUrl}${lang.path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    }))
  
  // Articles - dynamically collect all articles
  const articleFiles = await glob('**/page.mdx', {
    cwd: './src/app/articles',
  })
  
  const articleRoutes = articleFiles.map(file => {
    // Convert file path like "notes-on-implementing-mcp-server/page.mdx" to "/articles/notes-on-implementing-mcp-server"
    const slug = file.replace('/page.mdx', '')
    return {
      url: `${baseUrl}/articles/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  })
  
  return [...routes, ...localizedRoutes, ...articleRoutes]
}