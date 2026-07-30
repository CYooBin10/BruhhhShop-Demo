import "server-only";

const DISCORD_API = "https://discord.com/api/v10";
const DISCORD_CHANNEL_ID = "1532223030581924021";
const DISCORD_CDN_HOSTS = new Set(["cdn.discordapp.com", "media.discordapp.net"]);

export type LegitTickerItem = {
  id: string;
  author: string;
  content: string;
  imageUrl: string | null;
  avatarUrl: string | null;
};

function cleanText(value: unknown, limit: number) {
  return typeof value === "string" ? value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").replace(/\s+/g, " ").trim().slice(0, limit) : "";
}

function safeImageUrl(value: unknown) {
  try {
    const url = new URL(String(value));
    return url.protocol === "https:" && DISCORD_CDN_HOSTS.has(url.hostname) ? url.toString() : null;
  } catch {
    return null;
  }
}

function isImage(filename: string, contentType: string) {
  return contentType.startsWith("image/") || /\.(avif|gif|jpe?g|png|webp)$/i.test(filename);
}

export async function getLegitTicker(limit = 16): Promise<LegitTickerItem[]> {
  const token = process.env.DISCORD_BOT_TOKEN;
  if (!token) return [];

  try {
    const response = await fetch(`${DISCORD_API}/channels/${DISCORD_CHANNEL_ID}/messages?limit=${Math.min(Math.max(limit, 1), 24)}`, {
      headers: { Authorization: `Bot ${token}`, Accept: "application/json" },
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return [];

    const messages: unknown = await response.json();
    if (!Array.isArray(messages)) return [];

    return messages.flatMap((message): LegitTickerItem[] => {
      if (!message || typeof message !== "object") return [];
      const raw = message as { id?: unknown; content?: unknown; author?: { id?: unknown; username?: unknown; global_name?: unknown; avatar?: unknown }; attachments?: Array<{ url?: unknown; filename?: unknown; content_type?: unknown }>; embeds?: Array<{ title?: unknown; description?: unknown; image?: { url?: unknown }; thumbnail?: { url?: unknown } }> };
      const id = cleanText(raw.id, 100);
      const author = cleanText(raw.author?.global_name, 100) || cleanText(raw.author?.username, 100);
      const avatarHash = cleanText(raw.author?.avatar, 200);
      const avatarUrl = raw.author?.id && avatarHash ? safeImageUrl(`https://cdn.discordapp.com/avatars/${raw.author.id}/${avatarHash}.png`) : null;
      const text = cleanText(raw.content, 220) || cleanText(raw.embeds?.find((embed) => embed.description)?.description, 220) || cleanText(raw.embeds?.find((embed) => embed.title)?.title, 220);
      const attachment = raw.attachments?.find((item) => isImage(cleanText(item.filename, 255), cleanText(item.content_type, 100)));
      const imageUrl = safeImageUrl(attachment?.url) || safeImageUrl(raw.embeds?.find((embed) => embed.image?.url)?.image?.url) || safeImageUrl(raw.embeds?.find((embed) => embed.thumbnail?.url)?.thumbnail?.url);
      const content = text || (imageUrl ? "Đã gửi đánh giá kèm ảnh" : "");
      return id && author && content ? [{ id, author, content, imageUrl, avatarUrl }] : [];
    });
  } catch {
    return [];
  }
}
