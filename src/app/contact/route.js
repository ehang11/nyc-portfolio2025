import { NextResponse } from "next/server"

export async function POST(req) {
  const { name, email, message } = await req.json()
  if (!name || !email || !message) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
  // TODO: send email via Resend/SendGrid/SES, or log to DB
  return NextResponse.json({ ok: true })
}
