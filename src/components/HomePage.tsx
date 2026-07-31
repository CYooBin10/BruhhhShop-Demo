import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { PricingSection } from "@/components/pricing/PricingSection";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { Advantages } from "@/components/sections/Advantages";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { PolicySummaries } from "@/components/sections/PolicySummaries";
import { UseCases } from "@/components/sections/UseCases";

export function HomePage() {
  return <><a className="skip-link" href="#main-content">Chuyển đến nội dung</a><SiteNavbar /><main id="main-content"><Hero /><PricingSection /><UseCases /><Advantages /><PolicySummaries /><Contact /></main><aside className="side-ads" aria-label="Quảng cáo"><a href="https://discord.gg/dur2JmkYG" target="_blank" rel="noreferrer"><Image alt="Nâng cấp Discord Nitro và Server Boost giá siêu rẻ" height={2048} sizes="(min-width: 1500px) 340px, 0px" src="/assets/image/ads/quang_cao_shop_nitro.png" width={1152} /></a><a href="https://discord.gg/dur2JmkYG" target="_blank" rel="noreferrer"><Image alt="Nâng cấp Discord Nitro và Server Boost giá siêu rẻ" height={2048} sizes="(min-width: 1500px) 340px, 0px" src="/assets/image/ads/quang_cao_shop_nitro.png" width={1152} /></a></aside><Footer /></>;
}
