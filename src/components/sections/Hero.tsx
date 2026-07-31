import { HeroWebAds } from "@/components/HeroWebAds";
import { PurchaseLogs } from "@/components/PurchaseLogs";
import { getRuntimeConfig } from "@/config/runtime";
import { getWebAdImages } from "@/lib/web-ads";
import { Icon } from "@/components/ui/Icon";

export async function Hero() {
  const [{ business, site }, webAdImages] = await Promise.all([getRuntimeConfig(), getWebAdImages()]);
  const specifications = [
    ["cpu", business.infrastructure.cpuModel],
    ["server", "NVMe"],
    ["globe", `Cổng mạng tối đa ${business.infrastructure.portSpeed}`],
    ["shield", business.infrastructure.ddosProtection],
    ["headphones", "Hỗ trợ kỹ thuật"],
  ] as const;
  return (
    <section className="hero section" id="trang-chu">
      <div className="container hero-dashboard">
        <div className="hero-ads-panel"><HeroWebAds images={webAdImages} /></div>
        <PurchaseLogs />
        <div className="hero-intro-panel"><div><p className="eyebrow"><span className="eyebrow-dot" /> {site.productName}</p><h1>VPS rõ cấu hình,<br /><em>chạy ổn định mỗi ngày</em></h1></div><div className="hero-intro-content"><p>DiabloNode cung cấp VPS NVMe cho website, Minecraft, bot và dịch vụ chạy liên tục.</p><div className="hero-actions"><a className="button button-primary" href="#bang-gia">Xem VPS <Icon name="arrow-right" /></a><a className="button button-ghost" href="#lien-he">Liên hệ tư vấn <Icon name="arrow-up-right" /></a></div></div><div className="hero-specs">{specifications.map(([icon, label]) => <div key={label}><Icon name={icon} /><span>{label}</span></div>)}</div></div>
      </div>
    </section>
  );
}
