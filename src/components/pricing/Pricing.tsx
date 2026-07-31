import Link from "next/link";
import { formatVnd, getDiscountPercent } from "@/config/pricing";
import { LegitTicker } from "@/components/legits/LegitTicker";
import { useRuntimeConfig } from "@/components/RuntimeConfigProvider";
import { Icon } from "@/components/ui/Icon";
import type { Plan, PlanPromotionConfig } from "@/types/site";

type PricingProps = {
  plans: Plan[];
  onOrder: (plan: Plan) => void;
};

export function Pricing({ plans, onOrder }: PricingProps) {
  const { promotions, site } = useRuntimeConfig();
  return <section className="section section-pricing" id="bang-gia"><div className="container"><LegitTicker /><div className="section-heading pricing-heading"><div><p className="section-label">Bảng giá</p><h2>Chọn gói <span>{site.productName}</span></h2></div></div><div className="pricing-grid">{plans.map((plan) => <PricingCard key={plan.id} plan={plan} promotion={promotions[plan.id]} onOrder={onOrder} />)}</div><p className="pricing-note"><Icon name="circle-check" /> vCPU có thể là tài nguyên dùng chung. Tốc độ mạng thực tế phụ thuộc hạ tầng và tình trạng sử dụng. <Link href={site.legal.resourceUrl}>Xem Quy định sử dụng tài nguyên.</Link></p><p className="pricing-addon-note">Bổ sung dung lượng: cứ +20 GB disk = +25.000đ</p></div></section>;
}

function PricingCard({ plan, promotion, onOrder }: { plan: Plan; promotion?: PlanPromotionConfig; onOrder: (plan: Plan) => void }) {
  const { business } = useRuntimeConfig();
  const originalPrice = promotion?.originalPrice ?? 0;
  const salePrice = promotion?.salePrice ?? 0;
  const hasPromotion = originalPrice > salePrice && salePrice > 0;
  const discountPercent = hasPromotion ? getDiscountPercent(originalPrice, salePrice) : null;
  const displayedPrice = hasPromotion ? formatVnd(salePrice) : plan.price;
  const outOfStock = plan.status === "Hết hàng";

  return <article className={`pricing-card ${plan.popular ? "is-popular" : ""}`}><div className="plan-top"><span className="plan-type">{plan.popular ? <><Icon name="spark" /> Được chọn nhiều</> : "Cloud VPS"}</span><span className={`availability ${outOfStock ? "is-out" : ""}`}><i /> {plan.status}</span></div><h3>{plan.name}</h3><div className={`plan-price ${hasPromotion ? "has-promotion" : ""}`}>{hasPromotion ? <div className="plan-price-meta"><s>{formatVnd(originalPrice)}</s><span className="discount-badge">Tiết kiệm {discountPercent}%</span></div> : null}<div className="plan-sale"><strong>{displayedPrice}</strong><span>/{plan.period}</span></div></div><ul className="plan-features"><li><span>vCPU</span><strong>{plan.cpu}</strong></li><li><span>RAM</span><strong>{plan.ram}</strong></li><li><span>CPU</span><strong>{business.infrastructure.cpuModel}</strong></li><li><span>Ổ đĩa</span><strong>{plan.storage}</strong></li><li><span>Băng thông</span><strong>{plan.portSpeed}</strong></li><li><span>Anti-DDoS</span><strong>{business.infrastructure.ddosProtection}</strong></li></ul><button className={`button plan-button ${plan.popular ? "button-primary" : "button-ghost"}`} disabled={outOfStock} type="button" onClick={() => onOrder(plan)}>{outOfStock ? "Tạm hết hàng" : "Đăng ký gói này"} <Icon name="arrow-up-right" /></button></article>;
}
