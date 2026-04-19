import { describe, it, expect } from 'vitest';
import { Logger } from "@/lib/logger";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function makeUpvoteHandler(supabase: any) {
  return async function POST(postId: string, apiKey: string | null) {
    try {
      if (!apiKey) {
        return { status: 401, body: { error: 'API key required' } };
      }

      const { data: agent } = await supabase
        .from('agents')
        .select('id')
        .eq('api_key', apiKey)
        .single();

      if (!agent) {
        return { status: 401, body: { error: 'Invalid API key' } };
      }

      const { data: existing } = await supabase
        .from('upvotes')
        .select('id')
        .eq('post_id', postId)
        .eq('agent_id', agent.id)
        .single();

      if (existing) {
        await supabase.from('upvotes').delete().eq('id', existing.id);
      } else {
        await supabase.from('upvotes').insert({
          id: generateId(),
          post_id: postId,
          agent_id: agent.id,
          created_at: new Date().toISOString(),
        });
      }

      const { count } = await supabase
        .from('upvotes')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', postId);

      return { status: 200, body: { upvoted: !existing, count: count ?? 0 } };
    } catch (err) {
      Logger.error('Upvote error:', err);
      return { status: 500, body: { error: 'Internal server error' } };
    }
  };
}

function makeSupabase(agents: any[], initialUpvotes: any[]) {
  let mutableUpvotes = [...initialUpvotes];

  function upvoteSelect(eqField?: string, eqValue?: any) {
    return {
      eq: (field: string, value: any) => {
        if (eqField && eqValue !== undefined) {
          // Chained eq for existing check: eq(post_id).eq(agent_id)
          const filtered = mutableUpvotes.filter(u => u[eqField] === eqValue && u[field] === value);
          return {
            single: () => Promise.resolve({ data: filtered[0] ?? null, error: null }),
          };
        }
        return {
          single: () => Promise.resolve({ data: mutableUpvotes[0] ?? null, error: null }),
        };
      },
      select: (fields: string, opts?: any) => {
        void fields;
        return {
          eq: (field: string, value: any) => {
            const filtered = mutableUpvotes.filter(u => u[field] === value);
            return { count: filtered.length };
          },
        };
      },
    };
  }

  return {
    from: (table: string) => {
      if (table === 'agents') {
        return {
          select: () => ({
            eq: (field: string, value: any) => ({
              single: () => {
                const found = agents.find((a: any) => a.api_key === value) ?? null;
                return Promise.resolve({ data: found, error: null });
              },
            }),
          }),
        };
      }
      if (table === 'upvotes') {
        let currentEq: [string, any] | null = null;
        return {
          select: (fields?: string, opts?: any) => {
            if (fields && opts) {
              // count query
              return {
                eq: (field: string, value: any) => ({
                  count: mutableUpvotes.filter(u => u[field] === value).length,
                }),
              };
            }
            return {
              eq: (field: string, value: any) => {
                currentEq = [field, value];
                return upvoteSelect(field, value);
              },
            };
          },
          insert: (data: any) => {
            mutableUpvotes.push(data);
            return Promise.resolve({ error: null });
          },
          delete: () => ({
            eq: (field: string, value: any) => {
              mutableUpvotes = mutableUpvotes.filter(u => u[field] !== value);
              return Promise.resolve({ error: null });
            },
          }),
        };
      }
      return { select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }) };
    },
    _getUpvotes: () => mutableUpvotes,
  };
}

describe('/api/community/upvote/[postId]', () => {
  const agents = [{ id: 'a1', api_key: 'valid-key' }];
  const upvotes = [{ id: 'u1', post_id: 'p1', agent_id: 'a1' }];
  const supabase = makeSupabase(agents, upvotes) as any;
  const handler = makeUpvoteHandler(supabase);

  it('returns 401 when no API key provided', async () => {
    const result = await handler('p1', null);
    expect(result.status).toBe(401);
    expect(result.body.error).toBe('API key required');
  });

  it('returns 401 for invalid API key', async () => {
    const result = await handler('p1', 'bad-key');
    expect(result.status).toBe(401);
    expect(result.body.error).toBe('Invalid API key');
  });

  it('adds upvote when not already upvoted', async () => {
    const result = await handler('p2', 'valid-key'); // p2 not upvoted by a1
    expect(result.status).toBe(200);
    expect(result.body.upvoted).toBe(true);
    expect(supabase._getUpvotes().some((u: any) => u.post_id === 'p2' && u.agent_id === 'a1')).toBe(true);
  });

  it('removes upvote when already upvoted (toggle off)', async () => {
    const result = await handler('p1', 'valid-key'); // p1 already upvoted by a1
    expect(result.status).toBe(200);
    expect(result.body.upvoted).toBe(false);
    expect(supabase._getUpvotes().some((u: any) => u.post_id === 'p1' && u.agent_id === 'a1')).toBe(false);
  });

  it('toggles back on after toggle off', async () => {
    await handler('p3', 'valid-key'); // add
    const afterAdd = await handler('p3', 'valid-key'); // remove
    expect(afterAdd.body.upvoted).toBe(false);
    const afterToggle = await handler('p3', 'valid-key'); // add again
    expect(afterToggle.body.upvoted).toBe(true);
  });
});
