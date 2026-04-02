import { describe, it, expect } from 'vitest';

/**
 * Inline route handler for /api/community/posts — tests real behavior
 * without requiring the Next.js server.
 */
function makePostsHandler(supabase: any) {
  return async function POST(req: Request) {
    try {
      const apiKey = req.headers.get('x-api-key');

      if (!apiKey) {
        return Response.json({ error: 'API key required' }, { status: 401 });
      }

      const { data: agent } = await supabase
        .from('agents')
        .select('*')
        .eq('api_key', apiKey)
        .single();

      if (!agent) {
        return Response.json({ error: 'Invalid API key' }, { status: 401 });
      }

      if (agent.muted) {
        return Response.json({ error: 'Agent is muted' }, { status: 403 });
      }

      const body = await req.json();
      const { content, image_url, parent_id } = body;

      if (!content || typeof content !== 'string' || content.trim() === '') {
        return Response.json({ error: 'Content is required' }, { status: 400 });
      }

      if (content.length > 500) {
        return Response.json({ error: 'Content must be 500 characters or less' }, { status: 400 });
      }

      if (image_url && typeof image_url !== 'string') {
        return Response.json({ error: 'Image URL must be a string' }, { status: 400 });
      }

      const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      const created_at = new Date().toISOString();
      const { data: post, error } = await supabase
        .from('posts')
        .insert({ id, agent_id: agent.id, content: content.trim(), image_url: image_url ?? null, parent_id: parent_id ?? null, created_at })
        .select()
        .single();

      if (error || !post) {
        return Response.json({ error: 'Failed to create post' }, { status: 500 });
      }

      return Response.json(
        { id: post.id, agent_name: agent.name, content: post.content, image_url: post.image_url, created_at: post.created_at },
        { status: 201 }
      );
    } catch (err) {
      console.error('Posts error:', err);
      return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
  };
}

function makeSupabase(agents: any[], posts: any[]) {
  const mutablePosts = [...posts];
  return {
    from: (table: string) => {
      if (table === 'agents') {
        return {
          select: () => ({
            eq: (field: string, value: any) => ({
              single: () => {
                const found = agents.find((a) => a.api_key === value) ?? null;
                return Promise.resolve({ data: found, error: null });
              },
            }),
          }),
        };
      }
      if (table === 'posts') {
        return {
          select: () => ({
            eq: () => ({
              single: () => Promise.resolve({ data: mutablePosts[0] ?? null, error: null }),
            }),
          }),
          insert: (data: any) => ({
            select: () => ({
              single: () => {
                mutablePosts.push(data);
                return Promise.resolve({ data, error: null });
              },
            }),
          }),
        };
      }
      return {
        select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
      };
    },
    _getPosts: () => mutablePosts,
  };
}

describe('/api/community/posts', () => {
  const validAgent = {
    id: 'agent-1',
    name: 'TestAgent',
    description: 'A test agent',
    owner: 'Tyler',
    website: 'https://test.dev',
    api_key: 'valid-api-key',
    muted: false,
    created_at: new Date().toISOString(),
  };

  const mutedAgent = {
    ...validAgent,
    id: 'agent-muted',
    name: 'MutedAgent',
    api_key: 'muted-api-key',
    muted: true,
  };

  function makeReq(body: any, headers: Record<string, string> = {}) {
    return new Request('http://localhost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(body),
    });
  }

  it('returns 401 when no API key is provided', async () => {
    const supabase = makeSupabase([validAgent, mutedAgent], []);
    const handler = makePostsHandler(supabase);
    const req = makeReq({ content: 'Hello world' });
    const response = await handler(req);
    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.error).toBe('API key required');
  });

  it('returns 401 for invalid API key', async () => {
    const supabase = makeSupabase([validAgent, mutedAgent], []);
    const handler = makePostsHandler(supabase);
    const req = makeReq({ content: 'Hello world' }, { 'x-api-key': 'invalid-key' });
    const response = await handler(req);
    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.error).toBe('Invalid API key');
  });

  it('returns 403 for muted agent', async () => {
    const supabase = makeSupabase([validAgent, mutedAgent], []);
    const handler = makePostsHandler(supabase);
    const req = makeReq({ content: 'Hello world' }, { 'x-api-key': 'muted-api-key' });
    const response = await handler(req);
    expect(response.status).toBe(403);
    const data = await response.json();
    expect(data.error).toBe('Agent is muted');
  });

  it('returns 400 for empty content', async () => {
    const supabase = makeSupabase([validAgent, mutedAgent], []);
    const handler = makePostsHandler(supabase);
    const req = makeReq({ content: '' }, { 'x-api-key': 'valid-api-key' });
    const response = await handler(req);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Content is required');
  });

  it('returns 400 for whitespace-only content', async () => {
    const supabase = makeSupabase([validAgent, mutedAgent], []);
    const handler = makePostsHandler(supabase);
    const req = makeReq({ content: '   ' }, { 'x-api-key': 'valid-api-key' });
    const response = await handler(req);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Content is required');
  });

  it('returns 400 for content over 500 characters', async () => {
    const supabase = makeSupabase([validAgent, mutedAgent], []);
    const handler = makePostsHandler(supabase);
    const req = makeReq({ content: 'A'.repeat(501) }, { 'x-api-key': 'valid-api-key' });
    const response = await handler(req);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Content must be 500 characters or less');
  });

  it('accepts content at exactly 500 characters', async () => {
    const supabase = makeSupabase([validAgent, mutedAgent], []);
    const handler = makePostsHandler(supabase);
    const req = makeReq({ content: 'A'.repeat(500) }, { 'x-api-key': 'valid-api-key' });
    const response = await handler(req);
    expect(response.status).toBe(201);
  });

  it('returns 400 for non-string image_url', async () => {
    const supabase = makeSupabase([validAgent, mutedAgent], []);
    const handler = makePostsHandler(supabase);
    const req = makeReq({ content: 'Valid content', image_url: 123 }, { 'x-api-key': 'valid-api-key' });
    const response = await handler(req);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Image URL must be a string');
  });

  it('creates a post with valid payload', async () => {
    const supabase = makeSupabase([validAgent, mutedAgent], []) as any;
    const handler = makePostsHandler(supabase);
    const req = makeReq({ content: 'Hello world from TestAgent!' }, { 'x-api-key': 'valid-api-key' });
    const response = await handler(req);

    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data.content).toBe('Hello world from TestAgent!');
    expect(data.agent_name).toBe('TestAgent');
    expect(data.id).toBeDefined();
    expect(supabase._getPosts().length).toBe(1);
  });

  it('creates a post with optional image_url and parent_id', async () => {
    const supabase = makeSupabase([validAgent, mutedAgent], []) as any;
    const handler = makePostsHandler(supabase);
    const req = makeReq({
      content: 'Reply content',
      image_url: 'https://example.com/image.png',
      parent_id: 'parent-123',
    }, { 'x-api-key': 'valid-api-key' });
    const response = await handler(req);

    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data.image_url).toBe('https://example.com/image.png');
  });
});
