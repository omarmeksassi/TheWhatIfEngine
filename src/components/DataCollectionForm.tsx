import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { categories, regions } from '../../data/mockData';
import { Save, Upload, AlertTriangle, Database } from 'lucide-react';

interface FormData {
  content: string;
  region: string;
  category: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  priority: 'high' | 'medium' | 'low';
  tags: string;
}

const initialFormData: FormData = {
  content: '',
  region: '',
  category: '',
  sentiment: 'neutral',
  priority: 'medium',
  tags: ''
};

const DataCollectionForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [savedOffline, setSavedOffline] = useState<boolean>(false);
  const [offlineEntries, setOfflineEntries] = useState<number>(0);
  const { addInsight } = useData();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Split tags string into array of tags
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');
    
    // Create new insight
    const newInsight = {
      source: 'field' as const,
      region: formData.region,
      category: formData.category,
      sentiment: formData.sentiment,
      priority: formData.priority,
      content: formData.content,
      date: new Date().toISOString().split('T')[0],
      tags: tagsArray
    };
    
    // Save insight (in a real app, this would check for online/offline status)
    addInsight(newInsight);
    
    // Simulate offline storage
    setSavedOffline(true);
    setOfflineEntries(prev => prev + 1);
    
    // Reset form
    setFormData(initialFormData);
    
    // Reset offline notification after 3 seconds
    setTimeout(() => {
      setSavedOffline(false);
    }, 3000);
  };

  const isValid = formData.content && formData.region && formData.category;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Field Data Collection</h2>
        
        {offlineEntries > 0 && (
          <button 
            className="flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-sm font-medium"
          >
            <Upload size={16} className="mr-2" />
            Sync {offlineEntries} offline entries
          </button>
        )}
      </div>
      
      {savedOffline && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-4 flex items-center">
          <Database size={16} className="mr-2" />
          Entry saved to offline storage
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label htmlFor="region" className="block text-sm font-medium text-gray-700">
              Region *
            </label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select region</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="sentiment" className="block text-sm font-medium text-gray-700">
              Sentiment
            </label>
            <div className="flex space-x-4">
              {['positive', 'neutral', 'negative'].map((sentiment) => (
                <label key={sentiment} className="flex items-center">
                  <input
                    type="radio"
                    name="sentiment"
                    value={sentiment}
                    checked={formData.sentiment === sentiment}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">{sentiment}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <div className="flex space-x-4">
              {['low', 'medium', 'high'].map((priority) => (
                <label key={priority} className="flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={formData.priority === priority}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">{priority}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-1">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter the community feedback or observation..."
            required
          />
        </div>
        
        <div className="space-y-1">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="water, infrastructure, women, urgent"
          />
        </div>
        
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center text-sm text-gray-500">
            <AlertTriangle size={16} className="mr-2 text-amber-500" />
            Fields marked with * are required
          </div>
          
          <div className="flex space-x-3">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => setFormData(initialFormData)}
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className={`flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white 
                ${isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
            >
              <Save size={16} className="mr-2" />
              Save Entry
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DataCollectionForm;