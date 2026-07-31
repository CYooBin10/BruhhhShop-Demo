import "server-only";

import { unstable_cache } from "next/cache";
import { businessConfig, unknownValue } from "@/config/business";
import { policyLinks } from "@/config/policies";
import { pricingConfig } from "@/config/pricing";
import { navigation, siteConfig } from "@/config/site";
import { plans } from "@/data/plans";
import type { NavigationItem, Plan, PlanPromotionConfig, PublicBusinessConfig, PublicPolicyLink, PublicSiteConfig, RuntimeConfig } from "@/types/site";

const DISCORD_API = "https://discord.com/api/v10";
const CONFIG_CHANNEL_ID = "1532425170193616946";
const CONFIG_AUTHOR_IDS = new Set(["1281879502557024357", "924989476588109844"]);
const CONFIG_FILE_NAME = "discord-config.json";
const CONFIG_MAX_BYTES = 65536;
const CONFIG_CDN_HOSTS = new Set(["cdn.discordapp.com", "media.discordapp.net"]);
const POLICY_SLUGS = new Set<string>(policyLinks.map(({ slug }) => slug));
const PLAN_STATUSES = new Set(["Còn hàng", "Hết hàng"]);

const fallbackConfig: RuntimeConfig = {
  site: {
    ...siteConfig,
    notifications: siteConfig.notifications.map((item) => ({ ...item })),
    contact: { ...siteConfig.contact },
    legal: { ...siteConfig.legal },
  },
  navigation: navigation.map((item) => ({ ...item })),
  business: {
    unknownValue,
    ...businessConfig,
    paymentMethods: [...businessConfig.paymentMethods],
    infrastructure: { ...businessConfig.infrastructure },
  },
  policyLinks: policyLinks.map((item) => ({ ...item })),
  plans: plans.map((plan) => ({ ...plan })),
  promotions: Object.fromEntries(Object.entries(pricingConfig.promotions).map(([planId, promotion]) => [planId, { ...promotion }])),
};

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown, maxLength: number) {
  return typeof value === "string" && value.length > 0 && value.length <= maxLength ? value.trim() : null;
}

