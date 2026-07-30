import { NextResponse } from "next/server";
import { getLegitTicker } from "@/lib/discord";

export async function GET() {
  return NextResponse.json({ items: await getLegitTicker() }, { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" } });
}
