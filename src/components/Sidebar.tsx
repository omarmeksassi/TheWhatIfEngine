import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileInput, 
  BarChart2, 
  FileText, 
  Settings, 
  Menu, 
  X,
  Wifi,
  WifiOff 
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  
  // Toggle offline status for demo purposes
  const toggleOfflineStatus = () => {
    setIsOffline(!isOffline);
  };

  return (
    <>
      {/* Mobile sidebar toggle */}
      <button
        className="md:hidden fixed z-20 bottom-4 right-4 p-3 rounded-full bg-blue-600 text-white shadow-lg"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Sidebar */}
      <aside 
        className={`bg-gray-800 text-white w-64 flex-shrink-0 flex flex-col z-10 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'hidden' : 'fixed inset-y-0 left-0 md:relative md:translate-x-0'
        }`}
      >
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart2 className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold">Insights Engine</span>
          </div>
          <button 
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsCollapsed(true)}
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Network status indicator */}
        <div 
          className={`mx-4 my-3 px-3 py-2 rounded-md flex items-center text-sm ${
            isOffline ? 'bg-orange-900/30 text-orange-300' : 'bg-green-900/30 text-green-300'
          }`}
          onClick={toggleOfflineStatus}
        >
          {isOffline ? (
            <>
              <WifiOff size={16} className="mr-2" />
              <span>Offline Mode</span>
            </>
          ) : (
            <>
              <Wifi size={16} className="mr-2" />
              <span>Connected</span>
            </>
          )}
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => 
              `flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                isActive 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </NavLink>
          
          <NavLink 
            to="/data-collection" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                isActive 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <FileInput className="mr-3 h-5 w-5" />
            Data Collection
          </NavLink>
          
          <NavLink 
            to="/analysis" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                isActive 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <BarChart2 className="mr-3 h-5 w-5" />
            Analysis
          </NavLink>
          
          <NavLink 
            to="/reports" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                isActive 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <FileText className="mr-3 h-5 w-5" />
            Reports
          </NavLink>
        </nav>
        
        <div className="p-4 border-t border-gray-700">
          <NavLink 
            to="/settings" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                isActive 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;