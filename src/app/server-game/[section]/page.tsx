import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { serverGameConfig, type ServerGameRankingKey } from "@/config/server-game";

const sections = ["gioi-thieu", "tinh-nang", "xep-hang", "tin-tuc", "wiki", "info", "discord", "choi-ngay"] as const;
type Section = (typeof sections)[number];

const sectionNames: Record<Section, string> = {
  "gioi-thieu": "Giới thiệu",
  "tinh-nang": "Tính năng",
  "xep-hang": "Xếp hạng",
  "tin-tuc": "Tin tức",
  wiki: "Wiki",
  info: "Thông tin máy chủ",
  discord: "Discord",
  "choi-ngay": "Chơi ngay",
};

export function generateStaticParams() {
  return sections.map((section) => ({ section }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  const name = isSection(section) ? sectionNames[section] : "DiabloSMP";
  return { title: `${name} | DiabloSMP`, description: `${name} của Minecraft Survival server DiabloSMP.` };
}

export default async function ServerGameSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!isSection(section)) notFound();

  return (
    <div className="game-page">
      <ServerGameNavigation />
      <main className="game-subpage-main">
        <div className="game-container game-subpage-shell">
          <p className="game-kicker">DIABLOSMP / {sectionNames[section]}</p>
          {section === "gioi-thieu" ? <AboutPage /> : null}
          {section === "tinh-nang" ? <FeaturesPage /> : null}
          {section === "xep-hang" ? <RankingsPage /> : null}
          {section === "tin-tuc" ? <NewsPage /> : null}
          {section === "wiki" ? <WikiPage /> : null}
          {section === "info" ? <ServerInfoPage /> : null}
          {section === "discord" ? <DiscordPage /> : null}
          {section === "choi-ngay" ? <PlayPage /> : null}
        </div>
      </main>
      <ServerGameFooter />
    </div>
  );
}

function isSection(value: string): value is Section {
  return sections.includes(value as Section);
}

function ServerGameNavigation() {
  return (
    <header className="game-nav">
      <Link className="game-logo" href="/server-game" aria-label="DiabloSMP - Trang chủ"><Image alt="" aria-hidden="true" className="game-logo-mark" height={34} priority src="/assets/image/logo_diablosmp.png" width={34} /><span>DIABLO<strong>SMP</strong></span></Link>
      <nav className="game-nav-links" aria-label="Điều hướng DiabloSMP">
        <Link href="/server-game/tinh-nang">Tính năng</Link><Link href="/server-game/xep-hang">Xếp hạng</Link><Link href="/server-game/tin-tuc">Tin tức</Link><Link href="/server-game/wiki">Wiki</Link><Link href="/server-game/info">Thông tin</Link>
      </nav>
      <div className="game-nav-actions"><Link className="game-nav-cta" href="/server-game/choi-ngay">Chơi ngay <Icon name="arrow-right" /></Link></div>
    </header>
  );
}

function AboutPage() {
  return <SectionIntro title={<>Một thế giới <span>do người chơi tạo ra.</span></>} text="DiabloSMP là Survival Multiplayer nơi căn cứ, giao dịch, liên minh và những trận PvP cùng viết nên lịch sử server." ><div className="game-subpage-split"><div className="game-subpage-art game-subpage-art-world"><strong>ONE WORLD.<br /><em>YOUR LEGACY.</em></strong></div><div className="game-subpage-copy"><p>Không có đường đi cố định. Bạn có thể bắt đầu bằng một căn nhà nhỏ, lập chợ, tham gia bang hội hoặc giành lấy vùng đất của riêng mình.</p><p>Mỗi mùa mở ra một bản đồ mới, sự kiện mới và cơ hội mới để tên bạn xuất hiện trong lịch sử DiabloSMP.</p><Link className="game-button game-button-primary" href="/server-game/choi-ngay">Bắt đầu chơi <Icon name="arrow-right" /></Link></div></div></SectionIntro>;
}

