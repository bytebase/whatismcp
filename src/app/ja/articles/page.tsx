import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllArticles, type ArticleWithSlug } from '@/lib/articles'
import { Card } from '@/components/Card'
import { formatDate } from '@/lib/formatDate'

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/ja/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date, 'ja')}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>記事を読む</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date, 'ja')}
      </Card.Eyebrow>
    </article>
  )
}

export default async function ArticlesIndex() {
  const articles = await getAllArticles()
  
  // Get available translations for Japanese
  const { getArticleTranslations } = await import('@/lib/articles')
  const translations = await getArticleTranslations()
  const translatedSlugs = translations['ja'] || []
  
  // Filter to only include articles that have a Japanese translation
  const japaneseArticles = articles.filter(article => 
    translatedSlugs.includes(article.slug)
  )

  return (
    <SimpleLayout
      title="記事"
      intro="MCPとその応用についての考察"
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {japaneseArticles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}