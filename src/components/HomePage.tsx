"use client";

import { useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { OrderModal } from "@/components/order/OrderModal";
import { Pricing } from "@/components/pricing/Pricing";
import { Advantages } from "@/components/sections/Advantages";
import { Commitment } from "@/components/sections/Commitment";
import { Cta } from "@/components/sections/Cta";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Transparency } from "@/components/sections/Transparency";
import { UseCases } from "@/components/sections/UseCases";
import { plans } from "@/data/plans";
import type { Plan } from "@/types/site";

export function HomePage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  return (
    <>
      <a className="skip-link" href="#main-content">Chuyển đến nội dung</a>
      <Navbar onOrder={() => setSelectedPlan(plans[1])} />
      <main id="main-content"><Hero /><Pricing plans={plans} onOrder={setSelectedPlan} /><UseCases /><Advantages /><Commitment /><Transparency /><Process /><Faq /><Cta onOrder={() => setSelectedPlan(plans[1])} /></main>
      <Footer />
      <OrderModal key={selectedPlan?.id ?? "closed"} plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
    </>
  );
}
