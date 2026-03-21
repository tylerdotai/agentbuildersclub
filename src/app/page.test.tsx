import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Home from "./page";

describe("home page", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ ok: true }),
    }) as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("shows the core community sections for new visitors", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: /build together/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /what is clawplex/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /meet the hosts/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /faq/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /join the discord/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /rsvp now/i })).toBeInTheDocument();
  });

  it("submits newsletter signups through the site subscribe api", async () => {
    render(<Home />);

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "member@example.com" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /join the list/i }).closest("form")!);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/subscribe",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }),
      );
    });
  });
});
