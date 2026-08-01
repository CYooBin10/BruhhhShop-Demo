import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/discord";

const REQUEST_TYPES = [
  "Mua dịch vụ mới",
  "Sửa đổi cấu hình",
  "Nâng cấp – gia hạn",
  "Hỗ trợ kỹ thuật – sửa chữa",
  "Bảo hành – hoàn tiền",
  "Khiếu nại",
  "Khác",
] as const;

const PURPOSES = [
  "Server Minecraft",
  "Website / API",
  "Bot Discord",
  "Ứng dụng chạy 24/7",
  "Lưu trữ dữ liệu",
  "Khác",
] as const;

const PLANS = [
  "VPS 1-1",
  "VPS 1-2",
  "VPS 2-2",
  "VPS 2-4",
  "VPS 2-8",
  "VPS 4-8",
  "VPS 8-16",
  "VPS 16-32",
  "Chưa xác định",
] as const;

const DURATIONS = ["Dưới 1 tháng", "1 – 3 tháng", "Trên 3 tháng", "Chưa rõ"] as const;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const sendHistory = new Map<string, number[]>();

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().replace(/\s+/g, " ");
  return trimmed && trimmed.length <= maxLength ? trimmed : null;
}

function optionValue(value: unknown, options: readonly string[]) {
  const text = cleanText(value, 80);
  return text && options.includes(text) ? text : null;
}

function remainingSends(userId: string) {
  const now = Date.now();
  const history = (sendHistory.get(userId) ?? []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  sendHistory.set(userId, history);
  return Math.max(0, RATE_LIMIT_MAX - history.length);
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return NextResponse.json({ error: "Đăng nhập chưa được cấu hình." }, { status: 500 });

  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return NextResponse.json({ error: "Vui lòng đăng nhập trước khi gửi yêu cầu." }, { status: 401 });

  const auth = createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: { user }, error: authError } = await auth.auth.getUser(token);
  if (authError || !user?.email) return NextResponse.json({ error: "Phiên đăng nhập không hợp lệ, vui lòng đăng nhập lại." }, { status: 401 });

  const remaining = remainingSends(user.id);
  if (remaining === 0) return NextResponse.json({ error: "Bạn đã gửi tối đa 5 yêu cầu trong 1 giờ. Vui lòng thử lại sau." }, { status: 429 });

  const payload = await request.json().catch(() => null);
  if (!payload || typeof payload !== "object") return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });

  const record = payload as Record<string, unknown>;
  const name = cleanText(record.name, 100);
  const requestType = optionValue(record.requestType, REQUEST_TYPES);
  const purpose = optionValue(record.purpose, PURPOSES);
  const plan = optionValue(record.plan, PLANS) ?? "Chưa xác định";
  const duration = optionValue(record.duration, DURATIONS);
  const message = typeof record.message === "string" ? record.message.trim().replace(/\s+/g, " ").slice(0, 2000) : "";
  if (!name || !requestType || !purpose || !duration) return NextResponse.json({ error: "Vui lòng điền đầy đủ thông tin bắt buộc." }, { status: 400 });

  const result = await sendContactNotification({
    senderName: typeof user.user_metadata.username === "string" && user.user_metadata.username.trim() ? user.user_metadata.username.trim().slice(0, 80) : "Không có username",
    senderEmail: user.email,
    senderId: user.id,
    name,
    requestType,
    purpose,
    plan,
    duration,
    message,
  });
  if (!result.ok) return NextResponse.json({ error: "Không gửi được thông báo, vui lòng thử lại sau." }, { status: result.error === "rate_limited" ? 429 : 502 });

  sendHistory.set(user.id, [...(sendHistory.get(user.id) ?? []).filter((timestamp) => Date.now() - timestamp < RATE_LIMIT_WINDOW_MS), Date.now()]);
  return NextResponse.json({ ok: true });
}
