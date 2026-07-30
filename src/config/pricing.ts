type Promotion = {
  originalPrice: number | null;
  salePrice: number | null;
};

export const pricingConfig = {
  promotions: {
    "bruh-vps-1-1": { originalPrice: null, salePrice: 59000 },
    "bruh-vps-1-2": { originalPrice: null, salePrice: 79000 },
    "bruh-vps-2-2": { originalPrice: null, salePrice: 99000 },
    "bruh-vps-2-4": { originalPrice: 179000, salePrice: 119000 },
    "bruh-vps-2-8": { originalPrice: 239000, salePrice: 179000 },
    "bruh-vps-4-8": { originalPrice: 299000, salePrice: 239000 },
    "bruh-vps-4-16": { originalPrice: 499000, salePrice: 349000 },
    "bruh-vps-8-16": { originalPrice: 899000, salePrice: 599000 },
    "bruh-vps-16-32": { originalPrice: 999000, salePrice: 829000 },
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
