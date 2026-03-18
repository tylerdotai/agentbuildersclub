import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'messages.json');

function ensureFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
}

function readMessages() {
  ensureFile();
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

function writeMessages(messages: unknown[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));
}

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

    const messages = readMessages();

    messages.push({
      email,
      name,
      message,
      receivedAt: new Date().toISOString()
    });

    writeMessages(messages);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
