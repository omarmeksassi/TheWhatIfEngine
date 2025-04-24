import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import StatCard from '../components/dashboard/StatCard';
import InsightCard from '../components/dashboard/InsightCard';
import RegionMap from '../components/dashboard/RegionMap';
import TrendChart from '../components/dashboard/TrendChart';
import { 
  Database, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Users,
  Filter
} from 'lucide-react';

const Dashboard = () => {
  const { insights, loading } = useData();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading dashboard data...</div>;
  }
  
  // Process data for different visualizations
  const highPriorityCount = insights.filter(i => i.priority === 'high').length;
  const negativeCount = insights.filter(i => i.sentiment === 'negative').length;
  const positiveCount = insights.filter(i => i.sentiment === 'positive').length;
  
  // Get unique regions and their insight counts
  const regionData = insights.reduce((acc, insight) => {
    const region = acc.find(r => r.name === insight.region);
    if (region) {
      region.insightCount += 1;
    } else {
      acc.push({ 
        name: insight.region, 
        insightCount: 1,
        // Simple mock coordinates for demonstration
        coordinates: { 
          x: 20 + Math.random() * 60, 
          y: 20 + Math.random() * 60
        }
      });
    }
    return acc;
  }, [] as { name: string; insightCount: number; coordinates: { x: number; y: number } }[]);
  
  // Filter insights based on selections
  const filteredInsights = insights.filter(insight => {
    let matches = true;
    if (selectedRegion) {
      matches = matches && insight.region === selectedRegion;
    }
    if (selectedCategory) {
      matches = matches && insight.category === selectedCategory;
    }
    return matches;
  });
  
  // Chart data
  const trendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Field Data',
        data: [30, 45, 57, 42, 65],
        color: '#2563EB'
      },
      {
        label: 'Online Data',
        data: [25, 30, 40, 48, 52],
        color: '#8B5CF6'
      }
    ]
  };
  
  // Handle region selection from map
  const handleRegionClick = (region: string) => {
    setSelectedRegion(region === selectedRegion ? null : region);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Community Insights Dashboard</h1>
        
        <div className="flex space-x-2">
          {selectedRegion || selectedCategory ? (
            <button
              onClick={() => {
                setSelectedRegion(null);
                setSelectedCategory(null);
              }}
              className="flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100"
            >
              Clear Filters
            </button>
          ) : null}
        </div>
      </div>
      
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Insights"
          value={insights.length}
          icon={Database}
          change={{ value: '+12%', type: 'increase' }}
          color="blue"
        />
        <StatCard 
          title="High Priority"
          value={highPriorityCount}
          icon={AlertTriangle}
          change={{ value: '+5%', type: 'increase' }}
          color="red"
        />
        <StatCard 
          title="Positive Sentiment"
          value={positiveCount}
          icon={CheckCircle}
          change={{ value: '+8%', type: 'increase' }}
          color="green"
        />
        <StatCard 
          title="Communities Reached"
          value="24"
          icon={Users}
          change={{ value: '0%', type: 'neutral' }}
          color="teal"
        />
      </div>
      
      {/* Filter bar */}
      {(selectedRegion || selectedCategory) && (
        <div className="bg-blue-50 border border-blue-100 rounded-md p-3 flex items-center">
          <Filter size={16} className="text-blue-500 mr-2" />
          <span className="text-sm text-blue-700">
            Showing insights for 
            {selectedRegion ? ` region "${selectedRegion}"` : ''}
            {selectedRegion && selectedCategory ? ' and ' : ''}
            {selectedCategory ? ` category "${selectedCategory}"` : ''}
          </span>
        </div>
      )}
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Latest Insights</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                View All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredInsights.slice(0, 4).map(insight => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <TrendChart 
              title="Data Collection Trends" 
              data={trendData}
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <RegionMap 
            regions={regionData}
            onRegionClick={handleRegionClick}
          />
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories</h2>
            <div className="space-y-2">
              {Array.from(new Set(insights.map(i => i.category))).map(category => {
                const count = insights.filter(i => i.category === category).length;
                const percentage = Math.round((count / insights.length) * 100);
                
                return (
                  <div key={category}>
                    <div className="flex justify-between text-sm mb-1">
                      <button 
                        className="text-gray-700 hover:text-blue-600"
                        onClick={() => setSelectedCategory(
                          category === selectedCategory ? null : category
                        )}
                      >
                        {category}
                      </button>
                      <span className="text-gray-500">{count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;