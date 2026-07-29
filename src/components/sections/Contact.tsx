import { businessConfig } from "@/config/business";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/Icon";

export function Contact() {
  return <section className="section section-contact" id="lien-he"><div className="container contact-panel"><div><p className="section-label">Liên hệ</p><h2>Cần xác nhận cấu hình?</h2></div><div className="contact-list"><a href={siteConfig.contact.facebookUrl} target="_blank" rel="noreferrer">Facebook <Icon name="arrow-up-right" /></a><a href={siteConfig.contact.discordUrl} target="_blank" rel="noreferrer">Discord <Icon name="arrow-up-right" /></a><a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a><span>Giờ hỗ trợ: {businessConfig.supportHours}</span></div><a className="button button-primary" href={siteConfig.contact.discordUrl} target="_blank" rel="noreferrer">Liên hệ tư vấn <Icon name="arrow-up-right" /></a></div></section>;
}
