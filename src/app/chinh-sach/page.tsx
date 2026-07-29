import type { Metadata } from "next";
import Link from "next/link";
import { PolicyShell } from "@/components/policy/PolicyShell";
import { businessConfig } from "@/config/business";
import { policyLinks } from "@/config/policies";

export const metadata: Metadata = {
  title: "Chính sách & Điều khoản | Bruhhh Cloud",
  description: "Các chính sách và điều khoản sử dụng dịch vụ Bruhhh Cloud.",
};

export default function PoliciesPage() {
  return <PolicyShell><main className="policy-page policy-index"><div className="container policy-shell"><Link className="policy-back" href="/#bang-gia">← Quay lại bảng giá</Link><div className="policy-heading"><p className="section-label">Minh bạch trước khi mua</p><h1>Chính sách &<br /><span>Điều khoản</span></h1><p>Đọc thông tin về sử dụng VPS, bảo hành, hoàn tiền, thanh toán và quyền riêng tư trước khi đặt hàng.</p><span className="policy-updated">Cập nhật lần cuối: {businessConfig.lastPolicyUpdate}</span></div><div className="policy-index-list">{policyLinks.map((policy) => <Link className="policy-index-item" href={`/chinh-sach/${policy.slug}`} key={policy.slug}><span><strong>{policy.label}</strong><small>Xem nội dung chi tiết</small></span><span>→</span></Link>)}</div></div></main></PolicyShell>;
}
