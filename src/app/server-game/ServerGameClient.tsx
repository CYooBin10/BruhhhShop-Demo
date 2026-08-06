"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { serverGameConfig, type ServerGameRankingKey, type ServerGameStatus } from "@/config/server-game";
import { Icon } from "@/components/ui/Icon";

const rankingLabels: Record<ServerGameRankingKey, string> = { wealth: "Tài sản", pvp: "PvP kills", playtime: "Thời gian chơi" };

export function ServerGameClient({ status }: { status: ServerGameStatus }) {
  const [copied, setCopied] = useState(false);
  const [ranking, setRanking] = useState<ServerGameRankingKey>("wealth");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const copyIp = async () => {
    try {
      await navigator.clipboard.writeText(serverGameConfig.javaAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return <ServerGameContent copied={copied} copyIp={() => void copyIp()} openFaq={openFaq} ranking={ranking} setOpenFaq={setOpenFaq} setRanking={setRanking} status={status} />;
}

type ServerGameContentProps = {
  copied: boolean;
  copyIp: () => void;
  openFaq: number | null;
  ranking: ServerGameRankingKey;
  setOpenFaq: (index: number | null) => void;
  setRanking: (key: ServerGameRankingKey) => void;
  status: ServerGameStatus;
};

function ServerGameContent({ copied, copyIp, openFaq, ranking, setOpenFaq, setRanking, status }: ServerGameContentProps) {
  return (
    <div className="game-page">
      <header className="game-nav">
        <Link className="game-logo" href="/server-game" aria-label="DiabloSMP - Trang chủ"><Image alt="" aria-hidden="true" className="game-logo-mark" height={34} priority src="/assets/image/logo_diablosmp.png" width={34} /><span>DIABLO<strong>SMP</strong></span></Link>
        <nav className="game-nav-links" aria-label="Điều hướng DiabloSMP"><Link href="/server-game/tinh-nang">Tính năng</Link><Link href="/server-game/xep-hang">Xếp hạng</Link><Link href="/server-game/tin-tuc">Tin tức</Link><Link href="/server-game/wiki">Wiki</Link><Link href="/server-game/info">Thông tin</Link></nav>
        <div className="game-nav-actions"><Link className="game-nav-cta" href="/server-game/choi-ngay">Chơi ngay <Icon name="arrow-right" /></Link></div>
      </header>

      <main id="trang-chu">
        <section className="game-hero" id="gioi-thieu">
          <div className="game-hero-smoke game-hero-smoke-one" /><div className="game-hero-smoke game-hero-smoke-two" />
          <div className="game-container game-hero-content">
            <div className="game-hero-copy"><p className="game-eyebrow"><span /> MINECRAFT SURVIVAL MULTIPLAYER</p><h1>DIABLO<span>SMP</span></h1><p className="game-hero-tagline">{serverGameConfig.slogan}</p><p className="game-hero-lead">Tham gia thế giới SMP nơi kinh tế, PvP, base và quyền lực của người chơi cùng tạo nên một cuộc chiến không hồi kết.</p><div className="game-hero-actions"><button className="game-button game-button-primary" type="button" onClick={copyIp}><Icon name="copy" /> Sao chép IP</button><a className="game-button game-button-secondary" href={serverGameConfig.discordUrl} target="_blank" rel="noreferrer"><Icon name="headphones" /> Tham gia Discord</a></div><p className={`game-copy-feedback ${copied ? "is-visible" : ""}`} role="status"><Icon name="circle-check" /> Đã sao chép IP: {serverGameConfig.javaAddress}</p></div>
            <div className="game-server-widget"><div className="game-widget-header"><span>DIABLOSMP / SERVER STATUS</span><span className={`game-live ${status.online ? "" : "is-offline"}`}><i /> {status.online ? "ONLINE" : "OFFLINE"}</span></div><div className="game-widget-divider" /><div className="game-widget-status"><span className={`game-online-dot ${status.online ? "" : "is-offline"}`} /><div><small>SERVER STATUS</small><strong>{status.online ? "Đang hoạt động" : "Ngoại tuyến"}</strong></div><b className={status.online ? "" : "is-offline"}>{status.playersOnline === null ? "— / —" : `${status.playersOnline} / ${status.playersMax ?? "—"}`}</b></div><div className="game-widget-info"><div><small>ĐỊA CHỈ SERVER</small><strong>{serverGameConfig.javaAddress}</strong></div><div><small>PHIÊN BẢN</small><strong>{status.version ?? serverGameConfig.version}</strong></div></div><div className="game-widget-info"><div><small>CHẾ ĐỘ</small><strong>{serverGameConfig.mode}</strong></div><div><small>UPTIME</small><strong>{serverGameConfig.uptime}</strong></div></div><div className="game-widget-bottom"><span><Icon name="shield" /> Anti-cheat</span><span><Icon name="server" /> 24/7 Online</span></div></div>
          </div><div className="game-container game-hero-badges"><span><i className={status.online ? "" : "is-offline"} /> {status.playersOnline === null ? "Đang kiểm tra người chơi" : `${status.playersOnline} người chơi online`}</span><span>Season 01 · New world</span><span>Java Edition · {status.version ?? serverGameConfig.version}</span></div>
        </section>

        <section className="game-status-bar" aria-label="Thông tin server"><div className="game-container game-status-grid"><div className="game-status-main"><span className={`game-status-pulse ${status.online ? "" : "is-offline"}`} /><div><small>TRẠNG THÁI</small><strong>{status.online ? "Server đang online" : "Server đang offline"}</strong></div></div><StatusMetric label="PLAYERS ONLINE" value={status.playersOnline === null ? "—" : `${status.playersOnline} / ${status.playersMax ?? "—"}`} /><StatusMetric label="VERSION" value={status.version ?? serverGameConfig.version} /><StatusMetric label="PING" value="Đang cập nhật" /><StatusMetric label="DISCORD MEMBERS" value={serverGameConfig.discordMembers} /><button className="game-status-copy" type="button" onClick={copyIp}><Icon name="copy" /> {serverGameConfig.javaAddress}</button></div></section>

        <section className="game-section game-intro-section" id="gioi-thieu-server"><div className="game-container game-intro-grid"><div className="game-intro-art"><div className="game-art-stamp">EST.<br />2026</div><span>DIABLO / FRONTIER</span><strong>ONE WORLD.<br /><em>YOUR LEGACY.</em></strong><small>EVERY BLOCK COUNTS</small></div><div className="game-intro-copy"><p className="game-kicker">01 / ABOUT DIABLOSMP</p><h2>Một thế giới được tạo nên <span>bởi người chơi.</span></h2><p>DiabloSMP là server Minecraft Survival Multiplayer tập trung vào sự tự do, cạnh tranh và tương tác giữa người chơi. Bạn có thể xây dựng căn cứ, phát triển kinh tế, thành lập liên minh, săn tiền thưởng, giao dịch và tham gia những trận PvP có giá trị thực sự.</p><p>Không có câu chuyện được viết sẵn. Mỗi căn cứ, cuộc chiến và thỏa thuận đều góp phần tạo nên lịch sử của server.</p><a className="game-text-link" href="#tinh-nang">Khám phá thế giới <Icon name="arrow-right" /></a></div></div></section>

        <section className="game-section game-features-section" id="tinh-nang"><div className="game-container"><div className="game-section-head"><div><p className="game-kicker">02 / SERVER FEATURES</p><h2>Tạo luật chơi.<br /><span>Chiếm lấy thế giới.</span></h2></div><p>Tám hệ thống tạo thành một thế giới sống động, nơi kỹ năng và chiến lược quyết định vị trí của bạn.</p></div><div className="game-feature-grid">{serverGameConfig.features.map((feature) => <article className={`game-feature-card game-feature-${feature.tone}`} key={feature.number}><div className="game-feature-top"><span>{feature.number}</span><Icon name={feature.icon} /></div><h3>{feature.title}</h3><p>{feature.text}</p><a href="#ket-noi" aria-label={`Khám phá ${feature.title}`}><Icon name="arrow-up-right" /></a></article>)}</div></div></section>

        <section className="game-section game-showcase-section"><div className="game-container"><div className="game-section-head"><div><p className="game-kicker">03 / WORLD SHOWCASE</p><h2>Đây không chỉ là <span>một map.</span></h2></div><p>Từ spawn đến chiến trường, mỗi khu vực tồn tại để mở ra một cuộc chơi mới.</p></div><div className="game-gallery">{serverGameConfig.gallery.map((item, index) => <article className={`game-gallery-item game-gallery-${item.className}`} key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></div></section>

        <section className="game-section game-guide-section" id="huong-dan"><div className="game-container game-guide-grid"><div><p className="game-kicker">04 / HOW TO PLAY</p><h2>Vào game trong <span>ba bước.</span></h2><p className="game-guide-lead">Không cần modpack. Chỉ cần Minecraft Java Edition và vài phút để bắt đầu viết chương đầu tiên.</p><div className="game-platform-tabs"><span className="is-active">Java Edition</span><span>Bedrock · Sắp ra mắt</span></div><div className="game-guide-ip"><small>ĐỊA CHỈ SERVER</small><strong>{serverGameConfig.javaAddress}</strong><button type="button" onClick={copyIp}><Icon name="copy" /> Sao chép IP</button></div></div><div className="game-guide-steps">{[["01", "Mở Minecraft", "Dùng Minecraft Java Edition phiên bản 1.21 trở lên."], ["02", "Thêm server", "Chọn Multiplayer, Add Server và nhập IP DiabloSMP."], ["03", "Bắt đầu hành trình", "Kết nối, nhận kit tân thủ và xây dựng đế chế của bạn."]].map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

        <section className="game-section game-ranking-section" id="xep-hang"><div className="game-container game-ranking-grid"><div className="game-ranking-intro"><p className="game-kicker">05 / HALL OF FAME</p><h2>Bảng danh vọng <span>DiabloSMP.</span></h2><p>Những cái tên đang định hình mùa giải. Tên bạn sẽ xuất hiện ở đâu?</p></div><div className="game-ranking-board"><div className="game-ranking-tabs">{(Object.keys(rankingLabels) as ServerGameRankingKey[]).map((key) => <button className={ranking === key ? "is-active" : ""} key={key} type="button" onClick={() => setRanking(key)}>{rankingLabels[key]}</button>)}</div><div className="game-ranking-head"><span>#</span><span>PLAYER</span><span>SCORE</span></div>{serverGameConfig.rankings[ranking].map(([name, score, place]) => <div className={`game-ranking-row ${place === "01" ? "is-first" : ""}`} key={name}><span>{place}</span><strong>{name}</strong><b>{score}</b></div>)}</div></div></section>

        <section className="game-section game-news-section" id="tin-tuc"><div className="game-container"><div className="game-section-head"><div><p className="game-kicker">06 / INTELLIGENCE</p><h2>Tin từ <span>chiến trường.</span></h2></div><a className="game-text-link" href="#tin-tuc">Xem tất cả tin tức <Icon name="arrow-right" /></a></div><div className="game-news-grid">{serverGameConfig.news.map((item, index) => <article className="game-news-card" key={item.title}><div className={`game-news-image news-image-${index + 1}`}><span>{item.tag}</span></div><div className="game-news-copy"><small>{item.date}</small><h3>{item.title}</h3><p>{item.text}</p><a href="#tin-tuc">Đọc thêm <Icon name="arrow-up-right" /></a></div></article>)}</div></div></section>

        <section className="game-section game-store-section" id="cua-hang"><div className="game-container game-store-card"><div><p className="game-kicker">07 / THE ARMORY</p><h2>Ủng hộ server.<br /><span>Giữ nguyên cuộc chơi.</span></h2><p>Khám phá rank, cosmetic, tag và pet. Các đặc quyền được thiết kế để không phá vỡ sự công bằng của gameplay.</p><a className="game-button game-button-primary" href={serverGameConfig.storeUrl}>Khám phá cửa hàng <Icon name="arrow-up-right" /></a></div><div className="game-store-art"><span>DIABLO</span><strong>ARMORY</strong><small>COSMETIC / RANK / SUPPORT</small></div></div></section>

        <section className="game-section game-discord-section"><div className="game-container game-discord-card"><div className="game-discord-mark"><Icon name="headphones" /></div><div><p className="game-kicker">08 / COMMUNITY</p><h2>Gia nhập cộng đồng <span>DiabloSMP.</span></h2><p>Tìm đồng đội, nhận thông báo sự kiện, báo lỗi và theo dõi mọi diễn biến trong server.</p></div><a className="game-button game-button-primary" href={serverGameConfig.discordUrl} target="_blank" rel="noreferrer">Tham gia Discord <Icon name="arrow-up-right" /></a></div></section>

        <section className="game-section game-faq-section" id="faq"><div className="game-container game-faq-grid"><div><p className="game-kicker">09 / KNOWLEDGE BASE</p><h2>Câu hỏi <span>thường gặp.</span></h2><p className="game-guide-lead">Chưa rõ điều gì? Bắt đầu từ đây hoặc hỏi trực tiếp cộng đồng Discord.</p></div><div className="game-faq-list">{serverGameConfig.faqs.map(([question, answer], index) => <div className={`game-faq-item ${openFaq === index ? "is-open" : ""}`} key={question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><span>{openFaq === index ? "−" : "+"}</span></button>{openFaq === index ? <p>{answer}</p> : null}</div>)}</div></div></section>
      </main>

      <footer className="game-footer"><div className="game-container game-footer-main"><div><Link className="game-logo" href="/server-game"><span className="game-logo-mark">D</span><span>DIABLO<strong>SMP</strong></span></Link><p>Sinh tồn. Chiến đấu. Thống trị.</p><div className="game-footer-ip"><small>SERVER IP</small><strong>{serverGameConfig.javaAddress}</strong><button type="button" onClick={copyIp}><Icon name="copy" /></button></div></div><div><h3>Khám phá</h3><a href="#gioi-thieu-server">Giới thiệu</a><a href="#tinh-nang">Tính năng</a><a href="#xep-hang">Bảng xếp hạng</a><a href="#tin-tuc">Tin tức</a></div><div><h3>Hỗ trợ</h3><a href="#huong-dan">Wiki / Hướng dẫn</a><a href="#faq">Câu hỏi thường gặp</a><a href={serverGameConfig.discordUrl} target="_blank" rel="noreferrer">Discord</a><a href="#ket-noi">Liên hệ</a></div><div><h3>Chính sách</h3><a href="#faq">Quy định server</a><a href="#faq">Điều khoản sử dụng</a><a href="#faq">Chính sách hoàn tiền</a></div></div><div className="game-container game-footer-bottom"><span>© 2026 DiabloSMP. All rights reserved.</span><span>DiabloSMP không liên kết hoặc được xác nhận bởi Mojang Studios hay Microsoft.</span></div></footer>
      <div className={`game-toast ${copied ? "is-visible" : ""}`} role="status"><Icon name="circle-check" /> Đã sao chép IP</div>
    </div>
  );
}

function StatusMetric({ label, value }: { label: string; value: string }) {
  return <div className="game-status-metric"><small>{label}</small><strong>{value}</strong></div>;
}
