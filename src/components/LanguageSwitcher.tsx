'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getAvailableLanguages } from '@/lib/languages'

// Empty fallback translations for initial state
const EMPTY_TRANSLATIONS: Record<string, string[]> = {
  'zh': [],
  'ja': [],
  'kr': [],
  'es': [],
  'fr': [],
  'de': [],
  'hi': [],
  'pt': [],
  'vi': [],
  'ru': [],
}

export function LanguageSwitcher({ pathname }: { pathname: string }) {
  const languages = getAvailableLanguages()
  const [translations, setTranslations] = useState<Record<string, string[]>>(EMPTY_TRANSLATIONS)
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Fetch available translations when component mounts or pathname changes
  useEffect(() => {
    async function fetchTranslations() {
      try {
        // In a production Next.js app, this would call a proper API endpoint
        const response = await fetch('/api/article-translations')
        if (response.ok) {
          const data = await response.json()
          setTranslations(data)
        } else {
          // Check if translations exist by checking file system
          // This is a client-side implementation, so we'll need to dynamically check
          checkForTranslations()
        }
        setIsLoaded(true)
      } catch (error) {
        console.error('Failed to load article translations:', error)
        // Use dynamic check in case of error
        checkForTranslations()
        setIsLoaded(true)
      }
    }
    
    // Function to check for translations by dynamically testing file existence
    async function checkForTranslations() {
      const newTranslations: Record<string, string[]> = { ...EMPTY_TRANSLATIONS }
      
      // Extract the current article slug if on an article page
      if (pathname.includes('/articles/')) {
        const parts = pathname.split('/articles/')
        if (parts.length > 1) {
          const articleSlug = parts[1].replace(/\/$/, '')
          
          // For each language, check if the translation exists
          for (const lang of Object.keys(newTranslations)) {
            try {
              // Try to fetch the head of the file to see if it exists
              // This is a simple method to check if a file exists
              const testPath = `/${lang}/articles/${articleSlug}`
              const test = await fetch(testPath, { method: 'HEAD' })
              if (test.ok) {
                newTranslations[lang].push(articleSlug)
              }
            } catch (e) {
              // If fetch fails, the translation probably doesn't exist
              // Just continue to the next language
            }
          }
        }
      }
      
      setTranslations(newTranslations)
    }
    
    fetchTranslations()
  }, [pathname])
  
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