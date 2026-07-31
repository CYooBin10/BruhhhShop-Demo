import "server-only";

import { readdir } from "node:fs/promises";
import { join } from "node:path";

const webAdsDirectory = join(process.cwd(), "public", "assets", "image", "web_ads");
const numberedImagePattern = /^(\d+)\.(avif|gif|jpe?g|png|webp)$/i;

export async function getWebAdImages() {
  try {
    const filenames = await readdir(webAdsDirectory);
    return filenames
      .flatMap((filename) => {
        const match = filename.match(numberedImagePattern);
        return match ? [{ filename, order: Number(match[1]) }] : [];
      })
      .sort((left, right) => left.order - right.order)
      .map(({ filename }) => `/assets/image/web_ads/${encodeURIComponent(filename)}`);
  } catch {
    return [];
  }
}
