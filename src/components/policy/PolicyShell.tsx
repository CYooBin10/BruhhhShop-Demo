"use client";

import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

type PolicyShellProps = {
  children: React.ReactNode;
};

export function PolicyShell({ children }: PolicyShellProps) {
  const [authMode, setAuthMode] = useState<"login" | "register" | null>(null);
  return <><Navbar onAuth={setAuthMode} />{children}<Footer /><AuthModal mode={authMode} onClose={() => setAuthMode(null)} onModeChange={setAuthMode} /></>;
}
