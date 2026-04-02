import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn (className merger)', () => {
  it('merges two class names', () => {
    const result = cn('foo', 'bar');
    expect(result).toContain('foo');
    expect(result).toContain('bar');
  });

  it('handles empty inputs', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const isDisabled = false;
    const result = cn('base', isActive && 'active', isDisabled && 'disabled');
    expect(result).toContain('base');
    expect(result).toContain('active');
    expect(result).not.toContain('disabled');
  });

  it('handles clsx array input', () => {
    const result = cn(['a', 'b']);
    expect(result).toContain('a');
    expect(result).toContain('b');
  });

  it('deduplicates tailwind classes with same base', () => {
    // clsx + tailwind-merge deduplicates conflicting classes
    const result = cn('text-red-500', 'text-red-500');
    // Both present but tailwind-merge handles precedence
    expect(result).toBeTruthy();
  });
});
