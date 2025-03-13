'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

export function LanguageSwitcher() {
  const pathname = usePathname()
  
  const getBasePath = () => {
    // Remove language prefix if present
    if (pathname === '/ja' || pathname === '/kr') {
      return '/'
    }
    return pathname
  }
  
  const languages = [
    { code: '', name: 'English', path: '' },
    { code: 'zh', name: '中文', path: '/zh' },
    { code: 'ja', name: '日本語', path: '/ja' },
    { code: 'kr', name: '한국어', path: '/kr' },
    { code: 'es', name: 'Español', path: '/es' },
    { code: 'de', name: 'Deutsch', path: '/de' },
    { code: 'fr', name: 'Français', path: '/fr' },
    { code: 'hi', name: 'हिन्दी', path: '/hi' },
    { code: 'pt', name: 'Português', path: '/pt' },
    { code: 'vi', name: 'Tiếng Việt', path: '/vi' },
    { code: 'ru', name: 'Русский', path: '/ru' },
  ]
  
  const isActive = (path: string) => {
    if (path === '' && pathname === '/') return true
    if (path !== '' && pathname === path) return true
    return false
  }

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {languages.map((lang) => (
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
        ))}
      </div>
    </div>
  )
}