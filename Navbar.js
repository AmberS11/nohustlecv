// Navbar.js
import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <nav className={`px-6 py-4 shadow-md flex justify-between items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Link href="/">
        <span className="text-xl font-bold cursor-pointer">NoHustleCV</span>
      </Link>

      <div className="flex items-center space-x-4">
        <Link href="/resume"><span className="cursor-pointer hover:underline">Resume Builder</span></Link>
        <Link href="/pricing"><span className="cursor-pointer hover:underline">Pricing</span></Link>
        <Link href="/feedback"><span className="cursor-pointer hover:underline">Feedback</span></Link>
        <button
          onClick={toggleDarkMode}
          className="px-3 py-1 rounded border border-current"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
