// components/Blog/BlogList.tsx
import { getAllPostsSorted } from '@/hooks/usePosts'
import BlogItem from './BlogItem'

export default function BlogList() {
  const posts = getAllPostsSorted()

  return (
    <ul className="space-y-6">
      {posts.map((post) => (
        <BlogItem
          key={post.slug}
          slug={post.slug}
          title={post.title}
          date={post.date}
          description={post.description}
        />
      ))}
    </ul>
  )
}
