"use client";

import { useState } from "react";
import { faqs } from "@/data/faqs";
import { Icon } from "@/components/ui/Icon";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section className="section section-faq" id="faq">
      <div className="container faq-layout"><div className="faq-intro"><p className="section-label">Giải đáp nhanh</p><h2>Câu hỏi<br /><span>thường gặp</span></h2><p>Chưa thấy câu trả lời? Liên hệ để được hỗ trợ theo nhu cầu cụ thể.</p><a className="text-link" href="#lien-he">Liên hệ hỗ trợ <Icon name="arrow-up-right" /></a></div><div className="faq-list">{faqs.map((faq, index) => { const open = openIndex === index; return <div className={`faq-item ${open ? "is-open" : ""}`} key={faq.question}><button type="button" aria-expanded={open} onClick={() => setOpenIndex(open ? null : index)}><span>{faq.question}</span><span className="faq-toggle"><Icon name="chevron-down" /></span></button><div className="faq-answer"><p>{faq.answer}</p></div></div>; })}</div></div>
    </section>
  );
}
