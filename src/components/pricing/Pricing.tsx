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
  return <section className="section section-pricing" id="bang-gia"><div className="container"><LegitTicker /><div className="section-heading pricing-heading"><div><p className="section-label">Bảng giá VPS</p><h2>Chọn cấu hình <span>phù hợp</span></h2></div><p>Hạ tầng {site.productName}, ổ NVMe và cổng mạng tối đa 1 Gbps. Chọn theo vCPU và RAM cần dùng.</p></div><div className="pricing-grid">{plans.map((plan) => <PricingCard key={plan.id} plan={plan} promotion={promotions[plan.id]} onOrder={onOrder} />)}</div><p className="pricing-note"><Icon name="circle-check" /> vCPU có thể là tài nguyên dùng chung. Tốc độ mạng thực tế phụ thuộc hạ tầng và tình trạng sử dụng. <Link href={site.legal.resourceUrl}>Xem Quy định sử dụng tài nguyên.</Link></p><p className="pricing-addon-note">Bổ sung dung lượng: cứ +20 GB disk = +25.000đ</p></div></section>;
}

function PricingCard({ plan, promotion, onOrder }: { plan: Plan; promotion?: PlanPromotionConfig; onOrder: (plan: Plan) => void }) {
  const { business } = useRuntimeConfig();
  const originalPrice = promotion?.originalPrice ?? 0;
  const salePrice = promotion?.salePrice ?? 0;
  const hasPromotion = originalPrice > salePrice && salePrice > 0;
  const discountPercent = hasPromotion ? getDiscountPercent(originalPrice, salePrice) : null;
  const displayedPrice = hasPromotion ? formatVnd(salePrice) : plan.price;
  const outOfStock = plan.status === "Hết hàng";

  return <article className={`pricing-card ${plan.popular ? "is-popular" : ""}`}><div className="plan-top"><span className="plan-type">{plan.popular ? <><Icon name="spark" /> Gói nổi bật</> : "Cloud VPS"}</span><span className={`availability ${outOfStock ? "is-out" : ""}`}><i /> {plan.status}</span></div><h3>{plan.name}</h3><div className="plan-price"><div className="plan-sale"><strong>{displayedPrice}</strong><span>/{plan.period}</span></div><div className="plan-price-meta">{hasPromotion ? <><s>{formatVnd(originalPrice)}</s><span className="discount-badge">Giảm {discountPercent}%</span></> : <span className="standard-price">Thanh toán theo tháng</span>}</div></div><div className="plan-resources"><div><strong>{plan.cpu.replace(" vCPU", "")}</strong><span>vCPU</span></div><div><strong>{plan.ram.replace(" GB", "")}</strong><span>GB RAM</span></div><div><strong>{plan.storage.replace(" GB NVMe", "")}</strong><span>GB NVMe</span></div></div><ul className="plan-features"><li><span>CPU</span><strong>{business.infrastructure.cpuModel}</strong></li><li><span>Cổng mạng</span><strong>{plan.portSpeed}</strong></li><li><span>Anti-DDoS</span><strong>{business.infrastructure.ddosProtection}</strong></li></ul><button className={`button plan-button ${plan.popular ? "button-primary" : "button-ghost"}`} disabled={outOfStock} type="button" onClick={() => onOrder(plan)}>{outOfStock ? "Tạm hết hàng" : "Chọn gói này"} <Icon name="arrow-up-right" /></button></article>;
}
