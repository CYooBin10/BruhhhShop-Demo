"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@/components/ui/Icon";

type Theme = "light" | "dark";

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribeToTheme(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getTheme, () => "dark");

  const changeTheme = () => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    window.localStorage.setItem("bruhhh-theme", nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  };

  const nextThemeLabel = theme === "light" ? "Tối" : "Sáng";
  return <button className="theme-toggle" type="button" aria-label={`Chuyển sang giao diện ${nextThemeLabel.toLowerCase()}`} onClick={changeTheme}><Icon name={theme === "light" ? "moon" : "sun"} /></button>;
}
