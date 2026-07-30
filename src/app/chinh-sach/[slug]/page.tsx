import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyShell } from "@/components/policy/PolicyShell";
import { PolicyLayout } from "@/components/policy/PolicyLayout";
import { policyLinks } from "@/config/policies";
import { getRuntimeConfig } from "@/config/runtime";
import { buildPolicies, getPolicy } from "@/data/policies";

type PolicyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return policyLinks.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PolicyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = await getRuntimeConfig();
  const policy = getPolicy(buildPolicies(config), slug);
  if (!policy) return {};
  return { title: `${policy.title} | ${config.site.name}`, description: policy.description };
}

export default async function PolicyPage({ params }: PolicyPageProps) {
  const { slug } = await params;
  const config = await getRuntimeConfig();
  const policy = getPolicy(buildPolicies(config), slug);
  if (!policy) notFound();
  return <PolicyShell><PolicyLayout config={config} policy={policy} /></PolicyShell>;
}
