import Image from "next/image";
import { readdir } from "node:fs/promises";
import { PhoneAds } from "@/components/PhoneAds";
import { join } from "node:path";

const adUrl = "https://discord.gg/dur2JmkYG";
const desktopAdImage = "/assets/image/ads/quang_cao_shop_nitro.png";
const phoneAdDirectory = join(process.cwd(), "public", "assets", "image", "ads", "phone");
const imageFilePattern = /\.(avif|gif|jpe?g|png|webp)$/i;

async function getPhoneAdImages() {
  try {
    const filenames = await readdir(phoneAdDirectory);
    return filenames.filter((filename) => imageFilePattern.test(filename)).sort().map((filename) => `/assets/image/ads/phone/${encodeURIComponent(filename)}`);
  } catch {
    return [];
  }
}

export async function SideAds() {
  const phoneAdImages = await getPhoneAdImages();

  return (
    <aside className="side-ads" aria-label="Quảng cáo">
      <div className="side-ads-desktop">
        <a className="side-ad-left" href={adUrl} target="_blank" rel="noreferrer"><Image alt="Nâng cấp Discord Nitro và Server Boost giá siêu rẻ" height={2048} sizes="(min-width: 781px) 340px" src={desktopAdImage} width={1152} /></a>
        <a className="side-ad-right" href={adUrl} target="_blank" rel="noreferrer"><Image alt="Nâng cấp Discord Nitro và Server Boost giá siêu rẻ" height={2048} sizes="(min-width: 781px) 340px" src={desktopAdImage} width={1152} /></a>
      </div>
      <PhoneAds adUrl={adUrl} images={phoneAdImages} />
    </aside>
  );
}
