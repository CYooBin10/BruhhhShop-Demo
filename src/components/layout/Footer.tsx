import Image from "next/image";
import Link from "next/link";
import { businessConfig } from "@/config/business";
import { siteConfig } from "@/config/site";

export function Logo() {
  return (
    <Link className="logo" href="/#trang-chu" aria-label="Bruhhh Cloud - Trang chủ">
      <Image alt="Bruhhh Cloud" className="logo-image" height={64} priority src="/assets/image/logo.png" width={64} />
      <span>Bruhhh <strong>Cloud</strong></span>
    </Link>
  );
}

export function Footer() {
  const legalLinks = [
    { label: "Điều khoản dịch vụ", href: siteConfig.legal.termsUrl },
    { label: "Bảo hành và hoàn tiền", href: siteConfig.legal.warrantyUrl },
    { label: "Quyền riêng tư", href: siteConfig.legal.privacyUrl },
    { label: "Thanh toán và bàn giao VPS", href: siteConfig.legal.paymentUrl },
    { label: "Sử dụng tài nguyên", href: siteConfig.legal.resourceUrl },
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
            <span>Giờ hỗ trợ: {businessConfig.supportHours}</span>
          </div>
        </div>
        <div>
          <h2 className="footer-title">Điều hướng</h2>
          <div className="footer-links">
            <Link href="/#bang-gia">Bảng giá</Link>
            <Link href="/#uu-diem">Ưu điểm</Link>
            <Link href="/#cam-ket">Cam kết</Link>
            <Link href="/#faq">FAQ</Link>
          </div>
        </div>
        <div>
          <h2 className="footer-title">Thông tin</h2>
          <div className="footer-links">
            {legalLinks.map((link) => <Link key={link.label} href={link.href}>{link.label}</Link>)}
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
