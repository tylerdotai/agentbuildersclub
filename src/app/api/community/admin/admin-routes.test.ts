import { describe, it, expect, beforeEach } from 'vitest';
import { Logger } from "@/lib/logger";

/**
 * Inline handlers for admin routes.
 * DELETE /api/community/admin/posts/[postId]
 * POST  /api/community/admin/mute/[agentId]
 */
function makeAdminDeleteHandler(supabase: any) {
  return async function DELETE(postId: string, apiKey: string | null) {
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

      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)
        .eq('agent_id', agent.id);

      if (error) {
        return { status: 500, body: { error: 'Failed to delete' } };
      }

      return { status: 200, body: { success: true } };
    } catch (err) {
      Logger.error('Delete error:', err);
      return { status: 500, body: { error: 'Internal server error' } };
    }
  };
}

function makeMuteHandler(supabase: any) {
  return async function POST(agentId: string, apiKey: string | null) {
    try {
      if (!apiKey) {
        return { status: 401, body: { error: 'API key required' } };
      }

      const { data: admin } = await supabase
        .from('agents')
        .select('id')
        .eq('api_key', apiKey)
        .single();

      if (!admin) {
        return { status: 401, body: { error: 'Invalid API key' } };
      }

      const { data: agent } = await supabase
        .from('agents')
        .select('id, muted')
        .eq('name', agentId)
        .single();

      if (!agent) {
        return { status: 404, body: { error: 'Agent not found' } };
      }

      const newMuted = !agent.muted;
      await supabase
        .from('agents')
        .update({ muted: newMuted })
        .eq('id', agent.id);

      return { status: 200, body: { success: true, muted: newMuted } };
    } catch (err) {
      Logger.error('Mute error:', err);
      return { status: 500, body: { error: 'Internal server error' } };
    }
  };
}

/**
 * Creates a mock supabase with explicit mutableAgents array.
 */
function createAdminSupabase(agentsData: any[]) {
  // agentsData: e.g. [{ id: 'a1', api_key: 'admin-key', name: 'Admin', muted: false }, ...]
  const agents = agentsData.map(a => ({ ...a }));

  return {
    from: (table: string) => {
      if (table === 'agents') {
        return {
          select: () => ({
            eq: (field: string, value: string) => ({
              single: () => Promise.resolve({ data: agents.find(a => a[field] === value) ?? null, error: null }),
            }),
          }),
          update: (data: { muted: boolean }) => ({
            eq: (field: string, value: string) => {
              const agent = agents.find(a => a[field] === value);
              if (agent) agent.muted = data.muted;
              return Promise.resolve({ error: null });
            },
          }),
        };
      }
      if (table === 'posts') {
        return {
          delete: () => ({
            eq: (field1: string, value1: string) => ({
              eq: (field2: string, value2: string) => Promise.resolve({ error: null }),
            }),
          }),
        };
      }
      return {} as any;
    },
    _agents: agents,
  };
}

describe('/api/community/admin/posts/[postId] DELETE', () => {
  function makeSupabaseAndHandler() {
    const supabase = createAdminSupabase([{ id: 'a1', api_key: 'admin-key', name: 'Admin', muted: false }]) as any;
    const handler = makeAdminDeleteHandler(supabase);
    return { supabase, handler };
  }

  it('returns 401 without API key', async () => {
    const { handler } = makeSupabaseAndHandler();
    const result = await handler('p1', null);
    expect(result.status).toBe(401);
    expect(result.body.error).toBe('API key required');
  });

  it('returns 401 for invalid API key', async () => {
    const { handler } = makeSupabaseAndHandler();
    const result = await handler('p1', 'not-a-key');
    expect(result.status).toBe(401);
    expect(result.body.error).toBe('Invalid API key');
  });

  it('returns 200 on successful delete', async () => {
    const { handler } = makeSupabaseAndHandler();
    const result = await handler('p1', 'admin-key');
    expect(result.status).toBe(200);
    expect(result.body.success).toBe(true);
  });
});

describe('/api/community/admin/mute/[agentId] POST', () => {
  // Use a single supabase instance per test to verify state persistence
  let supabase: any;
  let handler: any;

  beforeEach(() => {
    supabase = createAdminSupabase([
      { id: 'a1', api_key: 'admin-key', name: 'Admin', muted: false },
      { id: 'a2', name: 'TargetAgent', muted: false },
    ]);
    handler = makeMuteHandler(supabase);
  });

  it('returns 401 without API key', async () => {
    const result = await handler('TargetAgent', null);
    expect(result.status).toBe(401);
  });

  it('returns 401 for invalid admin API key', async () => {
    const result = await handler('TargetAgent', 'bad-key');
    expect(result.status).toBe(401);
  });

  it('returns 404 when agent not found by name', async () => {
    const result = await handler('NonExistentAgent', 'admin-key');
    expect(result.status).toBe(404);
    expect(result.body.error).toBe('Agent not found');
  });

  it('toggles muted from false to true', async () => {
    const result = await handler('TargetAgent', 'admin-key');
    expect(result.status).toBe(200);
    expect(result.body.muted).toBe(true);
    expect(result.body.success).toBe(true);
  });

  it('toggles muted from true to false on second call', async () => {
    // First toggle: false -> true
    const r1 = await handler('TargetAgent', 'admin-key');
    expect(r1.body.muted).toBe(true);
    expect(supabase._agents[1].muted).toBe(true);

    // Second toggle: true -> false
    const r2 = await handler('TargetAgent', 'admin-key');
    expect(r2.status).toBe(200);
    expect(r2.body.muted).toBe(false);
    expect(supabase._agents[1].muted).toBe(false);
  });
});
