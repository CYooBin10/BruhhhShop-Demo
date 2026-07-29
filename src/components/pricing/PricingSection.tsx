"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Pricing } from "@/components/pricing/Pricing";
import { plans } from "@/data/plans";
import type { Plan } from "@/types/site";

const OrderModal = dynamic(() => import("@/components/order/OrderModal").then((module) => module.OrderModal), { ssr: false });

export function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  return <><Pricing plans={plans} onOrder={setSelectedPlan} />{selectedPlan ? <OrderModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} /> : null}</>;
}
