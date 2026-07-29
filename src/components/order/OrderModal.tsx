"use client";

import { useEffect, useId, useRef } from "react";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/Icon";
import type { Plan } from "@/types/site";

type OrderModalProps = {
  plan: Plan | null;
  onClose: () => void;
};

export function OrderModal({ plan, onClose }: OrderModalProps) {
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

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section aria-labelledby={titleId} aria-modal="true" className="order-modal contact-modal" role="dialog">
        <div className="modal-header"><div><p className="section-label">Đặt hàng qua kênh hỗ trợ</p><h2>Mua <span>{plan.name}</span></h2></div><button ref={closeButtonRef} className="modal-close" type="button" aria-label="Đóng cửa sổ liên hệ" onClick={onClose}><Icon name="close" /></button></div>
        <div className="selected-plan"><Icon name="server" /><div><span>Gói đã chọn</span><strong>{plan.name} · {plan.price}/{plan.period}</strong></div></div>
        <p className="contact-modal-copy">Website hiện chưa hỗ trợ mua trực tiếp. Vui lòng nhắn tin qua Discord hoặc Facebook để được xác nhận đơn hàng và hướng dẫn thanh toán.</p>
        <div className="contact-options">
          <a className="contact-option contact-option-discord" href={siteConfig.contact.discordUrl} target="_blank" rel="noreferrer"><span className="contact-option-icon"><Icon name="headphones" /></span><span><strong>Nhắn qua Discord</strong><small>Trao đổi nhanh với quản trị viên</small></span><Icon name="arrow-up-right" /></a>
          <a className="contact-option contact-option-facebook" href={siteConfig.contact.facebookUrl} target="_blank" rel="noreferrer"><span className="contact-option-icon"><Icon name="user" /></span><span><strong>Nhắn qua Facebook</strong><small>Gửi yêu cầu mua VPS</small></span><Icon name="arrow-up-right" /></a>
        </div>
        <div className="contact-details"><span>Hotline: {siteConfig.contact.phone}</span><a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></div>
      </section>
    </div>
  );
}
