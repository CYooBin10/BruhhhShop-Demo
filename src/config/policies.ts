export const policyLinks = [
  { slug: "dieu-khoan-dich-vu", label: "Điều khoản dịch vụ" },
  { slug: "bao-hanh-hoan-tien", label: "Chính sách bảo hành và hoàn tiền" },
  { slug: "quyen-rieng-tu", label: "Chính sách quyền riêng tư" },
  { slug: "thanh-toan-ban-giao", label: "Chính sách thanh toán và bàn giao VPS" },
  { slug: "su-dung-tai-nguyen", label: "Quy định sử dụng tài nguyên" },
] as const;

export type PolicySlug = (typeof policyLinks)[number]["slug"];

export const policyUrls = {
  terms: "/chinh-sach/dieu-khoan-dich-vu",
  refund: "/chinh-sach/bao-hanh-hoan-tien",
  privacy: "/chinh-sach/quyen-rieng-tu",
  payment: "/chinh-sach/thanh-toan-ban-giao",
  resources: "/chinh-sach/su-dung-tai-nguyen",
} as const;
