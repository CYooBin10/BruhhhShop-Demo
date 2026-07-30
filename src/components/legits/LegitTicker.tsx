"use client";

import { useEffect, useState } from "react";

type LegitTickerItem = {
  id: string;
  author: string;
  content: string;
  imageUrl: string | null;
  avatarUrl: string | null;
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

  const tickerItems = items.length > 0 ? [...items, ...items] : [{ id: "loading-1", author: "Legit", content: "Đang tải đánh giá từ Discord", imageUrl: null, avatarUrl: null }, { id: "loading-2", author: "Legit", content: "Đang tải đánh giá từ Discord", imageUrl: null, avatarUrl: null }];

  return <section className="legit-ticker" aria-label="Legit mới nhất"><a className="legit-ticker-label" href="https://2tech.studio/legits" rel="noreferrer" target="_blank"><b>Legit</b><small>Xem tất cả</small></a><div className="legit-ticker-viewport"><div className="legit-ticker-track">{tickerItems.map((item, index) => <article aria-hidden={index >= items.length && items.length > 0} className="legit-ticker-item" key={`${item.id}-${index}`}>{item.imageUrl ? <span aria-hidden="true" className="legit-ticker-image" style={{ backgroundImage: `url("${item.imageUrl}")` }} /> : <span aria-hidden="true" className="legit-ticker-avatar" style={item.avatarUrl ? { backgroundImage: `url("${item.avatarUrl}")` } : undefined}>{item.author.slice(0, 1)}</span>}<div><strong>{item.author}</strong><p>{item.content}</p></div></article>)}</div></div></section>;
}
