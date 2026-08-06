"use client";

import type { User } from "@supabase/supabase-js";
import { useEffect, useId, useState } from "react";
import { useRuntimeConfig } from "@/components/RuntimeConfigProvider";
import { supabase } from "@/lib/supabase";
import { Icon } from "@/components/ui/Icon";

const REQUEST_TYPES = ["Mua dịch vụ mới", "Sửa đổi cấu hình", "Nâng cấp – gia hạn", "Hỗ trợ kỹ thuật – sửa chữa", "Bảo hành – hoàn tiền", "Khiếu nại", "Khác"];
const PURPOSES = ["Server Minecraft", "Website / API", "Bot Discord", "Ứng dụng chạy 24/7", "Lưu trữ dữ liệu", "Khác"];
const DURATIONS = ["Dưới 1 tháng", "1 – 3 tháng", "Trên 3 tháng", "Chưa rõ"];

export function ContactPage() {
  const { plans, site } = useRuntimeConfig();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState({ name: "", requestType: "", purpose: "", plan: "Chưa xác định", duration: "", message: "" });
  const nameId = useId();
  const messageId = useId();
  const zaloPhoneNumber = site.contact.phone.replace(/\D/g, "").replace(/^0/, "84");

  useEffect(() => {
    let active = true;
    const loadUser = () => {
      if (!supabase) return;
      void supabase.auth.getUser().then(({ data }) => { if (active) setUser(data.user); });
    };
    loadUser();
    const subscription = supabase?.auth.onAuthStateChange((_event, session) => { if (active) setUser(session?.user ?? null); }).data.subscription;
    window.addEventListener("bruhhh-auth-changed", loadUser);
    return () => { active = false; subscription?.unsubscribe(); window.removeEventListener("bruhhh-auth-changed", loadUser); };
  }, []);

  const setField = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user || !supabase) return;
    setStatus("sending");
    setError("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.");
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` }, body: JSON.stringify(form) });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || "Gửi thất bại.");
      setStatus("success");
    } catch (cause) {
      setStatus("error");
      setError(cause instanceof Error ? cause.message : "Gửi thất bại.");
    }
  };

  const openAuth = () => window.dispatchEvent(new Event("bruhhh-open-auth"));

  return (
    <section className="section section-contact-page">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="section-label">Liên hệ & yêu cầu</p>
            <h2>Gửi yêu cầu <span>rõ ràng</span></h2>
          </div>
        </div>
        <div className="contact-page-grid">
          {user ? <form className="contact-form" onSubmit={submit}>
            <div className="contact-form-field contact-form-full"><label htmlFor={nameId}>Họ tên <span className="required-mark" title="Yêu cầu bắt buộc nhập">!</span></label><input id={nameId} maxLength={100} required placeholder="Tên của bạn" type="text" value={form.name} onChange={setField("name")} /></div>
            <div className="contact-form-field contact-form-full"><label htmlFor="contact-request-type">Loại yêu cầu <span className="required-mark" title="Yêu cầu bắt buộc nhập">!</span></label><select id="contact-request-type" required value={form.requestType} onChange={setField("requestType")}><option disabled value="">Chọn loại yêu cầu…</option>{REQUEST_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}</select></div>
            <div className="contact-form-field"><label htmlFor="contact-purpose">Mục đích sử dụng <span className="required-mark" title="Yêu cầu bắt buộc nhập">!</span></label><select id="contact-purpose" required value={form.purpose} onChange={setField("purpose")}><option disabled value="">Chọn mục đích…</option>{PURPOSES.map((purpose) => <option key={purpose} value={purpose}>{purpose}</option>)}</select></div>
            <div className="contact-form-field"><label htmlFor="contact-plan">Cấu hình mong muốn</label><select id="contact-plan" value={form.plan} onChange={setField("plan")}><option value="Chưa xác định">Chưa xác định</option>{plans.map((plan) => <option key={plan.id} value={plan.name.replace("DiabloNode ", "")}>{plan.name.replace("DiabloNode ", "")}</option>)}</select></div>
            <div className="contact-form-field"><label htmlFor="contact-duration">Thời gian sử dụng <span className="required-mark" title="Yêu cầu bắt buộc nhập">!</span></label><select id="contact-duration" required value={form.duration} onChange={setField("duration")}><option disabled value="">Chọn thời gian…</option>{DURATIONS.map((duration) => <option key={duration} value={duration}>{duration}</option>)}</select></div>
            <div className="contact-form-field contact-form-full"><label htmlFor={messageId}>Mô tả chi tiết yêu cầu</label><textarea id={messageId} maxLength={2000} placeholder="Bạn cần mua gói nào? Muốn nâng cấp RAM/disk? VPS gặp lỗi gì, lỗi từ khi nào?… (không bắt buộc)" rows={6} value={form.message} onChange={setField("message")} /></div>
            <div className="contact-form-field contact-form-full contact-form-actions"><button className="button button-primary" disabled={status === "sending"} type="submit">{status === "sending" ? "Đang gửi…" : "Gửi yêu cầu"} <Icon name="arrow-up-right" /></button>{status === "success" ? <p className="contact-form-success"><Icon name="circle-check" /> Đã gửi thành công. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.</p> : null}{status === "error" ? <p className="contact-form-error"><Icon name="close" /> {error}</p> : null}</div>
          </form> : <div className="contact-login-gate"><span className="contact-gate-icon"><Icon name="user" /></span><h3>Đăng nhập để gửi yêu cầu</h3><p>Form yêu cầu chỉ dành cho khách hàng đã đăng nhập, giúp chúng tôi xác định đúng người gửi và phản hồi nhanh hơn.</p><button className="button button-primary" type="button" onClick={openAuth}>Đăng nhập / Đăng ký <Icon name="arrow-up-right" /></button><p className="contact-gate-note">Mỗi tài khoản được gửi tối đa 5 yêu cầu trong 1 giờ.</p></div>}
          <aside className="contact-page-side">
            <p className="section-label">Kênh liên hệ trực tiếp</p>
            <h3>Trao đổi nhanh hơn</h3>
            <p className="contact-page-note">Chưa muốn điền form? Nhắn tin trực tiếp qua các kênh dưới đây.</p>
            <div className="contact-list">
              <a className="contact-channel" href={site.contact.facebookUrl} target="_blank" rel="noreferrer"><span className="contact-channel-icon"><Icon name="user" /></span><span><strong>Facebook</strong><small>Nhắn tin qua Messenger</small></span><Icon name="arrow-up-right" /></a>
              <a className="contact-channel" href={site.contact.discordUrl} target="_blank" rel="noreferrer"><span className="contact-channel-icon"><Icon name="headphones" /></span><span><strong>Discord</strong><small>Trao đổi nhanh với quản trị viên</small></span><Icon name="arrow-up-right" /></a>
              <a className="contact-channel" href={`https://zalo.me/${zaloPhoneNumber}`} target="_blank" rel="noreferrer"><span className="contact-channel-icon"><Icon name="phone" /></span><span><strong>Zalo</strong><small>{site.contact.phone}</small></span><Icon name="arrow-up-right" /></a>
              <a className="contact-channel" href={`mailto:${site.contact.email}`}><span className="contact-channel-icon"><Icon name="mail" /></span><span><strong>Email</strong><small>{site.contact.email}</small></span><Icon name="arrow-up-right" /></a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
