// lib/blog.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const postsDir = path.join(process.cwd(), 'posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDir).filter((file) => file.endsWith('.md'))
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = path.join(postsDir, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const htmlContent = marked.parse(content)

  return {
    slug: realSlug,
    title: data.title,
    date: data.date,
    description: data.description,
    content: htmlContent,
  }
}
