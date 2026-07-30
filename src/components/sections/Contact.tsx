import { getRuntimeConfig } from "@/config/runtime";
import { Icon } from "@/components/ui/Icon";

export async function Contact() {
  const { business, site } = await getRuntimeConfig();
  return <section className="section section-contact" id="lien-he"><div className="container contact-panel"><div><p className="section-label">Liên hệ</p><h2>Cần xác nhận cấu hình?</h2></div><div className="contact-list"><a href={site.contact.facebookUrl} target="_blank" rel="noreferrer">Facebook <Icon name="arrow-up-right" /></a><a href={site.contact.discordUrl} target="_blank" rel="noreferrer">Discord <Icon name="arrow-up-right" /></a><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a><span>Giờ hỗ trợ: {business.supportHours}</span></div><a className="button button-primary" href={site.contact.discordUrl} target="_blank" rel="noreferrer">Liên hệ tư vấn <Icon name="arrow-up-right" /></a></div></section>;
}
