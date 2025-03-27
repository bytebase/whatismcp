import { NextResponse } from 'next/server'
import { getArticleTranslations } from '@/lib/articles'

export async function GET() {
  try {
    const translations = await getArticleTranslations()
    return NextResponse.json(translations)
  } catch (error) {
    console.error('Error fetching article translations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch article translations' },
      { status: 500 }
    )
  }
}