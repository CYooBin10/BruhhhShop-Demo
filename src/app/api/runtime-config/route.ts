import { NextResponse } from "next/server";
import { getRuntimeConfigUpdate } from "@/config/runtime";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const result = await getRuntimeConfigUpdate();
  return NextResponse.json({ config: result.config }, { headers: { "Cache-Control": "no-store" } });
}
