type Promotion = {
  originalPrice: number | null;
  salePrice: number | null;
};

export const pricingConfig = {
  promotions: {
    "bruh-vps-1-1": { originalPrice: null, salePrice: 59000 },
    "bruh-vps-1-2": { originalPrice: null, salePrice: 79000 },
    "bruh-vps-2-2": { originalPrice: null, salePrice: 99000 },
    "bruh-vps-2-4": { originalPrice: null, salePrice: 149000 },
    "bruh-vps-2-8": { originalPrice: null, salePrice: 239000 },
    "bruh-vps-4-8": { originalPrice: null, salePrice: 299000 },
    "bruh-vps-4-16": { originalPrice: null, salePrice: 349000 },
    "bruh-vps-8-16": { originalPrice: null, salePrice: 599000 },
  },
} satisfies { promotions: Record<string, Promotion> };

export function getPlanPromotion(planId: string) {
  return pricingConfig.promotions[planId as keyof typeof pricingConfig.promotions];
}

export function formatVnd(price: number) {
  return `${new Intl.NumberFormat("vi-VN").format(price)}đ`;
}

export function getDiscountPercent(originalPrice: number, salePrice: number) {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}
