"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const savedTheme = window.localStorage.getItem("bruhhh-theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const changeTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    window.localStorage.setItem("bruhhh-theme", nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  };

  const nextThemeLabel = theme === "light" ? "Tối" : "Sáng";
  return <button suppressHydrationWarning className="theme-toggle" type="button" aria-label={`Chuyển sang giao diện ${nextThemeLabel.toLowerCase()}`} onClick={changeTheme}><Icon name={theme === "light" ? "moon" : "sun"} /></button>;
}
