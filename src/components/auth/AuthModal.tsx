"use client";

import Link from "next/link";
import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { policyUrls } from "@/config/policies";
import { supabase } from "@/lib/supabase";
import { Icon } from "@/components/ui/Icon";

type AuthMode = "login" | "register";

type AuthModalProps = {
  mode: AuthMode | null;
  onClose: () => void;
  onModeChange: (mode: AuthMode) => void;
};

export function AuthModal({ mode, onClose, onModeChange }: AuthModalProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!mode) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = previousOverflow; };
  }, [mode, onClose]);

  if (!mode) return null;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    if (mode === "register" && password !== confirmPassword) {
      setMessage("Mật khẩu xác nhận chưa khớp.");
      return;
    }
    if (!supabase) {
      setMessage("Supabase chưa được cấu hình. Hãy thêm URL và anon key vào biến môi trường.");
      return;
    }

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim().toLowerCase();
    setIsSubmitting(true);

    const result = mode === "login"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { username: String(form.get("username") ?? "").trim() },
          },
        });

    setIsSubmitting(false);
    if (result.error) {
      const authErrors: Record<string, string> = {
        "Invalid login credentials": "Gmail hoặc mật khẩu không đúng.",
        "User already registered": "Gmail này đã được đăng ký.",
        "Email not confirmed": "Gmail chưa được xác nhận.",
      };
      setMessage(authErrors[result.error.message] ?? result.error.message);
      return;
    }
    if (result.data.session) {
      window.dispatchEvent(new Event("bruhhh-auth-changed"));
    }
    if (mode === "login") {
      onClose();
      return;
    }
    setMessage("Đăng ký thành công. Vui lòng kiểm tra Gmail để xác nhận tài khoản.");
  };

  const changeMode = (nextMode: AuthMode) => {
    setPassword("");
    setConfirmPassword("");
    setAgreed(false);
    setMessage("");
    setIsSubmitting(false);
    onModeChange(nextMode);
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section aria-labelledby={titleId} aria-modal="true" className="auth-modal" role="dialog">
        <button ref={closeButtonRef} className="modal-close auth-close" type="button" aria-label="Đóng cửa sổ tài khoản" onClick={onClose}><Icon name="close" /></button>
        <header className="auth-header">
          <span className="auth-symbol"><Icon name="user" /></span>
          <h2 id={titleId}>{mode === "login" ? "Chào mừng trở lại" : "Tạo tài khoản"}</h2>
          <p>{mode === "login" ? "Đăng nhập để quản lý dịch vụ của bạn." : "Điền thông tin để đăng ký DiabloNode."}</p>
        </header>
        <div className="auth-tabs" role="tablist">
          <button className={mode === "login" ? "is-active" : ""} type="button" role="tab" aria-selected={mode === "login"} onClick={() => changeMode("login")}>Đăng nhập</button>
          <button className={mode === "register" ? "is-active" : ""} type="button" role="tab" aria-selected={mode === "register"} onClick={() => changeMode("register")}>Đăng ký</button>
        </div>
        <form className="auth-form" onSubmit={submit}>
          {mode === "register" ? <AuthField autoComplete="username" icon="user" label="Username" maxLength={32} minLength={3} name="username" placeholder="Tên hiển thị" /> : null}
          <AuthField autoComplete="email" icon="mail" inputMode="email" label="Gmail" name="email" pattern="[^@\s]+@gmail\.com" placeholder="tenban@gmail.com" title="Vui lòng dùng địa chỉ @gmail.com" type="email" />
          <div className={mode === "register" ? "auth-password-grid" : ""}>
            <AuthField autoComplete={mode === "login" ? "current-password" : "new-password"} icon="shield" label="Mật khẩu" minLength={8} name="password" type="password" value={password} onChange={setPassword} />
            {mode === "register" ? <AuthField autoComplete="new-password" icon="shield" label="Xác nhận mật khẩu" minLength={8} name="confirmPassword" type="password" value={confirmPassword} onChange={setConfirmPassword} /> : null}
          </div>
          {mode === "register" ? <label className="auth-agreement"><input checked={agreed} type="checkbox" onChange={(event) => setAgreed(event.target.checked)} /><span>Tôi đồng ý với <Link href={policyUrls.terms} target="_blank">Điều khoản dịch vụ</Link> và <Link href={policyUrls.privacy} target="_blank">Chính sách quyền riêng tư</Link>.</span></label> : null}
          <button className="button button-primary auth-submit" disabled={isSubmitting || (mode === "register" && !agreed)} type="submit">{isSubmitting ? "Đang xử lý" : mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}<Icon name="arrow-right" /></button>
          {message ? <p className="auth-message" role="status">{message}</p> : null}
        </form>
      </section>
    </div>
  );
}

type AuthFieldProps = {
  autoComplete: string;
  icon: "mail" | "shield" | "user";
  inputMode?: "email";
  label: string;
  maxLength?: number;
  minLength?: number;
  name: string;
  onChange?: (value: string) => void;
  pattern?: string;
  placeholder?: string;
  title?: string;
  type?: "email" | "password" | "text";
  value?: string;
};

function AuthField({ icon, label, onChange, type = "text", ...inputProps }: AuthFieldProps) {
  return <label className="auth-field"><span>{label}</span><div><Icon name={icon} /><input required type={type} onChange={onChange ? (event) => onChange(event.target.value) : undefined} {...inputProps} /></div></label>;
}
