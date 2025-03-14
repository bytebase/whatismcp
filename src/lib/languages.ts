export interface Language {
  code: string
  name: string
  path: string
}

// Define all supported languages with their display names
export const SUPPORTED_LANGUAGES: Language[] = [
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

// This function can be used on both client and server
export function getAvailableLanguages(): Language[] {
  return SUPPORTED_LANGUAGES
}