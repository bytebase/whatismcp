import glob from 'fast-glob'

interface Article {
  title: string
  description: string
  author: string
  date: string
}

export interface ArticleWithSlug extends Article {
  slug: string
}

async function importArticle(
  articleFilename: string,
): Promise<ArticleWithSlug> {
  let { article } = (await import(`../app/articles/${articleFilename}`)) as {
    default: React.ComponentType
    article: Article
  }

  return {
    slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
    ...article,
  }
}

export async function getAllArticles() {
  let articleFilenames = await glob('*/page.mdx', {
    cwd: './src/app/articles',
  })

  let articles = await Promise.all(articleFilenames.map(importArticle))

  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}

export async function getArticleTranslations() {
  // Map of language code -> array of article slugs that have translations
  const supportedLanguages = ['zh', 'ja', 'kr', 'es', 'de', 'fr', 'hi', 'pt', 'vi', 'ru'];
  const translations: Record<string, string[]> = {};
  
  // Initialize translation map
  for (const lang of supportedLanguages) {
    translations[lang] = [];
  }
  
  // Check for translated articles for each language
  for (const lang of supportedLanguages) {
    try {
      const langArticlePaths = await glob('*/page.mdx', {
        cwd: `./src/app/${lang}/articles`,
      });
      
      // Extract slugs from paths
      const translatedSlugs = langArticlePaths.map(path => 
        path.replace(/(\/page)?\.mdx$/, '')
      );
      
      translations[lang] = translatedSlugs;
    } catch (error) {
      // If directory doesn't exist or can't be read, leave as empty array
      translations[lang] = [];
    }
  }
  
  return translations;
}
