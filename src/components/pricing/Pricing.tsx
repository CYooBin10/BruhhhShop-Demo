import Link from "next/link";
import { businessConfig } from "@/config/business";
import { policyUrls } from "@/config/policies";
import { Icon } from "@/components/ui/Icon";
import type { Plan } from "@/types/site";

type PricingProps = {
  plans: Plan[];
  onOrder: (plan: Plan) => void;
};

export function Pricing({ plans, onOrder }: PricingProps) {
  return <section className="section section-pricing" id="bang-gia"><div className="container"><div className="section-heading pricing-heading"><div><p className="section-label">Bảng giá</p><h2>Chọn gói <span>Bruh VPS</span></h2></div><p>Thông tin chưa công bố: liên hệ để xác nhận trước khi thanh toán.</p></div><div className="pricing-grid">{plans.map((plan) => <PricingCard key={plan.id} plan={plan} onOrder={onOrder} />)}</div><p className="pricing-note"><Icon name="circle-check" /> vCPU có thể là tài nguyên dùng chung. Tốc độ mạng thực tế phụ thuộc hạ tầng và tình trạng sử dụng. <Link href={policyUrls.resources}>Xem Quy định sử dụng tài nguyên.</Link></p></div></section>;
}

function PricingCard({ plan, onOrder }: { plan: Plan; onOrder: (plan: Plan) => void }) {
  return <article className={`pricing-card ${plan.popular ? "is-popular" : ""}`}>{plan.popular ? <div className="popular-ribbon">Phổ biến <Icon name="spark" /></div> : null}<div className="plan-top"><span className="plan-icon"><Icon name="server" /></span><span className="availability"><i /> {plan.status}</span></div><p className="plan-eyebrow">{plan.name}</p><div className="plan-price"><strong>{plan.price}</strong><span>/{plan.period}</span></div><div className="plan-rule" /><ul className="plan-features"><li><span><Icon name="cpu" /> vCPU</span><strong>{plan.cpu}</strong></li><li><span><Icon name="server" /> RAM</span><strong>{plan.ram}</strong></li><li><span><Icon name="cpu" /> CPU</span><strong>{businessConfig.infrastructure.cpuModel}</strong></li><li><span><Icon name="server" /> Ổ đĩa</span><strong>120 GB</strong></li><li><span><Icon name="globe" /> Cổng mạng</span><strong>{plan.portSpeed}</strong></li></ul><button className={`button plan-button ${plan.popular ? "button-primary" : "button-ghost"}`} type="button" onClick={() => onOrder(plan)}>Đăng ký gói này <Icon name="arrow-up-right" /></button></article>;
}
