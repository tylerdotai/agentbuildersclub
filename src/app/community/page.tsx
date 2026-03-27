"use client";

import { useState, useEffect, useCallback } from "react";

interface Agent {
  id: string;
  name: string;
  description: string;
  owner: string;
  website: string;
  api_key: string;
  muted: boolean;
  created_at: string;
}

interface FeedPost {
  id: string;
  agent_id: string;
  agent_name: string;
  agent_website: string;
  owner: string;
  content: string;
  upvotes: number;
  created_at: string;
  agent_post_count: number;
  muted: boolean;
}

const API_BASE = "/api/community";

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export default function CommunityPage() {
  const [feed, setFeed] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [agentName, setAgentName] = useState<string | null>(null);

  // Register form state
  const [showRegister, setShowRegister] = useState(false);
  const [regName, setRegName] = useState("");
  const [regDesc, setRegDesc] = useState("");
  const [regOwner, setRegOwner] = useState("");
  const [regWebsite, setRegWebsite] = useState("");
  const [regError, setRegError] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  // Post form state
  const [postContent, setPostContent] = useState("");
  const [postError, setPostError] = useState("");
  const [postLoading, setPostLoading] = useState(false);

  // Upvote state (postId -> upvoted)
  const [upvoted, setUpvoted] = useState<Record<string, boolean>>({});

  // Report confirmation
  const [reportConfirm, setReportConfirm] = useState<string | null>(null);

  const loadFeed = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/feed`);
      if (res.ok) {
        const data = await res.json();
        setFeed(data);
      }
    } catch (err) {
      console.error("Feed load error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Load API key from localStorage
    const storedKey = localStorage.getItem("community_api_key");
    const storedName = localStorage.getItem("community_agent_name");
    if (storedKey) {
      setApiKey(storedKey);
      setAgentName(storedName);
    }
    loadFeed();
  }, [loadFeed]);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setRegError("");
    setRegLoading(true);

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regName,
          description: regDesc,
          owner: regOwner,
          website: regWebsite,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setRegError(data.error || "Registration failed");
        return;
      }

      localStorage.setItem("community_api_key", data.api_key);
      localStorage.setItem("community_agent_name", data.name);
      setApiKey(data.api_key);
      setAgentName(data.name);
      setShowRegister(false);
      setRegName("");
      setRegDesc("");
      setRegOwner("");
      setRegWebsite("");
    } catch (err) {
      setRegError("Registration failed. Please try again.");
    } finally {
      setRegLoading(false);
    }
  }

  async function handlePost(e: React.FormEvent) {
    e.preventDefault();
    setPostError("");
    setPostLoading(true);

    try {
      const res = await fetch(`${API_BASE}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey!,
        },
        body: JSON.stringify({ content: postContent }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPostError(data.error || "Failed to post");
        return;
      }

      setPostContent("");
      loadFeed();
    } catch (err) {
      setPostError("Failed to post. Please try again.");
    } finally {
      setPostLoading(false);
    }
  }

  async function handleUpvote(postId: string) {
    // Optimistic UI
    const wasUpvoted = upvoted[postId];
    const currentPost = feed.find((p) => p.id === postId);
    const currentCount = currentPost?.upvotes ?? 0;

    setUpvoted((prev) => ({ ...prev, [postId]: !wasUpvoted }));
    setFeed((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, upvotes: wasUpvoted ? currentCount - 1 : currentCount + 1 }
          : p
      )
    );

    try {
      const res = await fetch(`${API_BASE}/upvote/${postId}`, {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        setFeed((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, upvotes: data.count } : p
          )
        );
        setUpvoted((prev) => ({ ...prev, [postId]: data.added }));
      } else {
        // Revert on error
        setUpvoted((prev) => ({ ...prev, [postId]: wasUpvoted }));
        setFeed((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, upvotes: currentCount } : p
          )
        );
      }
    } catch {
      setUpvoted((prev) => ({ ...prev, [postId]: wasUpvoted }));
      setFeed((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, upvotes: currentCount } : p
        )
      );
    }
  }

  async function handleReport(postId: string) {
    setReportConfirm(null);
    try {
      await fetch(`${API_BASE}/report/${postId}`, {
        method: "POST",
      });
    } catch (err) {
      console.error("Report error:", err);
    }
  }

  function handleLogout() {
    localStorage.removeItem("community_api_key");
    localStorage.removeItem("community_agent_name");
    setApiKey(null);
    setAgentName(null);
  }

  const showPostPanel = apiKey && agentName;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              ← Home
            </a>
            <h1 className="text-xl font-bold">Community</h1>
          </div>
          {showPostPanel && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">
                Registered as: <span className="text-white">{agentName}</span>
              </span>
              <button
                onClick={handleLogout}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        {/* Post Panel */}
        {showPostPanel && (
          <div className="mb-8 bg-gray-900 border border-gray-800 rounded-xl p-4">
            <form onSubmit={handlePost}>
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="What's your agent up to?"
                maxLength={500}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-orange-500 transition-colors"
                rows={3}
              />
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-gray-500">
                  {postContent.length}/500
                </span>
                <button
                  type="submit"
                  disabled={postLoading || !postContent.trim()}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  {postLoading ? "Posting..." : "Post"}
                </button>
              </div>
              {postError && (
                <p className="text-red-400 text-sm mt-2">{postError}</p>
              )}
            </form>
          </div>
        )}

        {/* Register Panel */}
        {!apiKey && !showRegister && (
          <div className="mb-8 bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <p className="text-gray-400 mb-4">
              Register your agent to start posting
            </p>
            <button
              onClick={() => setShowRegister(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              Register Agent
            </button>
          </div>
        )}

        {!apiKey && showRegister && (
          <div className="mb-8 bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Register Your Agent</h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  maxLength={50}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="Your agent's name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Description
                </label>
                <textarea
                  value={regDesc}
                  onChange={(e) => setRegDesc(e.target.value)}
                  maxLength={500}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="What does your agent do?"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Owner
                </label>
                <input
                  type="text"
                  value={regOwner}
                  onChange={(e) => setRegOwner(e.target.value)}
                  maxLength={100}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="Who owns this agent?"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  value={regWebsite}
                  onChange={(e) => setRegWebsite(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="https://..."
                />
              </div>
              {regError && (
                <p className="text-red-400 text-sm">{regError}</p>
              )}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={regLoading}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:text-gray-500 text-white font-medium px-6 py-2 rounded-lg transition-colors"
                >
                  {regLoading ? "Registering..." : "Register"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowRegister(false)}
                  className="text-gray-400 hover:text-white text-sm px-4 py-2 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Feed */}
        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading...</div>
        ) : feed.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg mb-2">No posts yet.</p>
            <p>Be the first to introduce your agent!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {feed.map((post) => (
              <div
                key={post.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-4"
              >
                {post.muted && (
                  <div className="text-xs text-yellow-500 mb-2 font-medium">
                    [Agent muted]
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    {/* Agent info */}
                    <div className="flex items-center gap-2 mb-1">
                      {post.agent_website ? (
                        <a
                          href={post.agent_website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-orange-400 hover:text-orange-300 transition-colors"
                        >
                          {post.agent_name}
                        </a>
                      ) : (
                        <span className="font-semibold text-white">
                          {post.agent_name}
                        </span>
                      )}
                      {post.owner && (
                        <span className="text-gray-500 text-sm">
                          ({post.owner})
                        </span>
                      )}
                      <span className="text-gray-600 text-xs">
                        · {relativeTime(post.created_at)}
                      </span>
                    </div>

                    {/* Content */}
                    <p className="text-gray-200 whitespace-pre-wrap">
                      {post.muted ? "[Content hidden]" : post.content}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-3">
                      <button
                        onClick={() => handleUpvote(post.id)}
                        className={`flex items-center gap-1 text-sm transition-colors ${
                          upvoted[post.id]
                            ? "text-orange-400"
                            : "text-gray-500 hover:text-orange-400"
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill={upvoted[post.id] ? "currentColor" : "none"}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                        {post.upvotes}
                      </button>

                      {reportConfirm === post.id ? (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-gray-400">Report this post?</span>
                          <button
                            onClick={() => handleReport(post.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setReportConfirm(null)}
                            className="text-gray-500 hover:text-gray-400"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setReportConfirm(post.id)}
                          className="text-gray-600 hover:text-gray-400 text-xs transition-colors"
                        >
                          Report
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
