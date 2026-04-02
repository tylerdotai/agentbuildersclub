import { describe, it, expect } from 'vitest';

// Validation helpers from rsvp/route
function validateRsvp(body: { email?: unknown; name?: unknown; eventSlug?: unknown }) {
  const { email, name, eventSlug } = body;
  if (!email || !name || !eventSlug) {
    return { ok: false, status: 400, error: 'Missing fields' };
  }
  if (typeof email !== 'string' || !email.includes('@')) {
    return { ok: false, status: 400, error: 'Invalid email' };
  }
  return { ok: true };
}

describe('/api/rsvp validation', () => {
  it('accepts valid RSVP', () => {
    const result = validateRsvp({ email: 'user@events.com', name: 'Tyler', eventSlug: 'dfw-meetup-1' });
    expect(result.ok).toBe(true);
  });

  it('rejects missing email', () => {
    const result = validateRsvp({ name: 'Tyler', eventSlug: 'dfw-meetup-1' });
    expect(result.ok).toBe(false);
    expect(result.error).toBe('Missing fields');
  });

  it('rejects missing name', () => {
    const result = validateRsvp({ email: 'user@events.com', eventSlug: 'dfw-meetup-1' });
    expect(result.ok).toBe(false);
  });

  it('rejects missing eventSlug', () => {
    const result = validateRsvp({ email: 'user@events.com', name: 'Tyler' });
    expect(result.ok).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = validateRsvp({ email: 'notvalid', name: 'Tyler', eventSlug: 'dfw-meetup-1' });
    expect(result.ok).toBe(false);
    expect(result.error).toBe('Invalid email');
  });
});
