import Link from "next/link";
import { getRuntimeConfig } from "@/config/runtime";

export async function PolicySummaries() {
  const { site } = await getRuntimeConfig();
  const summaries = [
    ["Bảo hành", "Lỗi thuộc hạ tầng được kiểm tra, sửa chữa, đổi VPS hoặc cộng thời gian tùy tình trạng.", site.legal.warrantyUrl],
    ["Hoàn tiền", "Chỉ xem xét hoàn tiền khi lỗi thuộc nhà cung cấp và không thể khắc phục theo thời gian quy định.", site.legal.warrantyUrl],
    ["Sử dụng tài nguyên", "Không được spam, DDoS, phát tán mã độc hoặc sử dụng tài nguyên gây ảnh hưởng hệ thống.", site.legal.resourceUrl],
  ] as const;
  return <section className="section section-policy-summaries" id="chinh-sach"><div className="container"><div className="section-heading"><div><p className="section-label">Đọc trước khi mua</p><h2>Tóm tắt <span>chính sách</span></h2></div></div><div className="policy-summary-grid">{summaries.map(([title, text, href]) => <article key={title}><h3>{title}</h3><p>{text}</p><Link href={href}>Xem chi tiết</Link></article>)}</div></div></section>;
}
