// app/api/save-news/route.ts
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { fetchCryptoNews } from '@/lib/api/news'

export async function POST() {
  try {
    const news = await fetchCryptoNews()

    const batch = adminDb.batch()
    let savedCount = 0

    for (const article of news) {
      // ✅ 重複チェック（同じURLがすでに存在するか）
      const existing = await adminDb
        .collection('news')
        .where('url', '==', article.url)
        .get()

      if (!existing.empty) {
        console.log('⏭️ 重複スキップ:', article.title)
        continue
      }

      // ✅ 新規保存
      const ref = adminDb.collection('news').doc()
      batch.set(ref, {
        id: ref.id,
        title: article.title,
        url: article.url,
        publishedAt: article.publishedAt,
        source: article.source,
      })

      savedCount++
    }

    await batch.commit()

    return NextResponse.json({
      message: '✅ ニュースを保存しました',
      savedCount,
    })
  } catch (e) {
    console.error('🔥 ニュース保存失敗:', e)
    return new NextResponse(JSON.stringify({ error: String(e) }), {
      status: 500,
    })
  }
}