function FeaturesPage() {
  return <SectionIntro title={<>Chơi theo <span>cách của bạn.</span></>} text="Tám hệ thống giữ cho thế giới luôn có việc để làm, dù bạn thích xây dựng, giao dịch hay chiến đấu."><div className="game-feature-grid game-subpage-feature-grid">{serverGameConfig.features.map((feature) => <article className={`game-feature-card game-feature-${feature.tone}`} key={feature.number}><div className="game-feature-top"><span>{feature.number}</span><Icon name={feature.icon} /></div><h3>{feature.title}</h3><p>{feature.text}</p></article>)}</div></SectionIntro>;
}

function RankingsPage() {
  const rankingKeys = Object.keys(serverGameConfig.rankings) as ServerGameRankingKey[];
  return <SectionIntro title={<>Ai đang đứng <span>trên đỉnh?</span></>} text="Bảng xếp hạng cập nhật theo mùa. Leo hạng bằng kỹ năng, thời gian và chiến lược của bạn."><div className="game-subpage-ranking-grid">{rankingKeys.map((key) => <section className="game-ranking-board" key={key}><h2>{key === "wealth" ? "Tài sản" : key === "pvp" ? "PvP kills" : "Thời gian chơi"}</h2>{serverGameConfig.rankings[key].map(([name, score, place]) => <div className={`game-ranking-row ${place === "01" ? "is-first" : ""}`} key={name}><span>{place}</span><strong>{name}</strong><b>{score}</b></div>)}</section>)}</div></SectionIntro>;
}

