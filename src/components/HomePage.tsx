"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { LegitTicker } from "@/components/legits/LegitTicker";
import { useRuntimeConfig } from "@/components/RuntimeConfigProvider";
import { Icon } from "@/components/ui/Icon";
import type { Plan } from "@/types/site";
import { formatVnd, getDiscountPercent } from "@/config/pricing";

const OrderModal = dynamic(() => import("@/components/order/OrderModal").then((module) => module.OrderModal), { ssr: false });

const goals = ["Minecraft Server", "Website & API", "Bot Discord", "Database", "Development"];
const scales = ["Dự án nhỏ", "Đang tăng trưởng", "Dự án lớn"];
const cycles = [
  { id: "month", label: "Theo tháng" },
  { id: "quarter", label: "Theo quý" },
  { id: "year", label: "Theo năm" },
] as const;
type BillingCycle = (typeof cycles)[number]["id"];

const solutions = [
  ["01", "Minecraft Server", "CPU hiệu năng tốt, NVMe và hướng dẫn cho Paper, Purpur, Spigot, Fabric, Forge.", "gamepad"],
  ["02", "Website & API", "Môi trường triển khai cho Nginx, Docker, Node.js, PHP, database và SSL.", "globe"],
  ["03", "Bot Discord", "Chạy liên tục với Python hoặc Node.js, PM2, systemd và theo dõi tài nguyên.", "headphones"],
  ["04", "Developer", "SSH, Git, Docker, CI/CD và quyền root cho môi trường thử nghiệm linh hoạt.", "terminal"],
] as const;

const policies = [
  ["Điều khoản dịch vụ", "Quyền và trách nhiệm được xác định trước khi sử dụng dịch vụ.", "/chinh-sach/dieu-khoan-dich-vu"],
  ["Bảo hành & hoàn tiền", "Phạm vi lỗi hạ tầng, thời gian kiểm tra và điều kiện hoàn tiền.", "/chinh-sach/bao-hanh-hoan-tien"],
  ["Sử dụng hợp lý", "Giới hạn tài nguyên và nội dung gây ảnh hưởng đến hệ thống.", "/chinh-sach/su-dung-tai-nguyen"],
  ["Thanh toán & bàn giao", "Chu kỳ gia hạn, thời gian kích hoạt và cách nhận thông tin VPS.", "/chinh-sach/thanh-toan-ban-giao"],
] as const;

