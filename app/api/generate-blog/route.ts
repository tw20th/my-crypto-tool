// app/api/generate-blog/route.ts
import { NextResponse } from 'next/server'
import { adminDb as db } from '@/lib/firebaseAdmin'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const secret = req.headers.get('x-api-key')

  if (secret !== process.env.BLOG_API_SECRET) {
    return NextResponse.json(
      { message: '🔐 認証に失敗しました' },
      { status: 401 }
    )
  }

  try {
    // ✅ GPTへプロンプトを送信（SEO対応）
    const today = new Date()
    const date = today.toISOString().split('T')[0] // ✅ try内に移動！
    const chat = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'あなたは仮想通貨とSEOに詳しいプロの日本語ブロガーです。',
        },
        {
          role: 'user',
          content: `
      【目的】
      仮想通貨のSEO向けブログ記事を自動生成したいです。
      
      【内容】
      - 今週のビットコイン、イーサリアム、XRPの価格動向（仮の数値でも構わないので具体的な数字を含めて）
      - 影響を与えたニュース（米国の規制、中国の市場、NFTなど）
      - 初心者にも理解できるやさしい言葉
      - 約1000文字の読みやすい記事
      - 以下のキーワードを含める：「仮想通貨」「ビットコイン」「価格変動」「投資」「ポートフォリオ」
      
      【構成】
      1. SEOを意識した魅力的なタイトル（例：「2025年4月第2週の仮想通貨トレンド」）
      2. 見出しを含む構造（Markdown形式で ## を使う）
      3. 冒頭に150文字以内の要約（descriptionに使う）
      
      【出力形式】
      - タイトル（1行目）
      - 要約
      - 本文（Markdown形式）
      - 数値が伏せられないように、必ず価格などの数値を含めてください。
      `,
        },
      ],
    })

    const content = chat.choices[0].message.content || '生成失敗しました'

    // ✅ タイトル、要約、本文に分割
    const [titleLine, summaryLine, ...bodyLines] = content
      .split('\n')
      .filter(Boolean)
    const title = titleLine.replace(/^#+\s*/, '') // 見出し記号を削除
    const description = summaryLine.replace(/^#+\s*/, '') // 要約をdescriptionへ
    const body = bodyLines.join('\n')

    const article = {
      title,
      date,
      description,
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
