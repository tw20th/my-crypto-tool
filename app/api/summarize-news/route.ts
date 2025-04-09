// app/api/summarize-news/route.ts

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST() {
  try {
    console.log('📡 /api/summarize-news 実行開始')

    const snapshot = await adminDb
      .collection('news')
      .orderBy('publishedAt', 'desc')
      .limit(10)
      .get()

    let updatedCount = 0

    for (const doc of snapshot.docs) {
      const data = doc.data()

      console.log('🔍 記事ID:', doc.id)
      console.log('📰 タイトル:', data.title)
      console.log('🟡 summary フィールド:', data.summary)

      if ('summary' in data) {
        console.log('⛔ summary すでに存在 → スキップ')
        continue
      }

      const prompt = `以下の仮想通貨ニュースの内容を、初心者にもわかりやすく、やさしい日本語で3文以内に要約してください。\n\nタイトル: ${data.title}`

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      })

      const summary = response.choices[0]?.message?.content?.trim()

      if (!summary) {
        console.log('⚠️ 要約が取得できませんでした。スキップ')
        continue
      }

      await doc.ref.update({ summary })
      updatedCount++
      console.log(`✅ summary 保存完了 (${updatedCount} 件目)`)
    }

    return NextResponse.json({
      message: '✅ 要約処理完了',
      updatedCount,
    })
  } catch (e) {
    console.error('🔥 要約処理エラー:', e)
    return new NextResponse(JSON.stringify({ error: String(e) }), {
      status: 500,
    })
  }
}
