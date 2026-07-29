"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { formatVnd, getPlanPromotion } from "@/config/pricing";
import { policyUrls } from "@/config/policies";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/Icon";
import type { Plan } from "@/types/site";

type OrderModalProps = {
  plan: Plan | null;
  onClose: () => void;
};

export function OrderModal({ plan, onClose }: OrderModalProps) {
  const [agreed, setAgreed] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!plan) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = previousOverflow; };
  }, [onClose, plan]);

  if (!plan) return null;

  const promotion = getPlanPromotion(plan.id);
  const originalPrice = promotion?.originalPrice ?? 0;
  const salePrice = promotion?.salePrice ?? 0;
  const price = originalPrice > salePrice && salePrice > 0 ? formatVnd(salePrice) : plan.price;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section aria-labelledby={titleId} aria-modal="true" className="order-modal contact-modal" role="dialog">
        <div className="modal-header"><div><p className="section-label">Đặt hàng qua kênh hỗ trợ</p><h2>Mua <span>{plan.name}</span></h2></div><button ref={closeButtonRef} className="modal-close" type="button" aria-label="Đóng cửa sổ liên hệ" onClick={onClose}><Icon name="close" /></button></div>
        <div className="selected-plan"><Icon name="server" /><div><span>Gói đã chọn</span><strong>{plan.name} · {price}/{plan.period}</strong></div></div>
        <p className="contact-modal-copy">Website hiện chưa hỗ trợ mua trực tiếp. Vui lòng nhắn tin qua Discord hoặc Facebook để được xác nhận đơn hàng và hướng dẫn thanh toán.</p>
        <label className="order-agreement"><input checked={agreed} type="checkbox" onChange={(event) => setAgreed(event.target.checked)} /><span>Tôi đã đọc và đồng ý với <Link href={policyUrls.terms} target="_blank">Điều khoản dịch vụ</Link>, <Link href={policyUrls.refund} target="_blank">Chính sách bảo hành và hoàn tiền</Link>.</span></label>
        <div className="contact-options">
          <ContactOption agreed={agreed} description="Trao đổi nhanh với quản trị viên" href={siteConfig.contact.discordUrl} icon="headphones" label="Nhắn qua Discord" />
          <ContactOption agreed={agreed} description="Gửi yêu cầu mua VPS" href={siteConfig.contact.facebookUrl} icon="user" label="Nhắn qua Facebook" />
        </div>
        {!agreed ? <p className="agreement-hint">Chọn xác nhận để mở kênh đặt hàng.</p> : null}
        <div className="contact-details"><span>Hotline: {siteConfig.contact.phone}</span><a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></div>
      </section>
    </div>
  );
}

type ContactOptionProps = {
  agreed: boolean;
  description: string;
  href: string;
  icon: "headphones" | "user";
  label: string;
};

function ContactOption({ agreed, description, href, icon, label }: ContactOptionProps) {
  const content = <><span className="contact-option-icon"><Icon name={icon} /></span><span><strong>{label}</strong><small>{description}</small></span><Icon name="arrow-up-right" /></>;
  return agreed ? <a className="contact-option" href={href} target="_blank" rel="noreferrer">{content}</a> : <button className="contact-option" disabled type="button">{content}</button>;
}
