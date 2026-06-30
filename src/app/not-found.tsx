import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="flex flex-col items-center justify-center min-h-[60vh] px-5 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-claw-blue mb-4">
          404
        </p>
        <h1 className="font-display text-6xl md:text-8xl tracking-wider text-claw-text mb-4">
          Not Found
        </h1>
        <p className="font-mono text-sm text-claw-muted mb-8">
          This page does not exist.
        </p>
        <Link
          href="/"
          className="border border-claw-blue bg-claw-blue px-8 py-4 font-mono text-sm uppercase tracking-widest text-claw-void hover:bg-claw-blue/90 transition-colors"
        >
          Back to Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
