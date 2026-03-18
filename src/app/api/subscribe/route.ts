import { NextResponse } from 'next/server';

// In-memory store for demo (ephemeral on serverless)
// For production, use Vercel KV, Postgres, or another database
const subscribers: Array<{ email: string; subscribedAt: string }> = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Check for duplicates
    if (!subscribers.some(s => s.email === email)) {
      subscribers.push({
        email,
        subscribedAt: new Date().toISOString()
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
