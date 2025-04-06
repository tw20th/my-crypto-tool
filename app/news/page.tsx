// app/news/page.tsx
import { getSavedNews } from '@/lib/api/news'

export default async function NewsPage() {
  const news = await getSavedNews()

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">📰 仮想通貨ニュース</h1>

      {news.length === 0 ? (
        <p className="text-gray-500">ニュースがまだ保存されていません。</p>
      ) : (
        news.map((item) => (
          <div key={item.url} className="border rounded p-4 space-y-1">
            <h2 className="font-semibold text-lg">{item.title}</h2>

            <p className="text-sm text-gray-500">
              {item.source} | {new Date(item.publishedAt).toLocaleString()}
            </p>

            {item.summary && (
              <p className="text-gray-700 text-sm">📝 要約: {item.summary}</p>
            )}

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm underline inline-block mt-1"
            >
              記事を読む
            </a>
          </div>
        ))
      )}
    </div>
  )
}
