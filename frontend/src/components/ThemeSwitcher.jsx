import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  const isDark = theme === "dark";

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div
      onClick={toggleTheme}
      className="cursor-pointer p-2 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
    >
      {isDark ? (
        <Sun size={20} className="text-yellow-400" /> // Bright Sun in dark mode
      ) : (
        <Moon size={20} className="text-gray-800" />  // Dark Moon in light mode
      )}
    </div>
  );
};

export default ThemeSwitcher;
