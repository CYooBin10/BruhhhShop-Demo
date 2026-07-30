import type { Metadata } from "next";
import Link from "next/link";
import { PolicyShell } from "@/components/policy/PolicyShell";
import { getRuntimeConfig } from "@/config/runtime";

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getRuntimeConfig();
  return { title: `Chính sách & Điều khoản | ${site.name}`, description: `Các chính sách và điều khoản sử dụng dịch vụ ${site.name}.` };
}

export default async function PoliciesPage() {
  const config = await getRuntimeConfig();
  return <PolicyShell><main className="policy-page policy-index"><div className="container policy-shell"><Link className="policy-back" href="/#bang-gia">← Quay lại bảng giá</Link><div className="policy-heading"><p className="section-label">Minh bạch trước khi mua</p><h1>Chính sách &<br /><span>Điều khoản</span></h1><p>Đọc thông tin về sử dụng VPS, bảo hành, hoàn tiền, thanh toán và quyền riêng tư trước khi đặt hàng.</p><span className="policy-updated">Cập nhật lần cuối: {config.business.lastPolicyUpdate}</span></div><div className="policy-index-list">{config.policyLinks.map((policy) => <Link className="policy-index-item" href={`/chinh-sach/${policy.slug}`} key={policy.slug}><span><strong>{policy.label}</strong><small>Xem nội dung chi tiết</small></span><span>→</span></Link>)}</div></div></main></PolicyShell>;
}