export function HomePage() {
  const { site, business, plans } = useRuntimeConfig();
  const [cycle, setCycle] = useState<BillingCycle>("month");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [goal, setGoal] = useState(goals[0]);
  const [scale, setScale] = useState(scales[0]);
  const availablePlans = plans.filter((plan) => plan.status === "Còn hàng");
  const recommendationPlans = availablePlans.length > 0 ? availablePlans : plans;
  const recommendation = useMemo(() => {
    if (!recommendationPlans.length) return null;
    const offset = scale === "Dự án lớn" ? 2 : scale === "Đang tăng trưởng" ? 1 : 0;
    return recommendationPlans[Math.min(offset, recommendationPlans.length - 1)];
  }, [scale, recommendationPlans]);

  return (
    <>
      <a className="skip-link" href="#main-content">Chuyển đến nội dung</a>
      <SiteNavbar />
      <main id="main-content">
        <section className="dn-hero" id="trang-chu">
          <div className="dn-container dn-hero-grid">
            <div className="dn-hero-copy">
              <p className="dn-eyebrow"><span /> DIABLONODE / CLOUD INFRASTRUCTURE</p>
              <h1>Hạ tầng VPS cho những dự án cần <em>vận hành nghiêm túc.</em></h1>
              <p className="dn-hero-lead">VPS hiệu năng cao cho server Minecraft, website, API, bot Discord và ứng dụng backend. Cấu hình công khai. Chính sách rõ ràng. Hỗ trợ theo quy trình.</p>
              <div className="dn-hero-actions"><Link className="dn-button dn-button-primary" href="/vps#bang-gia">Xem gói VPS <Icon name="arrow-right" /></Link><Link className="dn-button dn-button-secondary" href="#tu-van">Tư vấn cấu hình</Link></div>
              <Link className="dn-status-link" href="#trang-thai"><span /> Hệ thống đang được theo dõi công khai</Link>
            </div>
            <div className="dn-operations-card" aria-label="Tổng quan vận hành DiabloNode">
              <div className="dn-operations-header"><div><small>OPERATIONS BRIEF</small><h2>VPS-2-4 / Singapore</h2></div><span className="dn-operational"><i /> Operational</span></div>
              <div className="dn-operations-rule" />
              <div className="dn-operations-meta"><span>INSTANCE</span><strong>dn-vps-2048</strong><span>CREATED</span><strong>{"{{provisioned_at}}"}</strong></div>
              <div className="dn-operations-list"><OperationRow label="Compute" value="{{cpu_model}}" status="Available" /><OperationRow label="Memory" value="4 GB RAM / 2 vCPU" status="Allocated" /><OperationRow label="Storage" value="80 GB NVMe" status="Online" /><OperationRow label="Network" value="{{network_port}}" status="Monitored" /></div>
              <div className="dn-operations-footer"><span><Icon name="shield" /> Root access</span><span><Icon name="clock" /> Monitoring enabled</span></div>
            </div>
          </div>
          <div className="dn-container dn-hero-foot"><span>Hạ tầng mạnh mẽ</span><span>Chính sách minh bạch</span><span>Hỗ trợ đáng tin cậy</span><span>Không cam kết vượt dữ liệu</span></div>
        </section>

        <section className="dn-trust-strip" aria-label="Thông tin vận hành">
          <div className="dn-container dn-trust-grid"><div className="dn-trust-status"><span className="dn-green-dot" /><div><small>System status</small><strong>{"{{system_status}}"}</strong></div></div><TrustMetric label="Dịch vụ đang hoạt động" value="{{service_uptime}}" /><TrustMetric label="Thời gian phản hồi" value="{{average_response_time}}" /><TrustMetric label="Khu vực máy chủ" value="{{server_locations}}" /><Link className="dn-trust-link" href="#trang-thai">Xem trạng thái <Icon name="arrow-up-right" /></Link></div>
        </section>

        <section className="dn-legit-section" aria-labelledby="legit-heading"><div className="dn-container"><div className="dn-section-head"><div><p className="dn-section-kicker">CUSTOMER SIGNAL</p><h2 id="legit-heading">Phản hồi <span>khách hàng.</span></h2></div><p>Nội dung mới nhất từ kênh legit công khai. Không tự tạo đánh giá hoặc số liệu xác thực.</p></div><LegitTicker /></div></section>

        <section className="dn-section dn-pricing-section" id="bang-gia"><div className="dn-container"><div className="dn-section-head"><div><p className="dn-section-kicker">01 / VPS PLANS</p><h2>Cấu hình rõ ràng, <span>không phóng đại.</span></h2></div><p>Chọn gói theo tài nguyên cần dùng. Giá và điều kiện gia hạn được xác nhận trước thanh toán.</p></div><div className="dn-billing-toggle" role="group" aria-label="Chu kỳ thanh toán">{cycles.map((item) => <button className={cycle === item.id ? "is-active" : ""} key={item.id} type="button" onClick={() => setCycle(item.id)}>{item.label}</button>)}</div><div className="dn-pricing-grid">{plans.map((plan) => <PlanCard key={plan.id} plan={plan} cycle={cycle} onOrder={setSelectedPlan} />)}</div><div className="dn-disclosure"><Icon name="shield" /><span>VCPU có thể là tài nguyên dùng chung. Tốc độ mạng thực tế, backup và điều kiện hoàn tiền phụ thuộc chính sách từng dịch vụ.</span><Link href="/chinh-sach">Đọc chính sách</Link></div></div></section>

        <section className="dn-section dn-config-section" id="tu-van"><div className="dn-container dn-config-grid"><div className="dn-config-copy"><p className="dn-section-kicker">02 / CONFIGURATION ADVISOR</p><h2>Chọn theo cách bạn <span>vận hành.</span></h2><p>Đề xuất chỉ mang tính tham khảo. Hiệu năng còn phụ thuộc ứng dụng, plugin, mod, phiên bản và cách tối ưu của bạn.</p><Link className="dn-text-link" href="/vps#bang-gia">Xem toàn bộ gói VPS <Icon name="arrow-right" /></Link></div><div className="dn-config-card"><div className="dn-form-row"><label>Mục đích<select value={goal} onChange={(event) => setGoal(event.target.value)}>{goals.map((item) => <option key={item}>{item}</option>)}</select></label><label>Quy mô<select value={scale} onChange={(event) => setScale(event.target.value)}>{scales.map((item) => <option key={item}>{item}</option>)}</select></label></div><div className="dn-config-result"><div><small>RECOMMENDED STARTING POINT</small><h3>{recommendation?.name ?? "{{recommended_plan}}"}</h3><p>{recommendation ? `${recommendation.cpu} · ${recommendation.ram} · ${recommendation.storage}` : "Cấu hình sẽ hiển thị khi có dữ liệu."}</p></div><Link className="dn-button dn-button-primary" href="/vps#bang-gia">Xem gói <Icon name="arrow-up-right" /></Link></div><p className="dn-config-note"><Icon name="circle-check" /> Có thể nâng cấp khi nhu cầu tài nguyên tăng.</p></div></div></section>

        <section className="dn-section dn-solutions-section" id="giai-phap"><div className="dn-container"><div className="dn-section-head"><div><p className="dn-section-kicker">03 / SOLUTIONS</p><h2>Một nền tảng cho <span>nhiều bài toán.</span></h2></div><p>Không định vị chỉ là VPS giá rẻ. Chọn môi trường theo cách bạn xây dựng và vận hành.</p></div><div className="dn-solutions-list">{solutions.map(([number, title, text, icon]) => <article className="dn-solution-row" key={title}><span className="dn-solution-number">{number}</span><span className="dn-solution-icon"><Icon name={icon} /></span><div><h3>{title}</h3><p>{text}</p></div><Link href="#tu-van" aria-label={`Xem gợi ý cho ${title}`}><Icon name="arrow-up-right" /></Link></article>)}</div></div></section>

        <section className="dn-section dn-infra-section" id="ha-tang"><div className="dn-container dn-infra-grid"><div className="dn-infra-copy"><p className="dn-section-kicker">04 / INFRASTRUCTURE</p><h2>Thông tin có thể <span>kiểm chứng.</span></h2><p>Chúng tôi đánh dấu rõ dữ liệu chưa được cập nhật thay vì tự điền thông số. Phạm vi chống DDoS, backup và datacenter cần được xác nhận theo cấu hình thực tế.</p><div className="dn-infra-callout"><Icon name="shield" /><div><strong>Không dùng tuyên bố tuyệt đối</strong><span>Không “nhanh nhất”, không “zero downtime”, không cam kết vượt ngoài dữ liệu.</span></div></div></div><div className="dn-infra-list"><InfraRow label="CPU" value={business.infrastructure.cpuModel} detail="Model CPU theo cụm máy hiện hành" /><InfraRow label="Storage" value="NVMe" detail="Hiệu năng phụ thuộc tải hệ thống" /><InfraRow label="Network" value={business.infrastructure.portSpeed} detail="Cổng mạng công bố theo hạ tầng" /><InfraRow label="Location" value="{{server_locations}}" detail="Khu vực đặt máy chủ" /><InfraRow label="Backup" value="{{backup_policy}}" detail="Phạm vi backup cần xác nhận trước mua" /></div></div></section>

        <section className="dn-section dn-process-section" id="quy-trinh"><div className="dn-container"><div className="dn-section-head"><div><p className="dn-section-kicker">05 / PROVISIONING</p><h2>Quy trình mua <span>không vòng vo.</span></h2></div><p>Không yêu cầu nhắn tin thủ công cho những bước hệ thống có thể tự động hóa.</p></div><div className="dn-process-grid">{[["01", "Chọn cấu hình", "So sánh tài nguyên và chính sách liên quan."], ["02", "Tạo tài khoản", "Dùng email chính xác để nhận hóa đơn và bàn giao."], ["03", "Thanh toán", `Phương thức hỗ trợ: ${business.paymentMethods.join(", ")}.`], ["04", "Nhận thông tin VPS", `Thời gian dự kiến: ${business.deliveryTime}.`]].map(([number, title, text]) => <div className="dn-process-step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>

        <section className="dn-section dn-policy-section" id="chinh-sach"><div className="dn-container"><div className="dn-section-head"><div><p className="dn-section-kicker">06 / POLICIES</p><h2>Điều kiện dịch vụ <span>nói trước.</span></h2></div><Link className="dn-text-link" href="/chinh-sach">Mở trung tâm chính sách <Icon name="arrow-up-right" /></Link></div><div className="dn-policy-grid">{policies.map(([title, text, href], index) => <Link className="dn-policy-card" href={href} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p><Icon name="arrow-up-right" /></Link>)}</div></div></section>

        <section className="dn-section dn-system-section" id="trang-thai"><div className="dn-container dn-system-grid"><div><p className="dn-section-kicker">07 / SYSTEM STATUS</p><h2>Vận hành công khai, <span>phản hồi có ngữ cảnh.</span></h2><p>Kiểm tra từng thành phần trước khi gửi yêu cầu. Dữ liệu thật sẽ được kết nối vào các trường trạng thái bên dưới.</p><Link className="dn-text-link" href="#lien-he">Cần hỗ trợ? Gửi yêu cầu <Icon name="arrow-right" /></Link></div><div className="dn-status-board"><div className="dn-status-overall"><span className="dn-green-dot" /><div><small>Overall status</small><strong>{"{{system_status}}"}</strong></div><span className="dn-status-time">{"{{last_checked}}"}</span></div>{[["Node VPS", "{{node_status}}"], ["Mạng lưới", "{{network_status}}"], ["Thanh toán", "{{payment_status}}"], ["Dashboard", "{{dashboard_status}}"]].map(([label, status]) => <div className="dn-status-row" key={label}><span>{label}</span><strong><i /> {status}</strong></div>)}</div></div></section>

        <section className="dn-section dn-support-section" id="lien-he"><div className="dn-container dn-support-card"><div><p className="dn-section-kicker">08 / SUPPORT</p><h2>Hỗ trợ theo <span>quy trình.</span></h2><p>Gửi yêu cầu qua ticket, Discord hoặc email để đội ngũ có đủ thông tin xử lý. Thời gian phản hồi thực tế được cập nhật theo dữ liệu vận hành.</p></div><div className="dn-support-links"><a href={site.contact.discordUrl} target="_blank" rel="noreferrer"><Icon name="headphones" /><span><strong>Discord</strong><small>Trao đổi nhanh với đội ngũ</small></span><Icon name="arrow-up-right" /></a><a href={`mailto:${site.contact.email}`}><Icon name="mail" /><span><strong>Email hỗ trợ</strong><small>{site.contact.email}</small></span><Icon name="arrow-up-right" /></a><Link href="/lien-he"><Icon name="workflow" /><span><strong>Ticket hỗ trợ</strong><small>Gửi yêu cầu có ngữ cảnh</small></span><Icon name="arrow-up-right" /></Link></div></div></section>
      </main>
      <Footer />
      {selectedPlan ? <OrderModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} /> : null}
    </>
  );
}

function OperationRow({ label, value, status }: { label: string; value: string; status: string }) {
  return <div className="dn-operation-row"><span>{label}</span><div><strong>{value}</strong><small><i /> {status}</small></div></div>;
}

function InfraRow({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <div className="dn-infra-row"><span className="dn-infra-label">{label}</span><div><strong>{value}</strong><p>{detail}</p></div><Icon name="arrow-up-right" /></div>;
}

function TrustMetric({ label, value }: { label: string; value: string }) {
  return <div className="dn-trust-metric"><small>{label}</small><strong>{value}</strong></div>;
}

function PlanCard({ plan, cycle, onOrder }: { plan: Plan; cycle: BillingCycle; onOrder: (plan: Plan) => void }) {
  const { promotions, business } = useRuntimeConfig();
  const promotion = promotions[plan.id];
  const originalPrice = promotion?.originalPrice ?? 0;
  const salePrice = promotion?.salePrice ?? 0;
  const hasPromotion = originalPrice > salePrice && salePrice > 0;
  const price = hasPromotion ? formatVnd(salePrice) : plan.price;
  const discount = hasPromotion ? getDiscountPercent(originalPrice, salePrice) : 0;
  const outOfStock = plan.status === "Hết hàng";
  return <article className={`dn-plan-card ${plan.popular ? "is-featured" : ""}`}><div className="dn-plan-top"><span>{plan.popular ? "Được lựa chọn nhiều" : "Cloud VPS"}</span><i className={outOfStock ? "is-out" : ""}><b /> {plan.status}</i></div><h3>{plan.name.replace("DiabloNode ", "")}</h3><p className="dn-plan-subtitle">{cycle === "month" ? "Thanh toán theo tháng" : cycle === "quarter" ? "Chu kỳ quý · xác nhận trước thanh toán" : "Chu kỳ năm · xác nhận trước thanh toán"}</p><div className="dn-plan-price"><strong>{price}</strong><span>/{plan.period}</span></div>{hasPromotion ? <p className="dn-plan-promotion"><s>{formatVnd(originalPrice)}</s><b>Giảm {discount}%</b></p> : null}<div className="dn-plan-specs"><span><b>{plan.cpu}</b> CPU</span><span><b>{plan.ram}</b> RAM</span><span><b>{plan.storage}</b> NVMe</span></div><ul><li><span>Model CPU</span><b>{business.infrastructure.cpuModel}</b></li><li><span>Cổng mạng</span><b>{plan.portSpeed}</b></li><li><span>Anti-DDoS</span><b>{business.infrastructure.ddosProtection}</b></li></ul><button className={`dn-button ${plan.popular ? "dn-button-primary" : "dn-button-secondary"}`} disabled={outOfStock} type="button" onClick={() => onOrder(plan)}>{outOfStock ? "Tạm hết hàng" : "Chọn gói này"} <Icon name="arrow-up-right" /></button></article>;
}
