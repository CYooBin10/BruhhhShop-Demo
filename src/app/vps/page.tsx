import type { Metadata } from "next";
import { VpsPage } from "@/components/VpsPage";
import { getRuntimeConfig } from "@/config/runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getRuntimeConfig();
  return { title: `VPS giá từ 59.000đ/tháng | ${site.name}`, description: `Mua VPS NVMe ${site.name} cho website, API, Minecraft và bot chạy 24/7.` };
}

export default function VpsRoute() {
  return <VpsPage />;
}
