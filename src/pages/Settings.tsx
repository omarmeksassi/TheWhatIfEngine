import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Settings as SettingsIcon, 
  User, 
  Users, 
  Key, 
  Database, 
  Bell, 
  Upload, 
  Download,
  HelpCircle,
  Globe
} from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  
  const userRoleCanManageTeam = user?.role === 'admin';
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Sidebar */}
          <div className="bg-gray-50 md:w-64 p-4 border-r border-gray-200">
            <nav className="space-y-1">
              <button
                className={`flex items-center px-3 py-2 w-full text-left rounded-md ${
                  activeTab === 'account' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('account')}
              >
                <User size={18} className="mr-3" />
                <span>Account Settings</span>
              </button>
              
              {userRoleCanManageTeam && (
                <button
                  className={`flex items-center px-3 py-2 w-full text-left rounded-md ${
                    activeTab === 'team' 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('team')}
                >
                  <Users size={18} className="mr-3" />
                  <span>Team Management</span>
                </button>
              )}
              
              <button
                className={`flex items-center px-3 py-2 w-full text-left rounded-md ${
                  activeTab === 'security' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('security')}
              >
                <Key size={18} className="mr-3" />
                <span>Security</span>
              </button>
              
              <button
                className={`flex items-center px-3 py-2 w-full text-left rounded-md ${
                  activeTab === 'data' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('data')}
              >
                <Database size={18} className="mr-3" />
                <span>Data Management</span>
              </button>
              
              <button
                className={`flex items-center px-3 py-2 w-full text-left rounded-md ${
                  activeTab === 'notifications' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell size={18} className="mr-3" />
                <span>Notifications</span>
              </button>
              
              <button
                className={`flex items-center px-3 py-2 w-full text-left rounded-md ${
                  activeTab === 'api' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('api')}
              >
                <Globe size={18} className="mr-3" />
                <span>API Access</span>
              </button>
              
              <button
                className={`flex items-center px-3 py-2 w-full text-left rounded-md ${
                  activeTab === 'help' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('help')}
              >
                <HelpCircle size={18} className="mr-3" />
                <span>Help & Support</span>
              </button>
            </nav>
          </div>
          
          {/* Content */}
          <div className="p-6 md:flex-1">
            {activeTab === 'account' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                        <User size={32} />
                      </div>
                    </div>
                    <div className="ml-5 flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{user?.name}</h3>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                      <p className="text-sm text-gray-500 capitalize mt-1">{user?.role.replace('-', ' ')}</p>
                      <button className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800">
                        Change profile picture
                      </button>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          defaultValue={user?.name}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          defaultValue={user?.email}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                          Organization
                        </label>
                        <input
                          type="text"
                          id="organization"
                          defaultValue={user?.organization}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                          Timezone
                        </label>
                        <select
                          id="timezone"
                          defaultValue="UTC"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="UTC">UTC (Coordinated Universal Time)</option>
                          <option value="EST">EST (Eastern Standard Time)</option>
                          <option value="CST">CST (Central Standard Time)</option>
                          <option value="PST">PST (Pacific Standard Time)</option>
                          <option value="EAT">EAT (East Africa Time)</option>
                        </select>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                          Bio / About
                        </label>
                        <textarea
                          id="bio"
                          rows={3}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Tell us a bit about yourself and your role"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'data' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Data Management</h2>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Data Import & Export</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Import or export your data in various formats. This is useful for backup or migration purposes.
                    </p>
                    
                    <div className="flex flex-col md:flex-row md:space-x-4">
                      <button className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 mb-2 md:mb-0">
                        <Upload size={16} className="mr-2" />
                        Import Data
                      </button>
                      <button className="flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        <Download size={16} className="mr-2" />
                        Export Data
                      </button>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Data Retention Settings</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="auto-backup"
                            name="auto-backup"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="auto-backup" className="font-medium text-gray-700">
                            Automatic backups
                          </label>
                          <p className="text-gray-500">
                            Enable daily automatic backups of all collected data
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="historical-data"
                            name="historical-data"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="historical-data" className="font-medium text-gray-700">
                            Maintain historical data
                          </label>
                          <p className="text-gray-500">
                            Keep historical data for trend analysis and comparison
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="retention-period" className="block text-sm font-medium text-gray-700">
                          Data retention period
                        </label>
                        <select
                          id="retention-period"
                          defaultValue="indefinite"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="30days">30 days</option>
                          <option value="90days">90 days</option>
                          <option value="1year">1 year</option>
                          <option value="5years">5 years</option>
                          <option value="indefinite">Indefinite</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Dangerous Actions</h3>
                    
                    <button className="flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100">
                      Delete all data
                    </button>
                    <p className="mt-2 text-xs text-gray-500">
                      This action cannot be undone. It will permanently delete all your data.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="current-password"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                          New Password
                        </label>
                        <input
                          type="password"
                          id="new-password"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirm-password"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
                    
                    <div className="flex items-start mb-4">
                      <div className="flex items-center h-5">
                        <input
                          id="two-factor"
                          name="two-factor"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="two-factor" className="font-medium text-gray-700">
                          Enable two-factor authentication
                        </label>
                        <p className="text-gray-500">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                    </div>
                    
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                      Setup two-factor authentication
                    </button>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Session Management</h3>
                    
                    <div className="bg-gray-50 p-4 rounded-md mb-4">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Current Session</p>
                          <p className="text-xs text-gray-500">Chrome on Windows • Last active now</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
                    </div>
                    
                    <button className="text-sm font-medium text-red-600 hover:text-red-800">
                      Sign out of all other sessions
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'api' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">API Access</h2>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">API Keys</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Manage your API keys to access the What If Insights Engine API programmatically.
                    </p>
                    
                    <div className="flex items-center justify-between p-3 bg-white rounded border border-gray-300 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Production API Key</p>
                        <p className="text-xs text-gray-500">Created on May 12, 2025</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-xs text-gray-700 bg-gray-100 rounded">Show</button>
                        <button className="px-3 py-1 text-xs text-red-700 bg-red-50 rounded">Revoke</button>
                      </div>
                    </div>
                    
                    <button className="flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Generate New API Key
                    </button>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">API Documentation</h3>
                    
                    <div className="space-y-4">
                      <p className="text-sm text-gray-500">
                        Access our comprehensive API documentation to integrate the What If Insights Engine with your systems.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a href="#" className="block p-4 border border-gray-200 rounded-md hover:border-blue-400 hover:shadow-sm">
                          <h4 className="text-base font-medium text-gray-900 mb-1">REST API Reference</h4>
                          <p className="text-sm text-gray-500">Comprehensive guide to all available endpoints</p>
                        </a>
                        
                        <a href="#" className="block p-4 border border-gray-200 rounded-md hover:border-blue-400 hover:shadow-sm">
                          <h4 className="text-base font-medium text-gray-900 mb-1">Quick Start Guide</h4>
                          <p className="text-sm text-gray-500">Get up and running with our API in minutes</p>
                        </a>
                        
                        <a href="#" className="block p-4 border border-gray-200 rounded-md hover:border-blue-400 hover:shadow-sm">
                          <h4 className="text-base font-medium text-gray-900 mb-1">Example Code</h4>
                          <p className="text-sm text-gray-500">Sample code in various programming languages</p>
                        </a>
                        
                        <a href="#" className="block p-4 border border-gray-200 rounded-md hover:border-blue-400 hover:shadow-sm">
                          <h4 className="text-base font-medium text-gray-900 mb-1">Data Schema</h4>
                          <p className="text-sm text-gray-500">Detailed information about data models</p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;