// app/api/save-news/route.ts
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { fetchCryptoNews } from '@/lib/api/news'

export async function POST() {
  try {
    const news = await fetchCryptoNews()

    const batch = adminDb.batch()

    for (const article of news) {
      const { title, url, publishedAt, source } = article
      const ref = adminDb.collection('news').doc()
      batch.set(ref, {
        id: ref.id,
        title,
        url,
        publishedAt,
        source,
        // 🔥 summary をあえて含めない！これが超重要
      })
    }

    await batch.commit()

    return NextResponse.json({
      message: '✅ ニュースを保存しました',
      count: news.length,
    })
  } catch (e) {
    console.error('🔥 ニュース保存失敗:', e)
    return new NextResponse(JSON.stringify({ error: String(e) }), {
      status: 500,
    })
  }
}
