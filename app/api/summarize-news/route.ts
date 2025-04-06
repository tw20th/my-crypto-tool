import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST() {
  try {
    const snapshot = await adminDb
      .collection('news')
      .orderBy('publishedAt', 'desc')
      .limit(10)
      .get()

    let updatedCount = 0

    for (const doc of snapshot.docs) {
      const data = doc.data()
      if (data.summary) continue

      const prompt = `以下の仮想通貨ニュースの内容を初心者にも分かるようにやさしく日本語で3文以内に要約してください。\n\nタイトル: ${data.title}`

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      })

      const summary = response.choices[0]?.message?.content?.trim() || ''

      await doc.ref.update({ summary })
      updatedCount++
    }

    return NextResponse.json({ message: '✅ 要約を追加しました', updatedCount })
  } catch (e) {
    console.error('🔥 要約失敗:', e)
    return new NextResponse(JSON.stringify({ error: String(e) }), {
      status: 500,
    })
  }
}
