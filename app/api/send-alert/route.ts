// app/api/send-alert/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { to, subject, text } = await req.json()

  try {
    console.log('📨 Resend送信中:', to)
    await resend.emails.send({
      from: 'onboarding@resend.dev', // ← verified sender
      to,
      subject,
      text,
    })
    console.log('✅ 送信成功')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ Resend送信エラー:', error)
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}
