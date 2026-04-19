import { NextResponse } from 'next/server';
import { Logger } from "@/lib/logger";

// In-memory store for demo (ephemeral on serverless)
// For production, use Vercel KV, Postgres, or another database
const messages: Array<{ email: string; name: string; message: string; receivedAt: string }> = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, message } = body;

    if (!email || !name || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    messages.push({
      email,
      name,
      message,
      receivedAt: new Date().toISOString()
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    Logger.error('Contact error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
