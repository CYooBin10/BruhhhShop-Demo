import { Icon } from "@/components/ui/Icon";
import type { Plan } from "@/types/site";

type PricingProps = {
  plans: Plan[];
  onOrder: (plan: Plan) => void;
};

export function Pricing({ plans, onOrder }: PricingProps) {
  return (
    <section className="section section-pricing" id="bang-gia">
      <div className="container">
        <div className="section-heading pricing-heading"><div><p className="section-label">Bảng giá</p><h2>Bảng giá <span>Bruh VPS</span></h2></div><p>Lựa chọn cấu hình phù hợp với nhu cầu của bạn.<br className="desktop-only" /> Rõ ràng, không vòng vo.</p></div>
        <div className="pricing-grid">
          {plans.map((plan) => <PricingCard key={plan.id} plan={plan} onOrder={onOrder} />)}
        </div>
        <p className="pricing-note"><Icon name="circle-check" /> Thông số chưa được liệt kê? <span>Liên hệ để biết thêm chi tiết.</span></p>
      </div>
    </section>
  );
}

function PricingCard({ plan, onOrder }: { plan: Plan; onOrder: (plan: Plan) => void }) {
  return (
    <article className={`pricing-card ${plan.popular ? "is-popular" : ""}`}>
      {plan.popular ? <div className="popular-ribbon">Phổ biến <Icon name="spark" /></div> : null}
      <div className="plan-top"><span className="plan-icon"><Icon name="server" /></span><span className="availability"><i /> {plan.status}</span></div>
      <p className="plan-eyebrow">Bruh VPS</p>
      <h3>{plan.name}</h3>
      <div className="plan-price"><strong>{plan.price}</strong><span>/{plan.period}</span></div>
      <div className="plan-rule" />
      <ul className="plan-features">
        <li><span><Icon name="cpu" /> CPU</span><strong>{plan.cpu}</strong></li>
        <li><span><Icon name="server" /> RAM</span><strong>{plan.ram}</strong></li>
        <li><span><Icon name="globe" /> Cổng mạng</span><strong>{plan.portSpeed}</strong></li>
        <li><span><Icon name="server" /> Ổ cứng NVMe tốc độ cao</span><strong>{plan.storage}</strong></li>
        <li><span><Icon name="shield" /> Bảo hành</span><strong>Trong điều khoản</strong></li>
        <li className="feature-muted"><span><Icon name="globe" /> Thông tin khác</span><strong>Liên hệ để biết thêm</strong></li>
      </ul>
      <details className="service-details">
        <summary>Thông tin dịch vụ <Icon name="chevron-down" /></summary>
        <div className="service-details-grid">{plan.serviceDetails.map((detail) => <div key={detail.label}><span>{detail.label}</span><strong>{detail.value}</strong></div>)}</div>
      </details>
      <button className={`button plan-button ${plan.popular ? "button-primary" : "button-ghost"}`} type="button" onClick={() => onOrder(plan)}>Mua ngay <Icon name="arrow-up-right" /></button>
    </article>
  );
}
