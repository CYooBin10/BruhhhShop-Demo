import type { Metadata } from "next";
import { serverGameConfig, type ServerGameStatus } from "@/config/server-game";
import { ServerGameClient } from "./ServerGameClient";

export const metadata: Metadata = {
  title: "DiabloSMP — Minecraft Survival Server",
  description: "Sinh tồn. Chiến đấu. Thống trị. Tham gia thế giới Minecraft Survival của DiabloSMP.",
};

function textValue(value: unknown) {
  if (typeof value === "string") return value.trim() || null;
  if (Array.isArray(value)) {
    const text = value.filter((item): item is string => typeof item === "string").join(" ").trim();
    return text || null;
  }
  return null;
}

function numberValue(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

async function getServerStatus(): Promise<ServerGameStatus> {
  try {
    const response = await fetch(serverGameConfig.statusApiUrl, { next: { revalidate: 60 }, signal: AbortSignal.timeout(5000) });
    if (!response.ok) throw new Error(`Minecraft status API returned ${response.status}`);
    const payload: unknown = await response.json();
    if (!payload || typeof payload !== "object") throw new Error("Minecraft status API returned invalid JSON");
    const data = payload as { online?: unknown; players?: { online?: unknown; max?: unknown }; version?: unknown; motd?: { clean?: unknown; raw?: unknown } };
    return { online: data.online === true, playersOnline: numberValue(data.players?.online), playersMax: numberValue(data.players?.max), version: textValue(data.version), motd: textValue(data.motd?.clean) ?? textValue(data.motd?.raw) };
  } catch {
    return { online: false, playersOnline: null, playersMax: null, version: null, motd: null };
  }
}

export default async function ServerGamePage() {
  const status = await getServerStatus();
  return <ServerGameClient status={status} />;
}
