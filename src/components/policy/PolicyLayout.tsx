import Link from "next/link";
import { businessConfig } from "@/config/business";
import { policyLinks } from "@/config/policies";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/Icon";
import type { PolicyData } from "@/types/site";

type PolicyLayoutProps = {
  policy: PolicyData;
};

export function PolicyLayout({ policy }: PolicyLayoutProps) {
  return (
    <main className="policy-page">
      <div className="container policy-shell">
        <Link className="policy-back" href="/#bang-gia"><Icon name="arrow-right" /> Quay lại bảng giá</Link>
        <div className="policy-heading"><p className="section-label">Chính sách & Điều khoản</p><h1>{policy.title}</h1><p>{policy.description}</p><span className="policy-updated">Cập nhật lần cuối: {businessConfig.lastPolicyUpdate}</span></div>
        <div className="policy-layout">
          <PolicySidebar policy={policy} />
          <div className="policy-content">
            {policy.sections.map((section) => <PolicySection key={section.id} section={section} />)}
            <div className="policy-contact"><strong>Cần làm rõ điều khoản?</strong><span>Liên hệ DiabloNode qua email hoặc kênh hỗ trợ chính thức.</span><a href={`mailto:${siteConfig.contact.email}`}>Liên hệ hỗ trợ <Icon name="arrow-up-right" /></a></div>
          </div>
        </div>
      </div>
    </main>
  );
}

function PolicySidebar({ policy }: { policy: PolicyData }) {
  return (
    <aside className="policy-sidebar" aria-label="Mục lục chính sách">
      <span className="policy-menu-title">Chính sách & Điều khoản</span>
      <nav className="policy-page-links">{policyLinks.map((link) => <Link className={link.slug === policy.slug ? "is-current" : ""} href={`/chinh-sach/${link.slug}`} key={link.slug}>{link.label}</Link>)}</nav>
      <details className="policy-mobile-menu"><summary>Chuyển chính sách</summary><nav>{policyLinks.map((link) => <Link className={link.slug === policy.slug ? "is-current" : ""} href={`/chinh-sach/${link.slug}`} key={link.slug}>{link.label}</Link>)}</nav></details>
      <span className="policy-menu-title policy-toc-title">Mục lục trang</span>
      <nav className="policy-toc">{policy.sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}</nav>
      <div className="policy-sidebar-note"><span>Liên hệ hỗ trợ</span><a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a><small>Giờ hỗ trợ: {businessConfig.supportHours}</small></div>
    </aside>
  );
}

function PolicySection({ section }: { section: PolicyData["sections"][number] }) {
  return (
    <section className="policy-section" id={section.id}>
      <h2>{section.title}</h2>
      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.items ? <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
    </section>
  );
}
