"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Kbd } from "@/components/ui/kbd";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const isTyping = () => {
      const el = document.activeElement as HTMLElement | null;
      if (!el) return false;
      const tag = el.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return true;
      if (el.isContentEditable) return true;
      return false;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (isTyping()) return;
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
      if (e.key.toLowerCase() !== "d") return;

      const current = resolvedTheme || theme;
      const active =
        current === "dark" ||
        (current === "system" &&
          typeof window !== "undefined" &&
          window.matchMedia?.("(prefers-color-scheme: dark)").matches);

      setTheme(active ? "light" : "dark");
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [resolvedTheme, theme, setTheme]);

  if (!mounted) return null;

  const current = resolvedTheme || theme;
  const active =
    current === "dark" ||
    (current === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches);

  return (
    <Button
      aria-label="Toggle theme"
      variant="outline"
      size="default"
      onClick={() => setTheme(active ? "light" : "dark")}
      className="flex items-center gap-1 p-2 cursor-pointer bg-background hover:bg-accent rounded-md transition-colors"
    >
      {active ? <Moon size={20} /> : <Sun size={20} />}
      <Kbd className="transition-colors">D</Kbd>
    </Button>
  );
}
