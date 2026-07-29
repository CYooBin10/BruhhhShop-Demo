type Promotion = {
  originalPrice: number | null;
  salePrice: number | null;
};

export const pricingConfig = {
  promotions: {
    "bruh-vps-1-1": { originalPrice: 89000, salePrice: 39000 },
    "bruh-vps-1-2": { originalPrice: 119000, salePrice: 69000 },
    "bruh-vps-2-4": { originalPrice: 179000, salePrice: 129000 },
    "bruh-vps-2-8": { originalPrice: 239000, salePrice: 189000 },
    "bruh-vps-4-8": { originalPrice: 289000, salePrice: 239000 },
    "bruh-vps-8-16": { originalPrice: 349000, salePrice: 299000 },
    "bruh-vps-16-32": { originalPrice: 449000, salePrice: 399000 },
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