function urlValue(value: unknown) {
  const text = stringValue(value, 500);
  if (!text) return null;
  try {
    const url = new URL(text);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function localPath(value: unknown) {
  const text = stringValue(value, 160);
  return text && text.startsWith("/") && !text.startsWith("//") ? text : null;
}

function navigationHref(value: unknown) {
  const text = stringValue(value, 160);
  return text && (text.startsWith("#") || localPath(text)) ? text : null;
}

function numberValue(value: unknown, min: number, max: number) {
  return typeof value === "number" && Number.isInteger(value) && value >= min && value <= max ? value : null;
}

function nullableNumber(value: unknown, min: number, max: number): number | null | undefined {
  if (value === null) return null;
  const parsed = numberValue(value, min, max);
  return parsed === null ? undefined : parsed;
}

function parseSite(value: unknown): PublicSiteConfig | null {
  if (!isRecord(value) || !isRecord(value.contact) || !isRecord(value.legal) || !Array.isArray(value.notifications)) return null;
  const name = stringValue(value.name, 80);
  const productName = stringValue(value.productName, 100);
  const title = stringValue(value.title, 160);
  const url = urlValue(value.url);
  const description = stringValue(value.description, 500);
  const facebookUrl = urlValue(value.contact.facebookUrl);
  const discordUrl = urlValue(value.contact.discordUrl);
  const phone = stringValue(value.contact.phone, 40);
  const email = stringValue(value.contact.email, 254);
  const termsUrl = localPath(value.legal.termsUrl);
  const warrantyUrl = localPath(value.legal.warrantyUrl);
  const privacyUrl = localPath(value.legal.privacyUrl);
  const paymentUrl = localPath(value.legal.paymentUrl);
  const resourceUrl = localPath(value.legal.resourceUrl);
  const notifications = value.notifications.map((item) => {
    if (!isRecord(item)) return null;
    const id = stringValue(item.id, 80);
    const title = stringValue(item.title, 120);
    const message = stringValue(item.message, 500);
    return id && title && message ? { id, title, message } : null;
  });
  if (!name || !productName || !title || !url || !description || !facebookUrl || !discordUrl || !phone || !email || !termsUrl || !warrantyUrl || !privacyUrl || !paymentUrl || !resourceUrl || notifications.length > 12 || notifications.some((item) => item === null)) return null;
  const ids = new Set(notifications.map((item) => item!.id));
  if (ids.size !== notifications.length) return null;
  return { name, productName, title, url, description, notifications: notifications as PublicSiteConfig["notifications"], contact: { facebookUrl, discordUrl, phone, email }, legal: { termsUrl, warrantyUrl, privacyUrl, paymentUrl, resourceUrl } };
}

function parseNavigation(value: unknown): NavigationItem[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > 12) return null;
  const items = value.map((item) => {
    if (!isRecord(item)) return null;
    const label = stringValue(item.label, 80);
    const href = navigationHref(item.href);
    return label && href ? { label, href } : null;
  });
  return items.some((item) => item === null) || new Set(items.map((item) => item?.href)).size !== items.length ? null : items as NavigationItem[];
}

function parseBusiness(value: unknown): PublicBusinessConfig | null {
  if (!isRecord(value) || !isRecord(value.infrastructure) || !Array.isArray(value.paymentMethods)) return null;
  const unknown = stringValue(value.unknownValue, 80);
  const supportHours = stringValue(value.supportHours, 80);
  const supportChannel = stringValue(value.supportChannel, 160);
  const warrantyResponseTime = stringValue(value.warrantyResponseTime, 160);
  const technicalInspectionTime = stringValue(value.technicalInspectionTime, 160);
  const maxResolutionTime = stringValue(value.maxResolutionTime, 160);
  const refundProcessingTime = stringValue(value.refundProcessingTime, 160);
  const refundWindowHours = nullableNumber(value.refundWindowHours, 1, 720);
  const deliveryTime = stringValue(value.deliveryTime, 160);
  const lastPolicyUpdate = stringValue(value.lastPolicyUpdate, 40);
  const paymentMethods = value.paymentMethods.map((method) => stringValue(method, 80));
  const cpuModel = stringValue(value.infrastructure.cpuModel, 160);
  const vcpuType = stringValue(value.infrastructure.vcpuType, 160);
  const portSpeed = stringValue(value.infrastructure.portSpeed, 80);
  const monthlyTraffic = stringValue(value.infrastructure.monthlyTraffic, 160);
  const datacenter = stringValue(value.infrastructure.datacenter, 160);
  const ddosProtection = stringValue(value.infrastructure.ddosProtection, 160);
  const supportedOperatingSystems = stringValue(value.infrastructure.supportedOperatingSystems, 300);
  const backupPolicy = stringValue(value.infrastructure.backupPolicy, 300);
  const fairUsePolicy = stringValue(value.infrastructure.fairUsePolicy, 300);
  if (!unknown || !supportHours || !supportChannel || !warrantyResponseTime || !technicalInspectionTime || !maxResolutionTime || !refundProcessingTime || refundWindowHours === undefined || !deliveryTime || !lastPolicyUpdate || paymentMethods.length > 12 || paymentMethods.some((method) => method === null) || !cpuModel || !vcpuType || !portSpeed || !monthlyTraffic || !datacenter || !ddosProtection || !supportedOperatingSystems || !backupPolicy || !fairUsePolicy) return null;
  return { unknownValue: unknown, supportHours, supportChannel, warrantyResponseTime, technicalInspectionTime, maxResolutionTime, refundProcessingTime, refundWindowHours, deliveryTime, paymentMethods: paymentMethods as string[], lastPolicyUpdate, infrastructure: { cpuModel, vcpuType, portSpeed, monthlyTraffic, datacenter, ddosProtection, supportedOperatingSystems, backupPolicy, fairUsePolicy } };
}

function parsePolicyLinks(value: unknown): PublicPolicyLink[] | null {
  if (!Array.isArray(value) || value.length !== POLICY_SLUGS.size) return null;
  const items = value.map((item) => {
    if (!isRecord(item)) return null;
    const slug = stringValue(item.slug, 80);
    const label = stringValue(item.label, 160);
    return slug && label && POLICY_SLUGS.has(slug) ? { slug, label } : null;
  });
  return items.some((item) => item === null) || new Set(items.map((item) => item?.slug)).size !== POLICY_SLUGS.size ? null : items as PublicPolicyLink[];
}

function parsePlans(value: unknown): Plan[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > 20) return null;
  const plans = value.map((item) => {
    if (!isRecord(item)) return null;
    const id = stringValue(item.id, 100);
    const name = stringValue(item.name, 120);
    const cpu = stringValue(item.cpu, 80);
    const ram = stringValue(item.ram, 80);
    const portSpeed = stringValue(item.portSpeed, 100);
    const storage = stringValue(item.storage, 100);
    const price = stringValue(item.price, 80);
    const period = stringValue(item.period, 40);
    const status = stringValue(item.status, 40);
    const popular = typeof item.popular === "boolean" ? item.popular : undefined;
    return id && name && cpu && ram && portSpeed && storage && price && period && status && PLAN_STATUSES.has(status) ? { id, name, cpu, ram, portSpeed, storage, price, period, status, ...(popular === undefined ? {} : { popular }) } : null;
  });
  return plans.some((plan) => plan === null) || new Set(plans.map((plan) => plan?.id)).size !== plans.length ? null : plans as Plan[];
}

