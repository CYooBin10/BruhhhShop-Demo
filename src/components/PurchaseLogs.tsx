"use client";

import { useEffect, useState } from "react";

type PurchaseLog = {
  id: string;
  content: string;
};

type PurchaseLogsResponse = {
  items?: PurchaseLog[];
  error?: "configuration" | "rate_limited" | "upstream" | "timeout";
};

const errorMessages = {
  configuration: "Bot chưa có token để đọc log mua hàng.",
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
    const loadPurchaseLogs = async () => {
      if (isLoading) return;
      isLoading = true;
      try {
        const response = await fetch("/api/purchase-logs", { signal: controller.signal, cache: "no-store" });
        const data: PurchaseLogsResponse = await response.json();
        setItems(data.items ?? []);
        setError(data.error);
      } catch {
        setError("upstream");
      } finally {
        isLoading = false;
      }
    };
    void loadPurchaseLogs();
    const timer = window.setInterval(() => void loadPurchaseLogs(), 1000);
    return () => { controller.abort(); window.clearInterval(timer); };
  }, []);

  return <aside aria-label="Đơn hàng gần đây" className="purchase-log-panel"><div className="purchase-log-list">{items.length > 0 ? items.map((item) => <p key={item.id}>{item.content}</p>) : <p className="purchase-log-empty">{error ? errorMessages[error] : "Chưa có log mua hàng mới."}</p>}</div></aside>;
}
