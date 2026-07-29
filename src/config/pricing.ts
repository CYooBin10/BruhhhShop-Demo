export const pricingConfig = {
  promotions: {
    "bruh-vps-1-1": { enabled: false, originalPrice: "", label: "Giảm giá" },
    "bruh-vps-1-2": { enabled: false, originalPrice: "", label: "Giảm giá" },
    "bruh-vps-2-4": { enabled: false, originalPrice: "", label: "Giảm giá" },
    "bruh-vps-2-8": { enabled: false, originalPrice: "", label: "Giảm giá" },
    "bruh-vps-4-8": { enabled: false, originalPrice: "", label: "Giảm giá" },
    "bruh-vps-8-16": { enabled: false, originalPrice: "", label: "Giảm giá" },
  },
} as const;

export function getPlanPromotion(planId: string) {
  return pricingConfig.promotions[planId as keyof typeof pricingConfig.promotions];
}
