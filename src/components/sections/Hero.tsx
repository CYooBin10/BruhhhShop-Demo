import { HeroWebAds } from "@/components/HeroWebAds";
import { PurchaseLogs } from "@/components/PurchaseLogs";
import { getWebAdImages } from "@/lib/web-ads";

export async function Hero() {
  const webAdImages = await getWebAdImages();
  return <section className="hero section" id="trang-chu"><div className="container hero-dashboard"><div className="hero-ads-panel"><HeroWebAds images={webAdImages} /></div><PurchaseLogs /></div></section>;
}
