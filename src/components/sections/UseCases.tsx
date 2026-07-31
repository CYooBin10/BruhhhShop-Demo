import Image from "next/image";

const useCases = [
  ["/assets/image/doing/mc.webp", "Server Minecraft Paper/Purpur", "Phù hợp server vừa phải, hiệu năng thực tế tùy plugin và map."],
  ["/assets/image/doing/world-wide-web.png", "Website và API", "Chạy website, backend hoặc API cần hoạt động liên tục."],
  ["/assets/image/doing/bot.png", "Bot Discord", "Duy trì bot online mà không phụ thuộc máy cá nhân."],
  ["/assets/image/doing/mc.webp", "Ứng dụng chạy 24/7", "Triển khai dịch vụ nền và tác vụ dài hạn."],
] as const;

export function UseCases() {
  return <section className="section section-use-cases" id="nhu-cau"><div className="container"><div className="section-heading"><div><p className="section-label">Nhu cầu phù hợp</p><h2>Dùng VPS cho <span>việc gì?</span></h2></div></div><div className="use-case-grid use-case-grid-four">{useCases.map(([image, title, description]) => <article className="use-case-card" key={title}><span className="use-case-image"><Image alt="" height={512} sizes="(max-width: 430px) 120px, 104px" src={image} width={512} /></span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>;
}
