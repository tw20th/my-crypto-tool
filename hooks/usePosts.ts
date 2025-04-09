// hooks/usePosts.ts
import { getPostSlugs, getPostBySlug } from '@/lib/blog'

export function getAllPostsSorted() {
  const slugs = getPostSlugs()
  return slugs
    .map((slug) => getPostBySlug(slug.replace('.md', '')))
    .sort((a, b) => (a.date < b.date ? 1 : -1)) // 新しい順
}
