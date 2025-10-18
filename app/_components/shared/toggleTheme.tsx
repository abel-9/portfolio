"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ToggleTheme() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div
      className="absolute bottom-2 right-2 rounded-full p-1 shadow-md bg-bg-light"
      onClick={() => setIsDarkMode(!isDarkMode)}
    >
      {isDarkMode ? (
        <Moon className="text-text-muted" />
      ) : (
        <Sun className="text-text-muted" />
      )}
    </div>
  );
}
