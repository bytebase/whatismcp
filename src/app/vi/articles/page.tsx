import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllArticles, type ArticleWithSlug } from '@/lib/articles'
import { Card } from '@/components/Card'
import { formatDate } from '@/lib/formatDate'

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/vi/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date, 'vi')}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Đọc bài viết</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date, 'vi')}
      </Card.Eyebrow>
    </article>
  )
}

export default async function ArticlesIndex() {
  const articles = await getAllArticles()
  
  // Get available translations for Vietnamese
  const { getArticleTranslations } = await import('@/lib/articles')
  const translations = await getArticleTranslations()
  const translatedSlugs = translations['vi'] || []
  
  // Filter to only include articles that have a Vietnamese translation
  const vietnameseArticles = articles.filter(article => 
    translatedSlugs.includes(article.slug)
  )

  return (
    <SimpleLayout
      title="Bài viết"
      intro="Những hiểu biết về MCP và ứng dụng của nó"
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {vietnameseArticles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}