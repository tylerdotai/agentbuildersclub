import { NextResponse } from 'next/server';

// In-memory store for demo (ephemeral on serverless)
// For production, use Vercel KV, Postgres, or another database
const rsvps: Array<{ email: string; name: string; eventSlug: string; rsvpAt: string }> = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, eventSlug } = body;

    if (!email || !name || !eventSlug) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Check for existing RSVP (same email + event)
    const existingIndex = rsvps.findIndex(
      r => r.email === email && r.eventSlug === eventSlug
    );

    const rsvp = {
      email,
      name,
      eventSlug,
      rsvpAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      rsvps[existingIndex] = rsvp;
    } else {
      rsvps.push(rsvp);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('RSVP error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
