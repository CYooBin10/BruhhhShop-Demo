import { Footer } from "@/components/layout/Footer";
import { SideAds } from "@/components/SideAds";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { Hero } from "@/components/sections/Hero";

export function HomePage() {
  return <><a className="skip-link" href="#main-content">Chuyển đến nội dung</a><SiteNavbar /><main id="main-content"><Hero /></main><SideAds /><Footer /></>;
}
