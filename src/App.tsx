import { useState, useEffect, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import IntroLoader from "@/components/IntroLoader";

const queryClient = new QueryClient();

const App = () => {
  const isAdminPage = window.location.pathname === "/admin";
  const alreadyPlayed = sessionStorage.getItem("introPlayed") === "true";
  const [introDone, setIntroDone] = useState(isAdminPage || alreadyPlayed);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    let theme: string;
    if (stored) {
      theme = stored;
    } else {
      theme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    if (theme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem("introPlayed", "true");
    setIntroDone(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {!introDone && <IntroLoader onComplete={handleIntroComplete} />}
        <div style={{ visibility: introDone ? "visible" : "hidden" }}>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
