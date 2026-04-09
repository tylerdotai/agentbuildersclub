import type { Metadata } from "next";
import "./globals.css";
import { PrivyWrapper } from "@/components/privy-wrapper";
import { Montserrat, Karla } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clawplex.dev"),
  title: "ClawPlex — DFW AI Builder Community",
  description:
    "The DFW home base for AI agent builders. Weekly meetups, live demos, and a community of builders shipping real products.",
  openGraph: {
    type: "website",
    siteName: "ClawPlex",
    url: "https://clawplex.dev",
    title: "ClawPlex — DFW AI Builder Community",
    description:
      "The DFW home base for AI agent builders. Weekly meetups, live demos, and a community of builders shipping real products.",
    images: [
      {
        url: "/clawplex-banner.jpg",
        width: 1200,
        height: 630,
        alt: "ClawPlex — DFW AI Builder Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClawPlex — DFW AI Builder Community",
    description:
      "The DFW home base for AI agent builders. Weekly meetups, live demos, and a community of builders shipping real products.",
    images: ["/clawplex-banner.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${montserrat.variable} ${karla.variable} bg-black text-white font-sans antialiased`}
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
      >
        <PrivyWrapper>{children}</PrivyWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
