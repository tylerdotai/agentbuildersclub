import { describe, it, expect } from 'vitest';

// Validation helpers from subscribe/route
function validateEmail(email: unknown): { ok: boolean; error?: string } {
  if (typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
    return { ok: false, error: 'Invalid email address' };
  }
  return { ok: true };
}

describe('/api/subscribe validation', () => {
  it('accepts valid email', () => {
    expect(validateEmail('user@example.com').ok).toBe(true);
  });

  it('accepts email with subdomain', () => {
    expect(validateEmail('user@mail.example.com').ok).toBe(true);
  });

  it('accepts email with plus sign', () => {
    expect(validateEmail('user+tag@example.com').ok).toBe(true);
  });

  it('rejects email without @', () => {
    const result = validateEmail('notanemail');
    expect(result.ok).toBe(false);
    expect(result.error).toBe('Invalid email address');
  });

  it('rejects email without TLD dot', () => {
    const result = validateEmail('user@domain');
    expect(result.ok).toBe(false);
  });

  it('rejects empty string', () => {
    const result = validateEmail('');
    expect(result.ok).toBe(false);
  });

  it('rejects null', () => {
    const result = validateEmail(null);
    expect(result.ok).toBe(false);
  });

  it('rejects number', () => {
    const result = validateEmail(123);
    expect(result.ok).toBe(false);
  });
});
