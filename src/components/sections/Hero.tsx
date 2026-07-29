import { Icon } from "@/components/ui/Icon";

const metrics = [
  { label: "Hiệu năng ổn định", icon: "activity" },
  { label: "Hỗ trợ nhanh chóng", icon: "headphones" },
  { label: "Có bảo hành", icon: "shield" },
  { label: "Kích hoạt nhanh", icon: "rocket" },
] as const;

export function Hero() {
  return (
    <section className="hero section" id="trang-chu">
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> VPS giá rẻ</div>
          <p className="hero-kicker">Bruh VPS <span>/</span> cloud hosting cho người thực chiến</p>
          <h1>Cloud VPS mạnh mẽ với mức giá <em>cực Bruhhh</em></h1>
          <p className="hero-description">VPS hiệu năng ổn định, giá hợp lý, phù hợp để chạy website, máy chủ game, bot, API và các dự án cá nhân.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#bang-gia">Xem bảng giá <Icon name="arrow-right" /></a>
            <a className="button button-ghost" href="#lien-he">Liên hệ hỗ trợ <Icon name="arrow-up-right" /></a>
          </div>
          <div className="hero-meta">
            <span><i className="status-dot" /> Sẵn sàng triển khai</span>
            <span className="meta-divider" />
            <span>Không phí ẩn</span>
          </div>
        </div>
        <ServerPreview />
      </div>
      <div className="container hero-metrics">
        {metrics.map((metric) => (
          <div className="hero-metric" key={metric.label}>
            <span className="metric-icon"><Icon name={metric.icon === "activity" ? "workflow" : metric.icon} /></span>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServerPreview() {
  return (
    <div className="server-preview" aria-label="Minh họa bảng điều khiển server đang online" role="img">
      <div className="preview-orbit orbit-one" />
      <div className="preview-orbit orbit-two" />
      <div className="preview-card preview-card-main">
        <div className="preview-topbar"><span><i /><i /><i /></span><span className="preview-topbar-label">bruh-vps / overview</span><span className="preview-topbar-chip">LIVE</span></div>
        <div className="preview-heading"><div><small>Máy chủ đang hoạt động</small><strong>Bruh VPS 8-16</strong></div><span className="online-badge"><i /> Online</span></div>
        <div className="preview-chart">
          <div className="chart-labels"><span>100%</span><span>50%</span><span>0%</span></div>
          <svg viewBox="0 0 420 130" preserveAspectRatio="none" aria-hidden="true">
            <path className="chart-grid-line" d="M0 15H420M0 65H420M0 115H420" />
            <path className="chart-area" d="M0 100 C34 94 34 58 68 66 S105 95 139 80 S173 35 206 50 S244 85 275 66 S310 38 344 48 S385 70 420 26 V130 H0Z" />
            <path className="chart-line" d="M0 100 C34 94 34 58 68 66 S105 95 139 80 S173 35 206 50 S244 85 275 66 S310 38 344 48 S385 70 420 26" />
          </svg>
        </div>
        <div className="preview-stats"><div><span>CPU</span><strong>34%</strong></div><div><span>RAM</span><strong>52%</strong></div><div><span>Network</span><strong>1.2 GB</strong></div></div>
      </div>
      <div className="preview-card preview-card-side"><span className="side-icon"><Icon name="server" /></span><small>Trạng thái hệ thống</small><strong>Ổn định</strong><div className="side-bars"><i /><i /><i /><i /><i /><i /><i /><i /></div></div>
      <div className="preview-card preview-card-float"><span className="float-check"><Icon name="check" /></span><div><small>Deploy ready</small><strong>Triển khai nhanh</strong></div></div>
    </div>
  );
}
