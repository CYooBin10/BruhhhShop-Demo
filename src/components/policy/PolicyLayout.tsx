import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { PolicyData, RuntimeConfig } from "@/types/site";

type PolicyLayoutProps = {
  config: RuntimeConfig;
  policy: PolicyData;
};

export function PolicyLayout({ config, policy }: PolicyLayoutProps) {
  return (
    <main className="policy-page">
      <div className="container policy-shell">
        <Link className="policy-back" href="/#bang-gia"><Icon name="arrow-right" /> Quay lại bảng giá</Link>
        <div className="policy-heading"><p className="section-label">Chính sách & Điều khoản</p><h1>{policy.title}</h1><p>{policy.description}</p><span className="policy-updated">Cập nhật lần cuối: {config.business.lastPolicyUpdate}</span></div>
        <div className="policy-layout">
          <PolicySidebar config={config} policy={policy} />
          <div className="policy-content">
            {policy.sections.map((section) => <PolicySection key={section.id} section={section} />)}
            <div className="policy-contact"><strong>Cần làm rõ điều khoản?</strong><span>Liên hệ {config.site.name} qua email hoặc kênh hỗ trợ chính thức.</span><a href={`mailto:${config.site.contact.email}`}>Liên hệ hỗ trợ <Icon name="arrow-up-right" /></a></div>
          </div>
        </div>
      </div>
    </main>
  );
}

function PolicySidebar({ config, policy }: { config: RuntimeConfig; policy: PolicyData }) {
  return (
    <aside className="policy-sidebar" aria-label="Mục lục chính sách">
      <span className="policy-menu-title">Chính sách & Điều khoản</span>
      <nav className="policy-page-links">{config.policyLinks.map((link) => <Link className={link.slug === policy.slug ? "is-current" : ""} href={`/chinh-sach/${link.slug}`} key={link.slug}>{link.label}</Link>)}</nav>
      <details className="policy-mobile-menu"><summary>Chuyển chính sách</summary><nav>{config.policyLinks.map((link) => <Link className={link.slug === policy.slug ? "is-current" : ""} href={`/chinh-sach/${link.slug}`} key={link.slug}>{link.label}</Link>)}</nav></details>
      <span className="policy-menu-title policy-toc-title">Mục lục trang</span>
      <nav className="policy-toc">{policy.sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}</nav>
      <div className="policy-sidebar-note"><span>Liên hệ hỗ trợ</span><a href={`mailto:${config.site.contact.email}`}>{config.site.contact.email}</a><small>Giờ hỗ trợ: {config.business.supportHours}</small></div>
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
