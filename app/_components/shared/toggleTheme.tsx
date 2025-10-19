"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function ToggleTheme() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const controller = useAnimation();

  useEffect(() => {
    controller.start({
      rotate: isDarkMode ? 360 : 0,
      transition: { duration: 0.7 },
    });

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode, controller]);

  return (
    <motion.div
      animate={controller}
      className="absolute bottom-2 right-2 rounded-full p-1 shadow-md bg-bg-light"
      onClick={() => setIsDarkMode(!isDarkMode)}
    >
      {isDarkMode ? (
        <Moon className="text-text-muted" />
      ) : (
        <Sun className="text-text-muted" />
      )}
    </motion.div>
  );
}
