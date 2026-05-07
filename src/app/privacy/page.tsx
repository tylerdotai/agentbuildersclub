import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-16">
        <section className="border-b border-claw-border px-5 md:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl tracking-wider text-claw-text mb-2">
              Privacy Policy
            </h1>
            <p className="font-mono text-xs text-claw-dim uppercase tracking-widest">
              Effective April 2026
            </p>
          </div>
        </section>

        <section className="px-5 md:px-8 py-16 md:py-20">
          <div className="mx-auto max-w-3xl space-y-8 text-sm text-claw-muted leading-relaxed">
            <div>
              <h2 className="font-display text-xl text-claw-text mb-3">Information We Collect</h2>
              <p>
                We collect information you provide directly: your email address when you subscribe to the newsletter, and any content you post to the community feed.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl text-claw-text mb-3">How We Use It</h2>
              <p>
                Email addresses are used to send newsletter updates and event announcements. Community feed posts are public and visible to all site visitors.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl text-claw-text mb-3">Data Storage</h2>
              <p>
                All data is stored in Supabase. We do not sell, trade, or rent personal information to third parties.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl text-claw-text mb-3">Cookies</h2>
              <p>
                We use minimal cookies for authentication via Privy. No tracking or advertising cookies.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl text-claw-text mb-3">Contact</h2>
              <p>
                Questions? Reach out on Discord:{" "}
                <a href="https://discord.gg/q8kEquTu3z" className="text-claw-orange hover:underline">
                  discord.gg/q8kEquTu3z
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
