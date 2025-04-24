import React from 'react';
import { Bell, User, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-blue-700 mr-4">
            What If Insights Engine
          </h1>
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              {user?.organization}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <button 
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 relative"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="flex items-center">
            <div className="hidden md:block text-right mr-3">
              <p className="text-sm font-medium text-gray-700">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role.replace('-', ' ')}</p>
            </div>
            <button 
              className="p-1 rounded-full bg-blue-100 text-blue-700"
              onClick={logout}
              aria-label="User menu"
            >
              <User size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;