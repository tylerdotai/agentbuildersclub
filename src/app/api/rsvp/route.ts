import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'rsvps.json');

function ensureFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
}

function readRsvps() {
  ensureFile();
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

function writeRsvps(rsvps: unknown[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(rsvps, null, 2));
}

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

    const rsvps = readRsvps();
    
    // Check for existing RSVP (same email + event)
    const existingIndex = rsvps.findIndex(
      (r: { email: string; eventSlug: string }) => r.email === email && r.eventSlug === eventSlug
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

    writeRsvps(rsvps);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('RSVP error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
