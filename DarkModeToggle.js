// DarkModeToggle.js
import { useContext, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-sm border rounded focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {darkMode ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

export default DarkModeToggle;
