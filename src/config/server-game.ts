export const serverGameConfig = {
  name: "DiabloSMP",
  slogan: "Sinh tồn. Chiến đấu. Thống trị.",
  javaAddress: "play.diablosmp.com",
  bedrockAddress: "play.diablosmp.com",
  bedrockPort: "19132",
  version: "1.21+",
  mode: "Survival SMP",
  discordUrl: "https://discord.gg/nXwbVpBKY",
  messengerUrl: "https://m.me/j/AbbYYCKpRkQANIpt/?send_source=gc%3Acopy_invite_link_t",
  storeUrl: "#cua-hang",
  wikiUrl: "#huong-dan",
  statusApiUrl: "https://api.mcsrvstat.us/3/play.diablosmp.com",
  discordMembers: "Đang cập nhật",
  uptime: "Đang cập nhật",
  features: [
    { number: "01", title: "Sinh tồn cạnh tranh", text: "Tài nguyên có giá trị, thế giới đầy rủi ro và mọi quyết định đều ảnh hưởng đến quá trình phát triển.", icon: "gamepad" as const, tone: "lava" },
    { number: "02", title: "Kinh tế người chơi", text: "Mua bán, đấu giá, giao dịch và xây dựng nguồn thu nhập của riêng bạn.", icon: "database" as const, tone: "gold" },
    { number: "03", title: "PvP & săn tiền thưởng", text: "Đối đầu với người chơi khác, truy tìm mục tiêu và ghi tên mình lên bảng xếp hạng.", icon: "shield" as const, tone: "blood" },
    { number: "04", title: "Base & lãnh thổ", text: "Xây dựng căn cứ, bảo vệ tài sản và phát triển thành trì cùng đồng đội.", icon: "server" as const, tone: "stone" },
    { number: "05", title: "Bang hội & liên minh", text: "Thành lập đội nhóm, hợp tác, tuyên chiến hoặc thống trị toàn bộ server.", icon: "workflow" as const, tone: "ember" },
    { number: "06", title: "Sự kiện & mùa giải", text: "Boss, giải đấu, nhiệm vụ cộng đồng và phần thưởng giới hạn thay đổi mỗi mùa.", icon: "rocket" as const, tone: "gold" },
    { number: "07", title: "Chống gian lận", text: "Hệ thống bảo vệ công bằng, hạn chế hack, exploit và hành vi phá hoại trải nghiệm.", icon: "shield" as const, tone: "blood" },
    { number: "08", title: "Tối ưu hiệu năng", text: "Server ổn định cho chiến đấu, khám phá và xây dựng với cộng đồng đông đảo.", icon: "cpu" as const, tone: "stone" },
  ],
  gallery: [
    { title: "Spawn Diablo", text: "Nơi mọi hành trình bắt đầu.", className: "spawn" },
    { title: "The Warfront", text: "Không có vùng đất nào thực sự an toàn.", className: "warfront" },
    { title: "Black Market", text: "Giao dịch làm nên quyền lực.", className: "market" },
    { title: "Guild Citadel", text: "Xây dựng đế chế của riêng bạn.", className: "citadel" },
  ],
  rankings: {
    wealth: [
      ["LORD_KAEL", "$12.8M", "01"],
      ["NETHERFOX", "$10.4M", "02"],
      ["VEXARIA", "$8.9M", "03"],
      ["AshWalker", "$7.1M", "04"],
      ["Moriarty", "$6.8M", "05"],
    ],
    pvp: [
      ["NETHERFOX", "1,284 kills", "01"],
      ["LORD_KAEL", "1,106 kills", "02"],
      ["AshWalker", "987 kills", "03"],
      ["VEXARIA", "812 kills", "04"],
      ["RAVEN_13", "790 kills", "05"],
    ],
    playtime: [
      ["Moriarty", "18d 04h", "01"],
      ["LORD_KAEL", "16d 21h", "02"],
      ["VEXARIA", "14d 08h", "03"],
      ["NETHERFOX", "12d 16h", "04"],
      ["AshWalker", "11d 03h", "05"],
    ],
  },
  news: [
    { tag: "SEASON 01", date: "12.06.2026", title: "Cánh cổng DiabloSMP đã mở", text: "Season đầu tiên bắt đầu. Tân binh đã sẵn sàng viết nên lịch sử của họ." },
    { tag: "EVENT", date: "08.06.2026", title: "Sự kiện Blood Moon sắp diễn ra", text: "Một đêm đặc biệt, phần thưởng giới hạn và những cuộc săn không khoan nhượng." },
    { tag: "UPDATE", date: "02.06.2026", title: "Bản cập nhật kinh tế 1.1", text: "Hệ thống đấu giá được nâng cấp cùng nhiều vật phẩm mới cho chợ đen." },
  ],
  faqs: [
    ["DiabloSMP hỗ trợ phiên bản nào?", "Server hỗ trợ Minecraft Java Edition từ phiên bản 1.21 trở lên. Hãy dùng phiên bản được ghi trên status bar để có trải nghiệm ổn định nhất."],
    ["Server có hỗ trợ Bedrock không?", "Bedrock sẽ được hỗ trợ khi hệ thống proxy được bật. Địa chỉ và port Bedrock sẽ được cập nhật tại đây khi tính năng sẵn sàng."],
    ["Làm thế nào để tham gia?", "Mở Minecraft Java Edition, chọn Multiplayer, thêm địa chỉ play.diablosmp.com rồi kết nối. Bạn có thể tham gia Discord để nhận hướng dẫn mới nhất."],
    ["Server có pay-to-win không?", "Không. Cửa hàng tập trung vào cosmetic và đặc quyền tiện ích, không bán lợi thế phá vỡ sự công bằng gameplay."],
    ["Có được raid base người chơi khác không?", "Raid và PvP tuân theo quy định từng khu vực, sự kiện và mùa giải. Đọc rules trước khi tấn công để tránh bị xử phạt."],
    ["Làm thế nào để báo cáo hacker?", "Gửi bằng chứng qua kênh hỗ trợ trên Discord. Vui lòng kèm tên người chơi, thời gian, hành vi và video hoặc ảnh nếu có."],
  ],
} as const;

export type ServerGameConfig = typeof serverGameConfig;
export type ServerGameStatus = { online: boolean; playersOnline: number | null; playersMax: number | null; version: string | null; motd: string | null };
export type ServerGameFeature = (typeof serverGameConfig.features)[number];
export type ServerGameRankingKey = keyof typeof serverGameConfig.rankings;
