"use client";

import { useEffect, useState } from "react";

type PurchaseLog = {
  id: string;
  content: string;
};

export function PurchaseLogs() {
  const [items, setItems] = useState<PurchaseLog[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    let isLoading = false;
    const loadPurchaseLogs = async () => {
      if (isLoading) return;
      isLoading = true;
      try {
        const response = await fetch("/api/purchase-logs", { signal: controller.signal, cache: "no-store" });
        const data: { items?: PurchaseLog[] } = response.ok ? await response.json() : { items: [] };
        setItems(data.items ?? []);
      } catch {
        // Keep last received logs when Discord is temporarily unavailable.
      } finally {
        isLoading = false;
      }
    };
    void loadPurchaseLogs();
    const timer = window.setInterval(() => void loadPurchaseLogs(), 1000);
    return () => { controller.abort(); window.clearInterval(timer); };
  }, []);

  return <aside aria-label="Đơn hàng gần đây" className="purchase-log-panel"><div className="purchase-log-list">{items.length > 0 ? items.map((item) => <p key={item.id}>{item.content}</p>) : <p className="purchase-log-empty">Chưa có log mua hàng mới.</p>}</div></aside>;
}
