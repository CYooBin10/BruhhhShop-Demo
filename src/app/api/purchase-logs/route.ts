import { NextResponse } from "next/server";
import { getPurchaseLogs } from "@/lib/discord";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  return NextResponse.json({ items: await getPurchaseLogs() }, { headers: { "Cache-Control": "no-store, no-cache, must-revalidate", Pragma: "no-cache", Expires: "0" } });
}
