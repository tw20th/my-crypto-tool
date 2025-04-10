// app/news/page.tsx
import { getSavedNews } from '@/lib/api/news'
import NewsCard from '@/components/news/NewsCard'

export default async function NewsPage() {
  const news = await getSavedNews()

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">📰 仮想通貨ニュース</h1>

      {news.length === 0 ? (
        <p className="text-gray-500">ニュースがまだ保存されていません。</p>
      ) : (
        news.map((item) => <NewsCard key={item.url} article={item} />)
      )}
    </div>
  )
}
export const dynamic = 'force-dynamic'
