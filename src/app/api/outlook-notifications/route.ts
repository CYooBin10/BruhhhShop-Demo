import { NextResponse } from "next/server";

const DISCORD_API = "https://discord.com/api/v10";
const DISCORD_CHANNEL_ID = "1532425269514604714";

type OutlookNotification = {
  from?: unknown;
  subject?: unknown;
  receivedDateTime?: unknown;
  webLink?: unknown;
};

function cleanText(value: unknown, limit: number) {
  return typeof value === "string" ? value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim().slice(0, limit) : "";
}

function getSender(value: unknown) {
  if (typeof value === "string") return cleanText(value, 200);
  if (!value || typeof value !== "object") return "Không rõ người gửi";
  const sender = value as { name?: unknown; address?: unknown; emailAddress?: { name?: unknown; address?: unknown } };
  const emailAddress = sender.emailAddress ?? sender;
  const name = cleanText(emailAddress.name, 100);
  const address = cleanText(emailAddress.address, 150);
  return name && address ? `${name} <${address}>` : name || address || "Không rõ người gửi";
}

function getHttpsUrl(value: unknown) {
  try {
    const url = new URL(cleanText(value, 2000));
    return url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

export async function POST(request: Request) {
  const expectedSecret = process.env.OUTLOOK_DISCORD_WEBHOOK_SECRET;
  const botToken = process.env.DISCORD_CONFIG_BOT_TOKEN;
  const requestSecret = request.headers.get("x-outlook-webhook-secret");

  if (!expectedSecret || requestSecret !== expectedSecret) {
    return NextResponse.json({ error: "Không có quyền truy cập." }, { status: 401 });
  }
  if (!botToken) {
    return NextResponse.json({ error: "Discord bot chưa được cấu hình." }, { status: 503 });
  }

  let payload: OutlookNotification;
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Payload không hợp lệ." }, { status: 400 });
    }
    payload = body as OutlookNotification;
  } catch {
    return NextResponse.json({ error: "Payload không phải JSON hợp lệ." }, { status: 400 });
  }

  const subject = cleanText(payload.subject, 256) || "(Không có tiêu đề)";
  const sender = getSender(payload.from);
  const receivedAt = cleanText(payload.receivedDateTime, 100);
  const webLink = getHttpsUrl(payload.webLink);
  const fields = [
    { name: "Người gửi", value: sender, inline: false },
    ...(receivedAt ? [{ name: "Thời gian", value: receivedAt, inline: true }] : []),
  ];

  const response = await fetch(`${DISCORD_API}/channels/${DISCORD_CHANNEL_ID}/messages`, {
    method: "POST",
    headers: { Authorization: `Bot ${botToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: `Mail mới: ${subject}`,
        url: webLink,
        color: 3447003,
        fields,
      }],
      allowed_mentions: { parse: [] },
    }),
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) return NextResponse.json({ error: "Discord không nhận được thông báo." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
