// app/api/generate-blog/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase-admin'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST() {
  const today = new Date()
  const date = today.toISOString().split('T')[0]

  try {
    // ✅ GPTへプロンプトを送信
    const chat = await openai.chat.completions.create({
      model: 'gpt-4', // 'gpt-3.5-turbo' でもOK
      messages: [
        {
          role: 'system',
          content: 'あなたは仮想通貨専門の日本語ブロガーです。',
        },
        {
          role: 'user',
          content: `今週のビットコイン、イーサリアム、XRPなどの仮想通貨市場の動向を、初心者にもわかりやすくブログ記事として800文字ほどでまとめてください。冒頭にはタイトル案も入れてください。`,
        },
      ],
    })

    const content = chat.choices[0].message.content || '生成失敗しました'

    // ✅ タイトルと本文に分割（タイトルを1行目として想定）
    const [titleLine, ...bodyLines] = content.split('\n').filter(Boolean)
    const title = titleLine.replace(/^#+\s*/, '') // 見出し記号を消す
    const body = bodyLines.join('\n')

    const article = {
      title,
      date,
      description: '今週の仮想通貨動向をGPTが自動まとめ！',
      body,
      tags: ['自動生成', '仮想通貨', 'AI'],
      category: '自動要約',
    }

    await db.collection('blogPosts').add(article)

    return NextResponse.json({ message: '✅ GPTで記事を生成・保存しました！' })
  } catch (error) {
    console.error('❌ GPT生成エラー:', error)
    return NextResponse.json(
      { message: 'エラーが発生しました' },
      { status: 500 }
    )
  }
}
