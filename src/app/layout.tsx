"use client";

import "./globals.css";
import { PrivyProvider } from "@privy-io/react-auth";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

function AppShell({ children }: { children: React.ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  if (appId) {
    return (
      <PrivyProvider
        appId={appId}
        config={{
          appearance: {
            theme: "dark",
            accentColor: "#FF6B00",
          },
          embeddedWallets: {
            ethereum: {},
          },
          loginMethods: ["email", "wallet"],
        }}
      >
        {children}
      </PrivyProvider>
    );
  }

  return <>{children}</>;
}

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
      <body className="bg-black text-white font-sans antialiased">
        <AppShell>{children}</AppShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
