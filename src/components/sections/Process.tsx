import { Icon } from "@/components/ui/Icon";

const steps = [
  ["01", "Chọn cấu hình VPS", "Xem gói phù hợp với nhu cầu."],
  ["02", "Gửi yêu cầu đặt hàng", "Điền thông tin liên hệ cơ bản."],
  ["03", "Xác nhận và thanh toán", "Quản trị viên phản hồi chi tiết."],
  ["04", "Nhận thông tin VPS", "Bắt đầu triển khai dự án."],
] as const;

export function Process() {
  return (
    <section className="section section-process" id="quy-trinh">
      <div className="container"><div className="section-heading center-heading"><p className="section-label">Bắt đầu trong vài bước</p><h2>Quy trình <span>mua hàng</span></h2></div><div className="process-grid">{steps.map(([number, title, description], index) => <article className="process-step" key={number}><div className="step-top"><span>{number}</span>{index < steps.length - 1 ? <i /> : <Icon name="check" />}</div><h3>{title}</h3><p>{description}</p></article>)}</div></div>
    </section>
  );
}
