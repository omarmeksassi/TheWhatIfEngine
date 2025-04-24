import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  ChevronDown,
  Settings,
  MapPin,
  Layers
} from 'lucide-react';

const Reports = () => {
  const { insights } = useData();
  const [reportType, setReportType] = useState('community');
  
  const reportOptions = [
    { id: 'community', name: 'Community Needs Assessment' },
    { id: 'sentiment', name: 'Sentiment Analysis Report' },
    { id: 'regional', name: 'Regional Comparison' },
    { id: 'thematic', name: 'Thematic Analysis' },
    { id: 'custom', name: 'Custom Report' }
  ];
  
  const generateReport = (type: string) => {
    console.log(`Generating ${type} report...`);
    // This would trigger the report generation process
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports & Evidence</h1>
          <p className="text-gray-600 mt-1">Generate insights reports for stakeholders and funders</p>
        </div>
        
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => generateReport(reportType)}
        >
          <FileText size={16} className="mr-2" />
          Generate New Report
        </button>
      </div>
      
      {/* Report type selector */}
      <div className="bg-white rounded-lg shadow-md p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Report Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {reportOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Time Period
            </label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <div className="flex-1 px-3 py-2">Last 30 days</div>
              <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                <Calendar size={16} />
              </button>
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Region Filter
            </label>
            <div className="relative">
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue="all"
              >
                <option value="all">All Regions</option>
                <option value="east-africa">East Africa</option>
                <option value="west-africa">West Africa</option>
                <option value="south-asia">South Asia</option>
                <option value="middle-east">Middle East</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Data Sources
            </label>
            <div className="flex space-x-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-700">Field Data</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-700">Online Data</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Format
            </label>
            <div className="flex space-x-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="format"
                  value="pdf"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-700">PDF</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="format"
                  value="excel"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Excel</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="format"
                  value="web"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Web View</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Include Visualizations
            </label>
            <div className="flex space-x-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-700">Charts</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-700">Maps</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-700">Tables</span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
            <Settings size={14} className="mr-1" />
            Advanced Options
          </button>
        </div>
      </div>
      
      {/* Recent reports */}
      <div className="bg-white rounded-lg shadow-md p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Reports</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Generated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created By
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileText size={16} className="text-blue-500 mr-2" />
                    <div className="text-sm font-medium text-gray-900">Community Needs Assessment Q2 2025</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Community Needs</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">June 12, 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">John Doe</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    <Download size={16} />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <ChevronDown size={16} />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileText size={16} className="text-blue-500 mr-2" />
                    <div className="text-sm font-medium text-gray-900">Regional Comparison - East Africa</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Regional</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">June 5, 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Sarah Johnson</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    <Download size={16} />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <ChevronDown size={16} />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileText size={16} className="text-blue-500 mr-2" />
                    <div className="text-sm font-medium text-gray-900">Sentiment Analysis - Health Programs</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Sentiment</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">May 28, 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">John Doe</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    <Download size={16} />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <ChevronDown size={16} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Report templates */}
      <div className="bg-white rounded-lg shadow-md p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Report Templates</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 transition-all hover:border-blue-400 hover:shadow-md cursor-pointer">
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 bg-blue-100 text-blue-700 rounded">
                <MapPin size={20} />
              </div>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Popular</span>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">Regional Analysis</h3>
            <p className="text-sm text-gray-600 mb-3">Compare insights across different geographical regions with maps and charts.</p>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Use Template
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 transition-all hover:border-blue-400 hover:shadow-md cursor-pointer">
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 bg-amber-100 text-amber-700 rounded">
                <Layers size={20} />
              </div>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">New</span>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">Thematic Report</h3>
            <p className="text-sm text-gray-600 mb-3">Analyze insights grouped by themes and categories with trend analysis.</p>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Use Template
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 transition-all hover:border-blue-400 hover:shadow-md cursor-pointer">
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 bg-green-100 text-green-700 rounded">
                <Settings size={20} />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">Custom Template</h3>
            <p className="text-sm text-gray-600 mb-3">Build your own report template with the exact sections and charts you need.</p>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Create Custom
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;