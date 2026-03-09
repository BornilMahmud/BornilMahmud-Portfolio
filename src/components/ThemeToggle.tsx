import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

type Theme = "dark" | "light";

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <motion.button
      onClick={toggle}
      className="relative w-10 h-10 rounded-md flex items-center justify-center transition-colors duration-300"
      data-testid="button-theme-toggle"
      whileTap={{ scale: 0.9 }}
      style={{
        border: "1px solid hsl(var(--border))",
        background: "hsl(var(--card) / 0.5)",
      }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.25, type: "spring", stiffness: 300, damping: 20 }}
      >
        {theme === "dark" ? (
          <Sun className="w-4 h-4 text-[hsl(var(--primary))]" />
        ) : (
          <Moon className="w-4 h-4 text-[hsl(var(--primary))]" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
