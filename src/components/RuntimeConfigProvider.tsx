"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { RuntimeConfig } from "@/types/site";

const RuntimeConfigContext = createContext<RuntimeConfig | null>(null);

export function RuntimeConfigProvider({ children, config }: { children: React.ReactNode; config: RuntimeConfig }) {
  const [runtimeConfig, setRuntimeConfig] = useState(config);

  useEffect(() => {
    const controller = new AbortController();
    let timer: number;
    const loadConfig = async () => {
      try {
        const response = await fetch("/api/runtime-config", { cache: "no-store", signal: controller.signal });
        const data: { config?: RuntimeConfig | null } = response.ok ? await response.json() : {};
        if (data.config) setRuntimeConfig(data.config);
      } catch {
        // Keep last valid config while Discord is temporarily unavailable.
      } finally {
        if (!controller.signal.aborted) timer = window.setTimeout(() => void loadConfig(), 5000);
      }
    };
    timer = window.setTimeout(() => void loadConfig(), 5000);
    return () => { controller.abort(); window.clearTimeout(timer); };
  }, []);

  return <RuntimeConfigContext.Provider value={runtimeConfig}>{children}</RuntimeConfigContext.Provider>;
}

export function useRuntimeConfig() {
  const config = useContext(RuntimeConfigContext);
  if (!config) throw new Error("RuntimeConfigProvider is missing.");
  return config;
}
