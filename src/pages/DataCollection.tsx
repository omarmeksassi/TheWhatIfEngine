import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import DataCollectionForm from '../components/data-collection/DataCollectionForm';
import InsightCard from '../components/dashboard/InsightCard';
import { History, Filter, Upload, Download } from 'lucide-react';

const DataCollection = () => {
  const { insights } = useData();
  const [filter, setFilter] = useState('all');
  
  // Get only field-collected insights
  const fieldInsights = insights.filter(insight => insight.source === 'field');
  
  // Apply filters
  const filteredInsights = fieldInsights.filter(insight => {
    if (filter === 'all') return true;
    if (filter === 'high') return insight.priority === 'high';
    if (filter === 'recent') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return new Date(insight.date) >= oneWeekAgo;
    }
    return true;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Data Collection</h1>
          <p className="text-gray-600 mt-1">Collect field data with automatic offline support</p>
        </div>
        
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
            <Download size={16} className="mr-2" />
            Export Data
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Upload size={16} className="mr-2" />
            Import Data
          </button>
        </div>
      </div>
      
      <DataCollectionForm />
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <History size={20} className="text-gray-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Collection History</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-sm border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All entries</option>
              <option value="high">High priority</option>
              <option value="recent">Last 7 days</option>
            </select>
          </div>
        </div>
        
        {filteredInsights.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            No entries found matching the selected filter
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredInsights.map(insight => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataCollection;