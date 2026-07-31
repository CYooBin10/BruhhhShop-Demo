"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { supabase } from "@/lib/supabase";

type AccessState = "checking" | "unauthenticated" | "forbidden" | "ready";

export default function AdminPage() {
  const router = useRouter();
  const [accessState, setAccessState] = useState<AccessState>("checking");
  const [message, setMessage] = useState("");
  const [isReloading, setIsReloading] = useState(false);

  useEffect(() => {
    const verifyAccess = async () => {
      if (!supabase) {
        router.replace("/");
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/");
        return;
      }

      const response = await fetch("/api/admin/reload-config", { headers: { Authorization: `Bearer ${data.session.access_token}` } });
      if (response.ok) {
        setAccessState("ready");
        return;
      }

      if (response.status === 403 || response.status === 401) {
        router.replace("/");
        return;
      }

      setAccessState("unauthenticated");
    };

    void verifyAccess();
  }, [router]);

  const reloadConfig = async () => {
    if (!supabase) return;
    setIsReloading(true);
    setMessage("");

    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      setAccessState("unauthenticated");
      setIsReloading(false);
      return;
    }

    const response = await fetch("/api/admin/reload-config", { method: "POST", headers: { Authorization: `Bearer ${data.session.access_token}` } });
    const result: unknown = await response.json().catch(() => null);
    const resultMessage = typeof result === "object" && result !== null && "message" in result && typeof result.message === "string" ? result.message : typeof result === "object" && result !== null && "error" in result && typeof result.error === "string" ? result.error : "Reload config thất bại.";

    if (response.ok) {
      setMessage(resultMessage);
      window.location.reload();
      return;
    }

    if (response.status === 401 || response.status === 403) setAccessState(response.status === 403 ? "forbidden" : "unauthenticated");
    setMessage(resultMessage);
    setIsReloading(false);
  };

  return (
    <main className="admin-page">
      <section className="admin-card" aria-live="polite">
        <span className="admin-icon"><Icon name="shield" /></span>
        <p className="section-label">Quản trị</p>
        <h1>Discord config</h1>
        {accessState === "checking" ? <p>Đang xác thực tài khoản.</p> : null}
        {accessState === "unauthenticated" ? <p>Đăng nhập bằng <strong>tranhuybao000@gmail.com</strong> để truy cập dashboard.</p> : null}
        {accessState === "forbidden" ? <p>Tài khoản hiện tại không có quyền truy cập dashboard.</p> : null}
        {accessState === "ready" ? <><p>Đọc attachment <code>discord-config.json</code> mới nhất từ Discord, kiểm tra schema rồi refresh config web.</p><button className="button button-primary admin-reload" disabled={isReloading} type="button" onClick={() => void reloadConfig()}><Icon name="workflow" />{isReloading ? "Đang reload" : "Reload Discord config"}</button></> : null}
        {message ? <p className="admin-message">{message}</p> : null}
        <Link className="text-link" href="/">Về trang chủ <Icon name="arrow-right" /></Link>
      </section>
    </main>
  );
}
