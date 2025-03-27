'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getAvailableLanguages } from '@/lib/languages'

// Hardcoded fallback translations for client-side rendering
// This will be used until the data is fetched from the server
const FALLBACK_TRANSLATIONS: Record<string, string[]> = {
  'zh': ['notes-on-implementing-mcp-server'],
  'ja': ['notes-on-implementing-mcp-server'],
  'kr': ['notes-on-implementing-mcp-server'],
  'es': ['notes-on-implementing-mcp-server'],
  'fr': ['notes-on-implementing-mcp-server'],
  'de': ['notes-on-implementing-mcp-server'],
  'hi': ['notes-on-implementing-mcp-server'],
  'pt': ['notes-on-implementing-mcp-server'],
  'vi': ['notes-on-implementing-mcp-server'],
  'ru': ['notes-on-implementing-mcp-server'],
  // Add more translations as they become available
}

export function LanguageSwitcher({ pathname }: { pathname: string }) {
  const languages = getAvailableLanguages()
  const [translations, setTranslations] = useState<Record<string, string[]>>(FALLBACK_TRANSLATIONS)
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Fetch available translations when component mounts
  useEffect(() => {
    async function fetchTranslations() {
      try {
        // In a production Next.js app, this would be a proper API endpoint
        // For now, we'll use our hardcoded fallback data
        setTranslations(FALLBACK_TRANSLATIONS)
        setIsLoaded(true)
      } catch (error) {
        console.error('Failed to load article translations:', error)
        // Use fallback data in case of error
        setTranslations(FALLBACK_TRANSLATIONS)
        setIsLoaded(true)
      }
    }
    
    fetchTranslations()
  }, [])
  
  const isActive = (path: string) => {
    if (path === '' && pathname === '/') return true
    if (path !== '' && pathname.startsWith(path)) return true
    return false
  }

  // Check if we're on an article page
  const isArticlePage = pathname.includes('/articles/')
  
  // Extract article slug if this is an article page
  let articleSlug = ''
  if (isArticlePage) {
    // Extract article slug from path
    // Format could be /articles/slug or /zh/articles/slug
    const parts = pathname.split('/articles/')
    if (parts.length > 1) {
      // Remove any trailing slashes
      articleSlug = parts[1].replace(/\/$/, '')
    }
  }

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {languages.map((lang) => {
          // For non-article pages, always show all languages
          if (!isArticlePage) {
            return (
              <Link
                key={lang.code}
                href={lang.path || '/'}
                className={`text-sm font-medium ${
                  isActive(lang.path)
                    ? 'text-zinc-900 dark:text-zinc-100 font-bold'
                    : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                {lang.name}
              </Link>
            )
          }

          // For article pages, check if translation exists
          // English original is always available
          const isEnglish = lang.code === '';
          const hasTranslation = isEnglish || 
            (translations[lang.code] && 
             translations[lang.code].includes(articleSlug));
          
          // Skip languages without translations
          if (!hasTranslation) {
            return null;
          }

          // Determine the correct link for this language
          let href = lang.path || '/'
          
          if (isArticlePage && articleSlug) {
            // For the default (English) language, the path is /articles/slug
            if (lang.code === '') {
              href = `/articles/${articleSlug}`
            } 
            // For other languages, the path is /lang/articles/slug
            else {
              href = `${lang.path}/articles/${articleSlug}`
            }
          }
          
          return (
            <Link
              key={lang.code}
              href={href}
              className={`text-sm font-medium ${
                isActive(lang.path)
                  ? 'text-zinc-900 dark:text-zinc-100 font-bold'
                  : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
              }`}
            >
              {lang.name}
            </Link>
          )
        }).filter(Boolean)}
      </div>
    </div>
  )
}