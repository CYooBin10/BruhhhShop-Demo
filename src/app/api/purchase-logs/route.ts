import { NextResponse } from "next/server";
import { getPurchaseLogs } from "@/lib/discord";

export async function GET() {
  return NextResponse.json({ items: await getPurchaseLogs() }, { headers: { "Cache-Control": "no-store" } });
}
