"use client";

import { useEffect, useState } from "react";
import {
  FaMoon,
  FaSun,
} from "react-icons/fa6";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("loudoga-theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }

    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !dark;

    setDark(nextTheme);

    if (nextTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("loudoga-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("loudoga-theme", "light");
    }
  };

  if (!mounted) {
    return (
      <div className="h-8 w-8" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        dark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      title={
        dark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      className="
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-full
        text-white
        transition
        hover:bg-white/10
        hover:text-[#C8102E]
      "
    >
      {dark ? (
        <FaSun className="text-sm" />
      ) : (
        <FaMoon className="text-sm" />
      )}
    </button>
  );
}