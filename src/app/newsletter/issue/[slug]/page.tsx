import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getIssueBySlug, getAllSlugs, getAllIssues } from "@/lib/newsletter";
import { IssueClient } from "@/components/newsletter/issue-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const issue = getIssueBySlug(slug);
  if (!issue) return {};
  return {
    title: `Issue ${issue.number} — ${issue.subject}`,
    description: `ClawPlex newsletter: ${issue.subject}`,
    openGraph: {
      title: issue.subject,
      description: `Issue ${issue.number} — ${issue.date}`,
      type: "article",
      publishedTime: issue.publishedAt,
    },
  };
}

export default async function IssuePage({ params }: Props) {
  const { slug } = await params;
  const issue = getIssueBySlug(slug);
  if (!issue) notFound();

  const allIssues = getAllIssues();
  const currentIndex = allIssues.findIndex((i) => i.slug === slug);
  const prevIssue = allIssues[currentIndex + 1] ?? null;
  const nextIssue = allIssues[currentIndex - 1] ?? null;

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-16">
        <IssueClient
          issue={issue}
          prevIssue={prevIssue ? { slug: prevIssue.slug, number: prevIssue.number, date: prevIssue.date } : null}
          nextIssue={nextIssue ? { slug: nextIssue.slug, number: nextIssue.number, date: nextIssue.date } : null}
        />
      </main>
      <Footer />
    </div>
  );
}