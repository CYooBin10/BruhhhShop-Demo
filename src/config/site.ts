export const siteConfig = {
  name: "Bruhhh Cloud",
  productName: "Bruh VPS",
  title: "Bruhhh Cloud – Bruh VPS giá rẻ",
  description:
    "Bruhhh Cloud cung cấp các gói Bruh VPS giá hợp lý, cấu hình rõ ràng, sản phẩm chất lượng và có bảo hành.",
  notifications: [
    { id: "welcome", title: "Thông báo", message: "Theo dõi Bruhhh Cloud để nhận cập nhật VPS và chương trình mới." },
  ],
  contact: {
    facebookUrl: "https://www.facebook.com/huyy.bao.375595",
    discordUrl: "https://discord.gg/jhsJHVVqB",
    phone: "0876334442",
    email: "toimecode@hotmail.com",
  },
  legal: {
    termsUrl: "/chinh-sach/dieu-khoan-dich-vu",
    warrantyUrl: "/chinh-sach/bao-hanh-hoan-tien",
    privacyUrl: "/chinh-sach/quyen-rieng-tu",
    paymentUrl: "/chinh-sach/thanh-toan-ban-giao",
    resourceUrl: "/chinh-sach/su-dung-tai-nguyen",
  },
} as const;

export const navigation = [
  { label: "Trang chủ", href: "#trang-chu" },
  { label: "Bảng giá", href: "#bang-gia" },
  { label: "Chính sách", href: "/chinh-sach" },
  { label: "Liên hệ", href: "#lien-he" },
] as const;
