import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { withLocale } from "@/lib/i18n/config";
import { getRequestLocale } from "@/lib/i18n/server";

export function generateStaticParams() {
  return [];
}

export function generateMetadata(): Metadata {
  return {
    title: "The Drop",
    description: "Subscribe to ClawPlex updates from the DFW AI builder community.",
    robots: { index: false, follow: true },
  };
}

export default async function IssuePage() {
  const locale = await getRequestLocale();
  return redirect(withLocale("/newsletter", locale));
}
