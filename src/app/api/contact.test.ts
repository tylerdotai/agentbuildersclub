import { describe, it, expect } from 'vitest';

// Validation helpers extracted from contact/route.ts for testability
function validateContact(body: { email?: unknown; name?: unknown; message?: unknown }) {
  const { email, name, message } = body;
  if (!email || !name || !message) {
    return { ok: false, status: 400, error: 'Missing fields' };
  }
  if (typeof email !== 'string' || !email.includes('@')) {
    return { ok: false, status: 400, error: 'Invalid email' };
  }
  return { ok: true };
}

describe('/api/contact validation', () => {
  it('accepts valid contact form submission', () => {
    const result = validateContact({ email: 'test@example.com', name: 'Tyler', message: 'Hello!' });
    expect(result.ok).toBe(true);
  });

  it('rejects missing email', () => {
    const result = validateContact({ name: 'Tyler', message: 'Hello!' });
    expect(result.ok).toBe(false);
    expect(result.error).toBe('Missing fields');
  });

  it('rejects missing name', () => {
    const result = validateContact({ email: 'test@example.com', message: 'Hello!' });
    expect(result.ok).toBe(false);
    expect(result.error).toBe('Missing fields');
  });

  it('rejects missing message', () => {
    const result = validateContact({ email: 'test@example.com', name: 'Tyler' });
    expect(result.ok).toBe(false);
    expect(result.error).toBe('Missing fields');
  });

  it('rejects email without @', () => {
    const result = validateContact({ email: 'notanemail', name: 'Tyler', message: 'Hello!' });
    expect(result.ok).toBe(false);
    expect(result.error).toBe('Invalid email');
  });

  it('rejects empty email string', () => {
    const result = validateContact({ email: '', name: 'Tyler', message: 'Hello!' });
    expect(result.ok).toBe(false);
  });
});
