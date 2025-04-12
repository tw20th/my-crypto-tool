'use client'

import { highlightGlossaryTerms } from '@/lib/highlightGlossaryTerms'
import { NewsArticle } from '@/lib/api/news'
import 'react-tooltip/dist/react-tooltip.css'

type Props = {
  article: NewsArticle
}

export default function NewsCard({ article }: Props) {
  return (
    <div className="border rounded p-4 space-y-2 bg-white dark:bg-gray-800 shadow dark:border-gray-700">
      <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
        {article.title}
      </h2>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {article.source} | {new Date(article.publishedAt).toLocaleString()}
      </p>

      {article.summary && (
        <p className="text-gray-700 dark:text-gray-300 text-sm">
          📝 要約: {highlightGlossaryTerms(article.summary)}
        </p>
      )}

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 text-sm underline inline-block mt-1"
      >
        記事を読む
      </a>
    </div>
  )
}
