export const unknownValue = "Chưa cập nhật";

export const businessConfig = {
  supportHours: "24/7",
  supportChannel: unknownValue,
  warrantyResponseTime: unknownValue,
  technicalInspectionTime: unknownValue,
  maxResolutionTime: unknownValue,
  refundProcessingTime: unknownValue,
  refundWindowHours: 48 as number | null,
  deliveryTime: unknownValue,
  paymentMethods: ["Bank(VND)", "Paypal", "Visa"] as string[],
  lastPolicyUpdate: "29/07/2026",
  infrastructure: {
    cpuModel: "AMD EPYC 7571",
    vcpuType: unknownValue,
    portSpeed: "1 Gbps",
    monthlyTraffic: unknownValue,
    datacenter: unknownValue,
    ddosProtection: "Anti-DDoS cơ bản",
    supportedOperatingSystems: unknownValue,
    backupPolicy: unknownValue,
    fairUsePolicy: unknownValue,
  },
} as const;

export function configuredValue(value: string | number | null) {
  return value === null || value === "" ? unknownValue : String(value);
}
