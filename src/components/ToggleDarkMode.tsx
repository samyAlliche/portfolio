"use client";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const current = theme === "system" ? systemTheme : theme;

  return (
    <Button
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
      className="absolute top-4 z-[1000] w-full left-0 md:w-auto md:left-auto"
      variant={"ghost"}
      size={"lg"}
    >
      {current === "dark" ? (
        <MoonIcon className="h-10 w-10" />
      ) : (
        <SunIcon className="h-10 w-10" />
      )}
    </Button>
  );
}
