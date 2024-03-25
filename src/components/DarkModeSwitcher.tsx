import React from "react";
import LightModeIcon from "./icon/LightModeIcon";
import DarkModeIcon from "./icon/DarkModeIcon";
import { useThemeContext } from "@/contexts/ThemeContext";

function DarkModeSwitcher() {
  const { handleChangeTheme, currentTheme } = useThemeContext();

  return (
    <div
      className="flex items-center cursor-pointer rounded-md shadow-mobileButton dark:bg-bgDarkSecondary w-10 h-10"
      onClick={handleChangeTheme}
    >
      {currentTheme === "dark" ? <DarkModeIcon className="w-10 h-6" /> : <LightModeIcon className="w-10 h-6" />}
    </div>
  );
}

export default DarkModeSwitcher;
