// hooks/useFirestorePosts.ts
import { adminDb as db } from '@/lib/firebaseAdmin'

// ✅ Firestore Admin SDK を使って記事一覧取得
export async function fetchAllPosts() {
  const snapshot = await db.collection('blogPosts').get()
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as {
    id: string
    title: string
    date: string
    description: string
    tags?: string[]
  }[]
}

// ✅ Firestore Admin SDK を使って記事詳細取得
export async function fetchPostById(id: string) {
  const snapshot = await db.collection('blogPosts').doc(id).get()
  if (!snapshot.exists) throw new Error('記事が見つかりませんでした')
  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as {
    id: string
    title: string
    date: string
    description: string
    body: string
    tags?: string[]
    category?: string // ← ✅ これを追加！
  }
}
