import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllArticles, type ArticleWithSlug } from '@/lib/articles'
import { Card } from '@/components/Card'
import { formatDate } from '@/lib/formatDate'

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/zh/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date, 'zh')}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>阅读全文</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date, 'zh')}
      </Card.Eyebrow>
    </article>
  )
}

// Helper function to safely check if a module exists
async function moduleExists(path: string): Promise<boolean> {
  try {
    // Using dynamic import since we're in an async function
    await import(path)
    return true
  } catch (error) {
    return false
  }
}

export default async function ArticlesIndex() {
  const articles = await getAllArticles()
  
  // Get available translations for Chinese
  const { getArticleTranslations } = await import('@/lib/articles')
  const translations = await getArticleTranslations()
  const translatedSlugs = translations['zh'] || []
  
  // Filter to only include articles that have a Chinese translation
  const chineseArticles = articles.filter(article => 
    translatedSlugs.includes(article.slug)
  )

  return (
    <SimpleLayout
      title="文章"
      intro="分享我对 MCP 及其发展的见解与思考"
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {chineseArticles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}