// types/news.ts

export type NewsArticle = {
  title: string
  url: string
  publishedAt: string
  source: string
  summary?: string // ← 後でGPT要約を格納できる
}
