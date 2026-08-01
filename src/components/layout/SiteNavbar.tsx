"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";

const AuthModal = dynamic(() => import("@/components/auth/AuthModal").then((module) => module.AuthModal), { ssr: false });

export function SiteNavbar() {
  const [authMode, setAuthMode] = useState<"login" | "register" | null>(null);
  useEffect(() => {
    const openAuth = () => setAuthMode("login");
    window.addEventListener("bruhhh-open-auth", openAuth);
    return () => window.removeEventListener("bruhhh-open-auth", openAuth);
  }, []);
  return <><Navbar onAuth={setAuthMode} />{authMode ? <AuthModal mode={authMode} onClose={() => setAuthMode(null)} onModeChange={setAuthMode} /> : null}</>;
}
