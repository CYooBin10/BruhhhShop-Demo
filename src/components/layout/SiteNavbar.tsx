"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";

const AuthModal = dynamic(() => import("@/components/auth/AuthModal").then((module) => module.AuthModal), { ssr: false });

export function SiteNavbar() {
  const [authMode, setAuthMode] = useState<"login" | "register" | null>(null);
  return <><Navbar onAuth={setAuthMode} />{authMode ? <AuthModal mode={authMode} onClose={() => setAuthMode(null)} onModeChange={setAuthMode} /> : null}</>;
}