function NewsPage() {
  return <SectionIntro title={<>Tin mới từ <span>chiến trường.</span></>} text="Theo dõi mùa giải, sự kiện và những thay đổi mới nhất của DiabloSMP."><div className="game-news-grid game-subpage-news-grid">{serverGameConfig.news.map((item, index) => <article className="game-news-card" key={item.title}><div className={`game-news-image news-image-${index + 1}`}><span>{item.tag}</span></div><div className="game-news-copy"><small>{item.date}</small><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></SectionIntro>;
}

function WikiPage() {
  return <SectionIntro title={<>Bắt đầu <span>đúng cách.</span></>} text="Hướng dẫn nhanh cho người mới. Cần hỏi thêm? Discord luôn có người hỗ trợ."><div className="game-subpage-wiki-grid"><div className="game-guide-ip"><small>ĐỊA CHỈ JAVA SERVER</small><strong>{serverGameConfig.javaAddress}</strong><span>Phiên bản: {serverGameConfig.version}</span></div><div className="game-guide-steps">{[["01", "Mở Minecraft", "Dùng Minecraft Java Edition phiên bản 1.21 trở lên."], ["02", "Thêm server", "Chọn Multiplayer, Add Server và nhập địa chỉ DiabloSMP."], ["03", "Nhận kit tân thủ", "Kết nối server, đọc rules và bắt đầu xây dựng." ]].map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div><div className="game-subpage-faq"><h2>Hỏi nhanh</h2>{serverGameConfig.faqs.slice(0, 4).map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></SectionIntro>;
}

function ServerInfoPage() {
  const serverDetails = [
    ["Java Edition", serverGameConfig.javaAddress, "Kết nối chính"],
    ["Bedrock Edition", serverGameConfig.bedrockAddress, `Port ${serverGameConfig.bedrockPort}`],
    ["Phiên bản", serverGameConfig.version, "Java 1.21 trở lên"],
    ["Chế độ", serverGameConfig.mode, "Survival Multiplayer"],
  ];

  return <SectionIntro title={<>Thông tin <span>máy chủ.</span></>} text="Mọi thứ cần biết trước khi bước vào thế giới DiabloSMP. Cập nhật kết nối và hỏi cộng đồng khi cần hỗ trợ."><section className="game-server-info-community" aria-labelledby="community-heading"><div className="game-server-info-section-heading"><p className="game-kicker">KÊNH CHAT DIABLOSMP</p><h2 id="community-heading">Tham gia nhóm <span>trước tiên.</span></h2><p>Chọn kênh phù hợp để nhận hỗ trợ, tìm đồng đội và cập nhật thông báo nhanh nhất.</p></div><div className="game-server-info-chat-grid"><a className="game-server-info-chat game-server-info-chat-discord" href={serverGameConfig.discordUrl} target="_blank" rel="noreferrer"><span className="game-server-info-chat-icon"><Icon name="headphones" /></span><span><strong>Nhóm Discord</strong><small>Chat cộng đồng, thông báo event và hỗ trợ trong game.</small></span><Icon name="arrow-up-right" /></a><a className="game-server-info-chat game-server-info-chat-messenger" href={serverGameConfig.messengerUrl} target="_blank" rel="noreferrer"><span className="game-server-info-chat-icon"><Icon name="mail" /></span><span><strong>Nhóm Messenger</strong><small>Nhắn tin nhanh, hỏi đáp và kết nối cùng người chơi.</small></span><Icon name="arrow-up-right" /></a></div></section><section className="game-server-info-details" aria-labelledby="server-details-heading"><div className="game-server-info-section-heading"><p className="game-kicker">THÔNG TIN KẾT NỐI</p><h2 id="server-details-heading">Thông số <span>máy chủ.</span></h2></div><div className="game-server-info-grid">{serverDetails.map(([label, value, note]) => <article className="game-server-info-card" key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}</div></section><div className="game-server-info-note"><span className="game-status-pulse" /> Server status được cập nhật tại trang chủ <Link href="/server-game">Xem trang chủ <Icon name="arrow-right" /></Link></div></SectionIntro>;
}

function DiscordPage() {
  return <SectionIntro title={<>Gặp nhau ở <span>Discord.</span></>} text="Tìm đồng đội, nhận thông báo event, báo lỗi và theo dõi mọi diễn biến trong server."><div className="game-subpage-discord"><div className="game-discord-mark"><Icon name="headphones" /></div><div><h2>Cộng đồng DiabloSMP</h2><p>Server chat, hỗ trợ tân binh và thông báo season đều ở đây.</p></div><a className="game-button game-button-primary" href={serverGameConfig.discordUrl} target="_blank" rel="noreferrer">Mở Discord <Icon name="arrow-up-right" /></a></div></SectionIntro>;
}

function PlayPage() {
  return <SectionIntro title={<>Vào game trong <span>ba bước.</span></>} text="Không cần modpack. Chỉ cần Minecraft Java Edition và địa chỉ server."><div className="game-subpage-play"><div className="game-guide-ip"><small>SERVER IP</small><strong>{serverGameConfig.javaAddress}</strong><span>{serverGameConfig.mode} · {serverGameConfig.version}</span></div><div className="game-guide-steps">{[["01", "Mở Minecraft", "Dùng Minecraft Java Edition."], ["02", "Chọn Multiplayer", "Nhấn Add Server và nhập IP phía trên."], ["03", "Chơi thôi", "Kết nối, đọc rules và bắt đầu hành trình."]].map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div><a className="game-text-link" href={serverGameConfig.discordUrl} target="_blank" rel="noreferrer">Cần trợ giúp? Vào Discord <Icon name="arrow-up-right" /></a></SectionIntro>;
}

function SectionIntro({ title, text, children }: { title: React.ReactNode; text: string; children: React.ReactNode }) {
  return <><div className="game-subpage-heading"><h1>{title}</h1><p>{text}</p></div>{children}</>;
}

function ServerGameFooter() {
  return <footer className="game-footer"><div className="game-container game-footer-bottom"><span>© 2026 DiabloSMP</span><Link href="/server-game">Về trang chủ</Link><span>{serverGameConfig.javaAddress}</span></div></footer>;
}
