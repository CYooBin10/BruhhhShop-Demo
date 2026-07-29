import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyShell } from "@/components/policy/PolicyShell";
import { PolicyLayout } from "@/components/policy/PolicyLayout";
import { policyLinks } from "@/config/policies";
import { getPolicy } from "@/data/policies";

type PolicyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return policyLinks.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PolicyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) return {};
  return { title: `${policy.title} | Bruhhh Cloud`, description: policy.description };
}

export default async function PolicyPage({ params }: PolicyPageProps) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) notFound();
  return <PolicyShell><PolicyLayout policy={policy} /></PolicyShell>;
}