function parsePromotions(value: unknown, plans: Plan[]): Record<string, PlanPromotionConfig> | null {
  if (!isRecord(value)) return null;
  const promotions: Record<string, PlanPromotionConfig> = {};
  for (const plan of plans) {
    const promotion = value[plan.id];
    if (!isRecord(promotion)) return null;
    const originalPrice = nullableNumber(promotion.originalPrice, 1, 100000000);
    const salePrice = nullableNumber(promotion.salePrice, 1, 100000000);
    if (originalPrice === undefined || salePrice === undefined || salePrice === null || (originalPrice !== null && originalPrice <= salePrice)) return null;
    promotions[plan.id] = { originalPrice, salePrice };
  }
  return Object.keys(value).length === plans.length ? promotions : null;
}

function parseRuntimeConfig(value: unknown): RuntimeConfig | null {
  if (!isRecord(value) || value.version !== 1) return null;
  const site = parseSite(value.site);
  const navigation = parseNavigation(value.navigation);
  const business = parseBusiness(value.business);
  const policyLinks = parsePolicyLinks(value.policyLinks);
  const plans = parsePlans(value.plans);
  const promotions = plans ? parsePromotions(value.promotions, plans) : null;
  return site && navigation && business && policyLinks && plans && promotions ? { site, navigation, business, policyLinks, plans, promotions } : null;
}

function isConfigAttachment(value: unknown) {
  if (!isRecord(value) || value.filename !== CONFIG_FILE_NAME) return null;
  const url = urlValue(value.url);
  if (!url) return null;
  const hostname = new URL(url).hostname;
  return CONFIG_CDN_HOSTS.has(hostname) ? url : null;
}

function logConfigIssue(message: string) {
  console.error(`[runtime-config] ${message}`);
}

async function fetchRemoteConfig() {
  const token = process.env.DISCORD_CONFIG_BOT_TOKEN;
  if (!token) {
    logConfigIssue("DISCORD_CONFIG_BOT_TOKEN is not set; using local fallback.");
    return null;
  }
  try {
    const messagesResponse = await fetch(`${DISCORD_API}/channels/${CONFIG_CHANNEL_ID}/messages?limit=50`, { headers: { Authorization: `Bot ${token}`, Accept: "application/json" }, next: { revalidate: 60 }, signal: AbortSignal.timeout(10000) });
    if (!messagesResponse.ok) {
      logConfigIssue(`Discord messages request failed with HTTP ${messagesResponse.status}; using local fallback.`);
      return null;
    }
    const messages: unknown = await messagesResponse.json();
    if (!Array.isArray(messages)) {
      logConfigIssue("Discord messages response is invalid; using local fallback.");
      return null;
    }
    const attachmentMessages = messages.filter((item) => isRecord(item) && Array.isArray(item.attachments) && item.attachments.some(isConfigAttachment));
    const message = attachmentMessages.find((item) => isRecord(item) && isRecord(item.author) && typeof item.author.id === "string" && CONFIG_AUTHOR_IDS.has(item.author.id));
    if (!message || !isRecord(message) || !Array.isArray(message.attachments)) {
      const authorIds = attachmentMessages.flatMap((item) => isRecord(item) && isRecord(item.author) && typeof item.author.id === "string" ? [item.author.id] : []);
      logConfigIssue(authorIds.length > 0 ? `Found discord-config.json from disallowed author ID(s): ${[...new Set(authorIds)].join(", ")}; using local fallback.` : "No discord-config.json attachment was found; using local fallback.");
      return null;
    }
    const attachmentUrl = message.attachments.map(isConfigAttachment).find((url): url is string => url !== null);
    if (!attachmentUrl) {
      logConfigIssue("Config attachment URL is invalid; using local fallback.");
      return null;
    }
    const configResponse = await fetch(attachmentUrl, { next: { revalidate: 60 }, signal: AbortSignal.timeout(10000) });
    if (!configResponse.ok || !CONFIG_CDN_HOSTS.has(new URL(configResponse.url).hostname)) {
      logConfigIssue("Config attachment could not be downloaded; using local fallback.");
      return null;
    }
    const contentLength = Number(configResponse.headers.get("content-length"));
    if (Number.isFinite(contentLength) && contentLength > CONFIG_MAX_BYTES) {
      logConfigIssue("Config attachment exceeds 64 KB; using local fallback.");
      return null;
    }
    const content = await configResponse.text();
    if (content.length > CONFIG_MAX_BYTES) {
      logConfigIssue("Config attachment exceeds 64 KB; using local fallback.");
      return null;
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch {
      logConfigIssue("Config attachment is not valid JSON; using local fallback.");
      return null;
    }
    const config = parseRuntimeConfig(parsed);
    if (!config) logConfigIssue("Config attachment does not match required schema; using local fallback.");
    return config;
  } catch {
    logConfigIssue("Discord config request failed; using local fallback.");
    return null;
  }
}

export const getRuntimeConfig = unstable_cache(async (): Promise<RuntimeConfig> => await fetchRemoteConfig() ?? fallbackConfig, ["discord-runtime-config"], { revalidate: 60 });
