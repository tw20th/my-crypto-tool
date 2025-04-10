// app/blog/page.tsx
import { fetchAllPosts } from '@/hooks/useFirestorePosts'
import Link from 'next/link'
import Card from '@/components/ui/Card'

export default async function BlogPage() {
  const posts = await fetchAllPosts()

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-4">
      <h1 className="text-2xl font-bold mb-4">ブログ一覧（Firestore版）</h1>
      {posts.map((post) => (
        <Card key={post.id} variant="outlined" padding="md">
          <Link href={`/blog/${post.id}`}>
            <h2 className="text-lg font-semibold text-blue-600 hover:underline">
              {post.title}
            </h2>
          </Link>
          <p className="text-sm text-gray-500">{post.date}</p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            {post.description}
          </p>

          {/* タグ表示 */}
          {post.tags && (
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </Card>
      ))}
    </main>
  )
}

export const dynamic = 'force-dynamic'
