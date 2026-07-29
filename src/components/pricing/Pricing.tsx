import Link from "next/link";
import { businessConfig } from "@/config/business";
import { policyUrls } from "@/config/policies";
import { formatVnd, getDiscountPercent, getPlanPromotion } from "@/config/pricing";
import { Icon } from "@/components/ui/Icon";
import type { Plan } from "@/types/site";

type PricingProps = {
  plans: Plan[];
  onOrder: (plan: Plan) => void;
};

export function Pricing({ plans, onOrder }: PricingProps) {
  return <section className="section section-pricing" id="bang-gia"><div className="container"><div className="section-heading pricing-heading"><div><p className="section-label">Bảng giá</p><h2>Chọn gói <span>Bruh VPS</span></h2></div></div><div className="pricing-grid">{plans.map((plan) => <PricingCard key={plan.id} plan={plan} onOrder={onOrder} />)}</div><p className="pricing-note"><Icon name="circle-check" /> vCPU có thể là tài nguyên dùng chung. Tốc độ mạng thực tế phụ thuộc hạ tầng và tình trạng sử dụng. <Link href={policyUrls.resources}>Xem Quy định sử dụng tài nguyên.</Link></p><p className="pricing-addon-note">Bổ sung dung lượng: cứ +20 GB disk = +25.000đ</p></div></section>;
}

function PricingCard({ plan, onOrder }: { plan: Plan; onOrder: (plan: Plan) => void }) {
  const promotion = getPlanPromotion(plan.id);
  const originalPrice = promotion?.originalPrice ?? 0;
  const salePrice = promotion?.salePrice ?? 0;
  const hasPromotion = originalPrice > salePrice && salePrice > 0;
  const discountPercent = hasPromotion ? getDiscountPercent(originalPrice, salePrice) : null;
  const displayedPrice = hasPromotion ? formatVnd(salePrice) : plan.price;
  const outOfStock = plan.status === "Hết hàng";

  return <article className={`pricing-card ${plan.popular ? "is-popular" : ""}`}>{plan.popular ? <div className="popular-ribbon">Phổ biến <Icon name="spark" /></div> : null}<div className="plan-top"><span className={`availability ${outOfStock ? "is-out" : ""}`}><i /> {plan.status}</span></div><div className="plan-label-row"><p className="plan-eyebrow">Bruh VPS</p>{discountPercent ? <span className="discount-badge">-{discountPercent}%</span> : null}</div><h3>{plan.name}</h3><div className={`plan-price ${hasPromotion ? "has-promotion" : ""}`}>{hasPromotion ? <s>{formatVnd(originalPrice)}</s> : null}<div className="plan-sale"><strong>{displayedPrice}</strong><span>/{plan.period}</span></div></div><div className="plan-rule" /><ul className="plan-features"><li><span><Icon name="cpu" /> vCPU</span><strong>{plan.cpu}</strong></li><li><span><Icon name="server" /> RAM</span><strong>{plan.ram}</strong></li><li><span><Icon name="cpu" /> CPU</span><strong>{businessConfig.infrastructure.cpuModel}</strong></li><li><span><Icon name="server" /> Ổ đĩa</span><strong>{plan.storage}</strong></li><li><span><Icon name="globe" /> Băng thông</span><strong>{plan.portSpeed}</strong></li><li><span><Icon name="shield" /> Chống DDoS</span><strong>{businessConfig.infrastructure.ddosProtection}</strong></li></ul><button className={`button plan-button ${plan.popular ? "button-primary" : "button-ghost"}`} disabled={outOfStock} type="button" onClick={() => onOrder(plan)}>{outOfStock ? "Tạm hết hàng" : "Đăng ký gói này"} <Icon name="arrow-up-right" /></button></article>;
}
