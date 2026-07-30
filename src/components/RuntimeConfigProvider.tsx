"use client";

import { createContext, useContext } from "react";
import type { RuntimeConfig } from "@/types/site";

const RuntimeConfigContext = createContext<RuntimeConfig | null>(null);

export function RuntimeConfigProvider({ children, config }: { children: React.ReactNode; config: RuntimeConfig }) {
  return <RuntimeConfigContext.Provider value={config}>{children}</RuntimeConfigContext.Provider>;
}

export function useRuntimeConfig() {
  const config = useContext(RuntimeConfigContext);
  if (!config) throw new Error("RuntimeConfigProvider is missing.");
  return config;
}
