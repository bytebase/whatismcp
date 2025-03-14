import Link from 'next/link'
import { getAvailableLanguages } from '@/lib/languages'

export function LanguageSwitcher({ pathname }: { pathname: string }) {
  const languages = getAvailableLanguages()
  
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