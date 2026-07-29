import type { Plan } from "@/types/site";

export const plans: Plan[] = [
  {
    id: "bruh-vps-4-8",
    name: "Bruh VPS 4-8",
    cpu: "4 vCPU",
    ram: "8 GB",
    bandwidth: "1 Gbps",
    storage: "120 GB NVMe",
    price: "160.000đ",
    period: "mỗi tháng",
    status: "Còn hàng",
  },
  {
    id: "bruh-vps-8-16",
    name: "Bruh VPS 8-16",
    cpu: "8 vCPU",
    ram: "16 GB",
    bandwidth: "1 Gbps",
    storage: "120 GB NVMe",
    price: "360.000đ",
    period: "mỗi tháng",
    status: "Còn hàng",
    popular: true,
  },
];
