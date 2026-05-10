import { useState, useEffect } from "react";
import { DEFAULT_TECH_CATEGORIES, type TechCategory } from "@/lib/defaultTechData";

const STORAGE_KEY = "portfolio_techstack_v1";
const EVENT_NAME = "techStackUpdated";

function loadFromStorage(): TechCategory[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as TechCategory[];
  } catch {}
  return DEFAULT_TECH_CATEGORIES;
}

export function useTechStack() {
  const [categories, setCategories] = useState<TechCategory[]>(loadFromStorage);

  useEffect(() => {
    const handler = () => setCategories(loadFromStorage());
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, []);

  const saveCategories = (updated: TechCategory[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setCategories(updated);
    window.dispatchEvent(new Event(EVENT_NAME));
  };

  return { categories, saveCategories };
}
