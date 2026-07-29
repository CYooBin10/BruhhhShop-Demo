import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Logo() {
  return (
    <Link className="logo" href="#trang-chu" aria-label="Bruhhh Cloud - Trang chủ">
      <Image alt="Bruhhh Cloud" className="logo-image" height={64} priority src="/assets/image/logo.png" width={64} />
      <span>Bruhhh <strong>Cloud</strong></span>
    </Link>
  );
}

export function Footer() {
  const legalLinks = [
    { label: "Điều khoản dịch vụ", href: siteConfig.legal.termsUrl },
    { label: "Chính sách bảo hành", href: siteConfig.legal.warrantyUrl },
    { label: "Chính sách quyền riêng tư", href: siteConfig.legal.privacyUrl },
  ];

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>Cloud VPS gọn gàng, rõ ràng và vừa đủ mạnh cho dự án của bạn.</p>
          <div className="footer-contact">
            <a href={siteConfig.contact.discordUrl} target="_blank" rel="noreferrer">Discord hỗ trợ</a>
            <a href={siteConfig.contact.facebookUrl} target="_blank" rel="noreferrer">Facebook</a>
            <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a>
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          </div>
        </div>
        <div>
          <h2 className="footer-title">Điều hướng</h2>
          <div className="footer-links">
            <a href="#bang-gia">Bảng giá</a>
            <a href="#uu-diem">Ưu điểm</a>
            <a href="#cam-ket">Cam kết</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>
        <div>
          <h2 className="footer-title">Thông tin</h2>
          <div className="footer-links">
            {legalLinks.map((link) => link.href ? <a key={link.label} href={link.href}>{link.label}</a> : <span key={link.label}>{link.label}</span>)}
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Bruhhh Cloud. All rights reserved.</span>
        <span className="footer-status"><i /> VPS giá rẻ, hỗ trợ rõ ràng</span>
      </div>
    </footer>
  );
}
