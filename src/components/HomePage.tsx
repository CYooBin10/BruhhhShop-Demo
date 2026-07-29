"use client";

import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { OrderModal } from "@/components/order/OrderModal";
import { Pricing } from "@/components/pricing/Pricing";
import { Advantages } from "@/components/sections/Advantages";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { PolicySummaries } from "@/components/sections/PolicySummaries";
import { UseCases } from "@/components/sections/UseCases";
import { plans } from "@/data/plans";
import type { Plan } from "@/types/site";

export function HomePage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "register" | null>(null);
  return <><a className="skip-link" href="#main-content">Chuyển đến nội dung</a><Navbar onAuth={setAuthMode} /><main id="main-content"><Hero /><Pricing plans={plans} onOrder={setSelectedPlan} /><UseCases /><Advantages /><PolicySummaries /><Contact /></main><Footer /><OrderModal key={selectedPlan?.id ?? "closed"} plan={selectedPlan} onClose={() => setSelectedPlan(null)} /><AuthModal mode={authMode} onClose={() => setAuthMode(null)} onModeChange={setAuthMode} /></>;
}
