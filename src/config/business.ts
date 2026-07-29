export const unknownValue = "Chưa công bố";

export const businessConfig = {
  supportHours: unknownValue,
  warrantyResponseTime: unknownValue,
  maxResolutionTime: unknownValue,
  refundWindowHours: null as number | null,
  deliveryTime: unknownValue,
  paymentMethods: [] as string[],
  lastPolicyUpdate: "29/07/2026",
  infrastructure: {
    cpuModel: "AMD EPYC 7571",
    vcpuType: unknownValue,
    portSpeed: "Tối đa 1 Gbps",
    monthlyTraffic: unknownValue,
    datacenter: unknownValue,
    ddosProtection: unknownValue,
    supportedOperatingSystems: unknownValue,
    backupPolicy: unknownValue,
    fairUsePolicy: unknownValue,
  },
} as const;

export function configuredValue(value: string | number | null) {
  return value === null || value === "" ? unknownValue : String(value);
}
