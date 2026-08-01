"use client";

import { useEffect, useState } from "react";

type PurchaseLog = {
  id: string;
  content: string;
};

type PurchaseLogsResponse = {
  items?: PurchaseLog[];
  error?: "configuration" | "unauthorized" | "forbidden" | "not_found" | "rate_limited" | "upstream" | "timeout";
  retryAfter?: number;
};

const errorMessages = {
  configuration: "Bot chưa có token để đọc log mua hàng.",
  unauthorized: "Discord từ chối Bot token. Kiểm tra token trong biến môi trường.",
  forbidden: "Bot chưa có quyền đọc channel log mua hàng.",
  not_found: "Không tìm thấy channel log mua hàng. Kiểm tra lại ID channel.",
  rate_limited: "Discord đang giới hạn truy vấn log. Thử lại sau ít giây.",
  upstream: "Không đọc được log mua hàng từ Discord.",
  timeout: "Discord phản hồi quá lâu. Đang thử lại.",
} as const;

export function PurchaseLogs() {
  const [items, setItems] = useState<PurchaseLog[]>([]);
  const [error, setError] = useState<PurchaseLogsResponse["error"]>();

  useEffect(() => {
    const controller = new AbortController();
    let isLoading = false;
    let timer: number;
    const scheduleNextLoad = (delay = 1000) => { timer = window.setTimeout(() => void loadPurchaseLogs(), delay); };
    const loadPurchaseLogs = async () => {
      if (isLoading) return;
      isLoading = true;
      try {
        const response = await fetch("/api/purchase-logs", { signal: controller.signal, cache: "no-store" });
        const data: PurchaseLogsResponse = await response.json();
        setItems(data.items ?? []);
        setError(data.error);
        scheduleNextLoad(data.error === "rate_limited" ? Math.max(data.retryAfter ?? 5, 1) * 1000 : 1000);
      } catch {
        setError("upstream");
        scheduleNextLoad(5000);
      } finally {
        isLoading = false;
      }
    };
    void loadPurchaseLogs();
    return () => { controller.abort(); window.clearTimeout(timer); };
  }, []);

  return <aside aria-label="Đơn hàng gần đây" className="purchase-log-panel"><div className="purchase-log-list">{items.length > 0 ? items.map((item) => <p key={item.id}>{item.content}</p>) : <p className="purchase-log-empty">{error ? errorMessages[error] : "Chưa có log mua hàng mới."}</p>}</div></aside>;
}
