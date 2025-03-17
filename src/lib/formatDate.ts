export function formatDate(dateString: string, locale?: string): string {
  // Map locale codes to actual locale strings for date formatting
  const localeMap: Record<string, string> = {
    'zh': 'zh-CN',
    'ja': 'ja-JP',
    'kr': 'ko-KR',
    'es': 'es-ES',
    'de': 'de-DE',
    'fr': 'fr-FR',
    'hi': 'hi-IN',
    'pt': 'pt-BR',
    'vi': 'vi-VN',
    'ru': 'ru-RU'
  }

  // Determine which locale to use
  const dateLocale = locale ? localeMap[locale] || 'en-US' : 'en-US'

  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString(dateLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
