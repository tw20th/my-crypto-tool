import { adminDb as db } from '@/lib/firebaseAdmin'

// ✅ 一覧取得
// hooks/useFirestorePosts.ts
export async function fetchAllPosts() {
  const snapshot = await db
    .collection('blogPosts')
    .orderBy('date', 'desc')
    .get()

  return snapshot.docs.map((doc) => {
    const data = doc.data()
    const rawDate = data.date
    const date =
      rawDate && typeof rawDate.toDate === 'function'
        ? rawDate.toDate().toISOString().split('T')[0]
        : typeof rawDate === 'string'
          ? rawDate
          : ''

    return {
      id: doc.id,
      title: data.title,
      date,
      description: data.description,
      tags: data.tags ?? [],
    }
  }) as {
    id: string
    title: string
    date: string
    description: string
    tags?: string[]
  }[]
}

// ✅ 個別記事取得（[slug]/page.tsx や OG生成で使用）
export async function fetchPostById(id: string) {
  const snapshot = await db.collection('blogPosts').doc(id).get()
  if (!snapshot.exists) throw new Error('記事が見つかりませんでした')

  const data = snapshot.data()
  const rawDate = data?.date
  const date =
    rawDate && typeof rawDate.toDate === 'function'
      ? rawDate.toDate().toISOString().split('T')[0]
      : typeof rawDate === 'string'
        ? rawDate
        : ''

  return {
    id: snapshot.id,
    title: data?.title ?? '',
    date,
    description: data?.description ?? '',
    body: data?.body ?? '',
    tags: data?.tags ?? [],
    category: data?.category ?? '',
  }
}
