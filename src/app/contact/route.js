import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, message } = await req.json().catch(() => ({} as any));
  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }
  // TODO: integrate with Resend/SendGrid/SES
  return NextResponse.json({ ok: true });
}