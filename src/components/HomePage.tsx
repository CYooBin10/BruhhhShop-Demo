import { Footer } from "@/components/layout/Footer";
import { SideAds } from "@/components/SideAds";
import { PricingSection } from "@/components/pricing/PricingSection";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { Advantages } from "@/components/sections/Advantages";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { PolicySummaries } from "@/components/sections/PolicySummaries";
import { UseCases } from "@/components/sections/UseCases";

export function HomePage() {
  return <><a className="skip-link" href="#main-content">Chuyển đến nội dung</a><SiteNavbar /><main id="main-content"><Hero /><PricingSection /><UseCases /><Advantages /><PolicySummaries /><Contact /></main><SideAds /><Footer /></>;
}
