import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { refreshRuntimeConfig } from "@/config/runtime";

const ADMIN_EMAIL = "tranhuybao000@gmail.com";

export const dynamic = "force-dynamic";

async function authorizeAdmin(request: Request) {
  const authorization = request.headers.get("authorization");
  const accessToken = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!accessToken || !supabaseUrl || !supabaseAnonKey) return { response: NextResponse.json({ error: "Không có quyền truy cập." }, { status: 401 }) };

  const authClient = createClient(supabaseUrl, supabaseAnonKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data, error } = await authClient.auth.getUser(accessToken);
  if (error || !data.user) return { response: NextResponse.json({ error: "Phiên đăng nhập không hợp lệ." }, { status: 401 }) };
  if (data.user.email?.trim().toLowerCase() !== ADMIN_EMAIL) return { response: NextResponse.json({ error: "Tài khoản không có quyền admin." }, { status: 403 }) };

  return { user: data.user };
}

export async function GET(request: Request) {
  const authorization = await authorizeAdmin(request);
  if ("response" in authorization) return authorization.response;
  return NextResponse.json({ email: authorization.user.email });
}

export async function POST(request: Request) {
  const authorization = await authorizeAdmin(request);
  if ("response" in authorization) return authorization.response;

  const result = await refreshRuntimeConfig();
  if (result.source !== "discord") return NextResponse.json({ error: `Không đọc được discord-config.json: ${result.error ?? "UNKNOWN"}. Config cũ vẫn được giữ.` }, { status: 502 });

  return NextResponse.json({ ok: true, message: "Đã reload discord-config.json từ Discord.", loadedAt: new Date().toISOString(), siteName: result.config.site.name });
}
