import { businessConfig } from "@/config/business";
import type { Plan, ServiceDetail } from "@/types/site";

function createServiceDetails(vcpu: string, ram: string): ServiceDetail[] {
  return [
    { label: "CPU model", value: businessConfig.infrastructure.cpuModel },
    { label: "Số vCPU", value: vcpu },
    { label: "Loại vCPU", value: businessConfig.infrastructure.vcpuType },
    { label: "RAM", value: ram },
    { label: "Ổ đĩa", value: "120 GB NVMe" },
    { label: "Vị trí datacenter", value: businessConfig.infrastructure.datacenter },
    { label: "Cổng mạng", value: businessConfig.infrastructure.portSpeed },
    { label: "Traffic hàng tháng", value: businessConfig.infrastructure.monthlyTraffic },
    { label: "Chống DDoS", value: businessConfig.infrastructure.ddosProtection },
    { label: "Hệ điều hành hỗ trợ", value: businessConfig.infrastructure.supportedOperatingSystems },
    { label: "Thời gian bàn giao", value: businessConfig.deliveryTime },
    { label: "Thời gian hỗ trợ", value: businessConfig.supportHours },
    { label: "Chính sách backup", value: businessConfig.infrastructure.backupPolicy },
  ];
}

export const plans: Plan[] = [
  {
    id: "bruh-vps-4-8",
    name: "Bruh VPS 4-8",
    cpu: "4 vCPU",
    ram: "8 GB",
    portSpeed: "Tối đa 1 Gbps",
    storage: "120 GB NVMe",
    price: "160.000đ",
    period: "mỗi tháng",
    status: "Còn hàng",
    serviceDetails: createServiceDetails("4 vCPU", "8 GB"),
  },
  {
    id: "bruh-vps-8-16",
    name: "Bruh VPS 8-16",
    cpu: "8 vCPU",
    ram: "16 GB",
    portSpeed: "Tối đa 1 Gbps",
    storage: "120 GB NVMe",
    price: "360.000đ",
    period: "mỗi tháng",
    status: "Còn hàng",
    serviceDetails: createServiceDetails("8 vCPU", "16 GB"),
    popular: true,
  },
];
