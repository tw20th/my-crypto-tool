// lib/openai.ts
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateNewsSummary(text: string): Promise<string> {
  const prompt = `以下の仮想通貨ニュースを初心者にもわかりやすく1文で要約してください。\n\n${text}`

  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  })

  return res.choices[0].message.content?.trim() || '要約に失敗しました'
}
