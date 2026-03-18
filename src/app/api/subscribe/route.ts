import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'subscribers.json');

function ensureFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
}

function readSubscribers() {
  ensureFile();
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

function writeSubscribers(subscribers: unknown[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(subscribers, null, 2));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const subscribers = readSubscribers();
    
    // Check for duplicates
    if (subscribers.some((s: { email: string }) => s.email === email)) {
      return NextResponse.json({ ok: true });
    }

    subscribers.push({
      email,
      subscribedAt: new Date().toISOString()
    });

    writeSubscribers(subscribers);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
