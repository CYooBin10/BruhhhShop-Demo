import { Icon } from "@/components/ui/Icon";

const specifications = [
  ["cpu", "AMD EPYC 7571"],
  ["server", "NVMe"],
  ["globe", "Cổng mạng tối đa 1 Gbps"],
  ["headphones", "Hỗ trợ kỹ thuật"],
] as const;

export function Hero() {
  return (
    <section className="hero section" id="trang-chu">
      <div className="container hero-simple">
        <div className="eyebrow"><span className="eyebrow-dot" /> DiabloNode VPS</div>
        <h1>VPS hiệu năng ổn định,<br /><em>cấu hình minh bạch</em></h1>
        <p className="hero-description">VPS phù hợp chạy Minecraft, website, bot và ứng dụng 24/7. Cấu hình, giới hạn tài nguyên và chính sách bảo hành được công khai trước khi mua.</p>
        <div className="hero-actions"><a className="button button-primary" href="#bang-gia">Xem VPS <Icon name="arrow-right" /></a><a className="button button-ghost" href="#lien-he">Liên hệ tư vấn <Icon name="arrow-up-right" /></a></div>
        <div className="hero-specs">{specifications.map(([icon, label]) => <div key={label}><Icon name={icon} /><span>{label}</span></div>)}</div>
      </div>
    </section>
  );
}
