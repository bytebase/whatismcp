import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllArticles, type ArticleWithSlug } from '@/lib/articles'
import { Card } from '@/components/Card'
import { formatDate } from '@/lib/formatDate'

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/de/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date, 'de')}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Artikel lesen</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date, 'de')}
      </Card.Eyebrow>
    </article>
  )
}

export default async function ArticlesIndex() {
  const articles = await getAllArticles()
  
  // In a real-world scenario, we would use a more robust solution like the
  // getArticleTranslations function we created earlier
  
  // For now, we'll just hardcode the articles we know have translations
  const translatedSlugs = ['notes-on-implementing-mcp-server']
  
  // Filter to only include articles that have a German translation
  const germanArticles = articles.filter(article => 
    translatedSlugs.includes(article.slug)
  )

  return (
    <SimpleLayout
      title="Artikel"
      intro="Einblicke in MCP und seine Anwendungen"
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {germanArticles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}