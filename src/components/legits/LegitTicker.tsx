"use client";

import { useEffect, useState } from "react";

type LegitTickerItem = {
  id: string;
  author: string;
  content: string;
};

export function LegitTicker() {
  const [items, setItems] = useState<LegitTickerItem[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/legits", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : { items: [] })
      .then((data: { items?: LegitTickerItem[] }) => setItems(data.items ?? []))
      .catch(() => setItems([]));
    return () => controller.abort();
  }, []);

  const tickerItems = items.length > 0 ? [...items, ...items] : [{ id: "loading", author: "Legits", content: "Đang tải đánh giá từ Discord" }];

  return <section className="legit-ticker" aria-label="Legits mới nhất"><div className="legit-ticker-label"><i /> Legits mới</div><div className="legit-ticker-viewport"><div className="legit-ticker-track">{tickerItems.map((item, index) => <p aria-hidden={index >= items.length && items.length > 0} className="legit-ticker-item" key={`${item.id}-${index}`}><strong>{item.author}</strong><span>{item.content}</span></p>)}</div></div></section>;
}
