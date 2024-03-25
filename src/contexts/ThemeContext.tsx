"use client";
import React, { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from "react";
import { changeSkeletonColor } from "../lib/changeSkeletonColor";

type ContextType = {
  handleChangeTheme: () => void;
  currentTheme: string;
};

const ThemeContext = createContext<ContextType>({
  handleChangeTheme: () => null,
  currentTheme: "",
});

function ThemeProvier({ children }) {
  const [theme, setTheme] = useState("");

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const currentTheme = localStorage.getItem("theme");
      if (currentTheme == "dark" || (!currentTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setTheme("dark");
        changeSkeletonColor("dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        setTheme("light");
        changeSkeletonColor("light");
      }
    }
  }, []);

  const handleChangeTheme = useCallback(() => {
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme == "dark") {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
      setTheme("light");
      changeSkeletonColor("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
      changeSkeletonColor("dark");
    }
  }, []);

  const contextValue = useMemo(() => {
    return {
      handleChangeTheme,
      currentTheme: theme,
    };
  }, [handleChangeTheme, theme]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

const useThemeContext = () => useContext(ThemeContext);

export { ThemeContext, ThemeProvier, useThemeContext };
