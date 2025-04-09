// ✅ 修正版：app/blog/[slug]/page.tsx
import { fetchPostById } from '@/hooks/useFirestorePosts'

type Props = {
  params: { slug: string } // ← 🔧 "id" → "slug" に変更！
}

export default async function BlogDetailPage({ params }: Props) {
  const post = await fetchPostById(params.slug) // ← 🔧 ここも変更！

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500">{post.date}</p>
      <article className="mt-6 whitespace-pre-wrap leading-relaxed text-gray-800 dark:text-gray-200">
        {post.category && (
          <p className="text-sm text-pink-600 font-semibold mb-1">
            📂 {post.category}
          </p>
        )}
        {post.body}
      </article>
    </main>
  )
}
