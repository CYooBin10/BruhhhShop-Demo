export type PolicySectionData = {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export type PolicyData = {
  slug: string;
  title: string;
  description: string;
  sections: PolicySectionData[];
};

export type PlanPromotion = {
  enabled: boolean;
  originalPrice: string;
  label: string;
};

export type Plan = {
  id: string;
  name: string;
  cpu: string;
  ram: string;
  portSpeed: string;
  storage: string;
  price: string;
  period: string;
  status: string;
  popular?: boolean;
};

export type PublicSiteConfig = {
  name: string;
  productName: string;
  title: string;
  url: string;
  description: string;
  notifications: { id: string; title: string; message: string }[];
  contact: { facebookUrl: string; discordUrl: string; phone: string; email: string };
  legal: { termsUrl: string; warrantyUrl: string; privacyUrl: string; paymentUrl: string; resourceUrl: string };
};

export type NavigationItem = { label: string; href: string };
export type PublicBusinessConfig = {
  unknownValue: string;
  supportHours: string;
  supportChannel: string;
  warrantyResponseTime: string;
  technicalInspectionTime: string;
  maxResolutionTime: string;
  refundProcessingTime: string;
  refundWindowHours: number | null;
  deliveryTime: string;
  paymentMethods: string[];
  lastPolicyUpdate: string;
  infrastructure: { cpuModel: string; vcpuType: string; portSpeed: string; monthlyTraffic: string; datacenter: string; ddosProtection: string; supportedOperatingSystems: string; backupPolicy: string; fairUsePolicy: string };
};
export type PublicPolicyLink = { slug: string; label: string };
export type PlanPromotionConfig = { originalPrice: number | null; salePrice: number | null };
export type RuntimeConfig = { site: PublicSiteConfig; navigation: NavigationItem[]; business: PublicBusinessConfig; policyLinks: PublicPolicyLink[]; plans: Plan[]; promotions: Record<string, PlanPromotionConfig> };
