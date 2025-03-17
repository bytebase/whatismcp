import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllArticles } from '@/lib/articles'
import { Card } from '@/components/Card'
import { formatDate } from '@/lib/formatDate'

function Article({ article }) {
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

export default async function ArticlesIndex() {
  const articles = await getAllArticles()
  
  // Filter to only include articles that have a Chinese translation
  const chineseArticles = articles.filter(article => {
    try {
      // Check if the article exists in the zh locale
      require(`@/app/zh/articles/${article.slug}/page.mdx`)
      return true
    } catch (e) {
      return false
    }
  })

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