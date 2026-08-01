import { Footer } from "@/components/layout/Footer";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { PricingSection } from "@/components/pricing/PricingSection";
import { Advantages } from "@/components/sections/Advantages";
import { Contact } from "@/components/sections/Contact";
import { PolicySummaries } from "@/components/sections/PolicySummaries";
import { UseCases } from "@/components/sections/UseCases";
import { Icon } from "@/components/ui/Icon";
import { getRuntimeConfig } from "@/config/runtime";

export async function VpsPage() {
  const { business, plans } = await getRuntimeConfig();
  const starterPlan = plans.find((plan) => plan.status === "Còn hàng") ?? plans[0];
  if (!starterPlan) return <><SiteNavbar /><main><section className="vps-page-hero"><div className="container"><p className="section-label">DiabloNode VPS</p><h1>Các gói VPS</h1><p>Hiện chưa có gói VPS khả dụng.</p></div></section></main><Footer /></>;
  return <><SiteNavbar /><main><section className="vps-page-hero"><div className="container"><p className="section-label">DiabloNode VPS</p><h1>VPS NVMe từ <strong>{starterPlan.price}</strong><span>/{starterPlan.period}</span></h1><p>Cấu hình minh bạch cho website, API, Minecraft, bot và dịch vụ chạy liên tục.</p><div className="vps-page-highlights"><span><Icon name="cpu" /> {business.infrastructure.cpuModel}</span><span><Icon name="server" /> Ổ NVMe</span><span><Icon name="globe" /> {business.infrastructure.portSpeed}</span><span><Icon name="shield" /> {business.infrastructure.ddosProtection}</span></div><a className="button button-primary" href="#bang-gia">Xem gói VPS <Icon name="arrow-right" /></a></div></section><PricingSection /><UseCases /><Advantages /><PolicySummaries /><Contact /></main><Footer /></>;
}
