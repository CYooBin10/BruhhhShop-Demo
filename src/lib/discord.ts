import "server-only";

const DISCORD_API = "https://discord.com/api/v10";
const DISCORD_CHANNEL_ID = "1532223030581924021";

export type LegitTickerItem = {
  id: string;
  author: string;
  content: string;
};

function cleanText(value: unknown, limit: number) {
  return typeof value === "string" ? value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").replace(/\s+/g, " ").trim().slice(0, limit) : "";
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
      const raw = message as { id?: unknown; content?: unknown; author?: { username?: unknown; global_name?: unknown }; embeds?: Array<{ title?: unknown; description?: unknown }> };
      const id = cleanText(raw.id, 100);
      const author = cleanText(raw.author?.global_name, 100) || cleanText(raw.author?.username, 100);
      const content = cleanText(raw.content, 220) || cleanText(raw.embeds?.find((embed) => embed.description)?.description, 220) || cleanText(raw.embeds?.find((embed) => embed.title)?.title, 220);
      return id && author && content ? [{ id, author, content }] : [];
    });
  } catch {
    return [];
  }
}
