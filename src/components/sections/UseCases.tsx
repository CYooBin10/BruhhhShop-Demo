import { Icon } from "@/components/ui/Icon";

const useCases = [
  ["globe", "Hosting website", "Website cá nhân, landing page hoặc cửa hàng online."],
  ["gamepad", "Server Minecraft", "Không gian riêng cho server game cùng bạn bè."],
  ["headphones", "Bot Discord", "Chạy bot ổn định, hoạt động xuyên suốt."],
  ["code", "Backend & API", "Môi trường gọn để đưa API vào vận hành."],
  ["terminal", "Môi trường lập trình", "Tự do thử nghiệm và xây dựng theo cách của bạn."],
  ["palette", "Dự án cá nhân", "Từ ý tưởng đầu tiên đến sản phẩm hoàn chỉnh."],
] as const;

export function UseCases() {
  return (
    <section className="section section-use-cases" id="nhu-cau">
      <div className="container">
        <div className="section-heading center-heading"><p className="section-label">Một VPS, nhiều cách dùng</p><h2>Phù hợp với nhu cầu <span>của bạn</span></h2><p>Không cần cấu hình phức tạp. Chỉ cần chọn đúng tài nguyên cho công việc.</p></div>
        <div className="use-case-grid">{useCases.map(([icon, title, description]) => <article className="use-case-card" key={title}><span className="use-case-icon"><Icon name={icon} /></span><h3>{title}</h3><p>{description}</p><span className="use-case-arrow"><Icon name="arrow-up-right" /></span></article>)}</div>
      </div>
    </section>
  );
}
