import React, { useState } from 'react';
import { useData, InsightData } from '../contexts/DataContext';
import { 
  Search, 
  Filter, 
  Sparkles, 
  BarChart, 
  MessageCircle, 
  Tag,
  AlertTriangle,
  Clock,
  CheckCircle
} from 'lucide-react';

const Analysis = () => {
  const { insights, loading } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [analysisInProgress, setAnalysisInProgress] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<InsightData | null>(null);
  
  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading analysis data...</div>;
  }
  
  const runAnalysis = () => {
    setAnalysisInProgress(true);
    
    // Simulate AI analysis process
    setTimeout(() => {
      setAnalysisInProgress(false);
    }, 3000);
  };
  
  // Filter insights based on search term
  const filteredInsights = insights.filter(insight => 
    insight.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    insight.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    insight.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    insight.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Count by sentiment
  const sentimentCounts = {
    positive: insights.filter(i => i.sentiment === 'positive').length,
    neutral: insights.filter(i => i.sentiment === 'neutral').length,
    negative: insights.filter(i => i.sentiment === 'negative').length
  };
  
  const sentimentTotal = sentimentCounts.positive + sentimentCounts.neutral + sentimentCounts.negative;
  
  // Count by source
  const fieldCount = insights.filter(i => i.source === 'field').length;
  const onlineCount = insights.filter(i => i.source === 'online').length;
  
  const handleInsightClick = (insight: InsightData) => {
    setSelectedInsight(insight);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Insights Analysis</h1>
          <p className="text-gray-600 mt-1">Analyze community feedback and identify patterns</p>
        </div>
        
        <button 
          className={`flex items-center px-4 py-2 rounded-md text-white ${
            analysisInProgress ? 'bg-amber-500' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          onClick={runAnalysis}
          disabled={analysisInProgress}
        >
          <Sparkles size={16} className="mr-2" />
          {analysisInProgress ? 'Analysis in progress...' : 'Run AI Analysis'}
        </button>
      </div>
      
      {/* Search and filters */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="relative flex-1 mb-4 md:mb-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search insights by keyword, category, region, or tag..."
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-500" />
            <select
              className="text-sm border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All sources</option>
              <option value="field">Field data</option>
              <option value="online">Online data</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Analysis panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Overview stats */}
          <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Data Overview</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                <h3 className="text-xs text-gray-500 uppercase">Total Insights</h3>
                <p className="text-2xl font-semibold mt-1">{insights.length}</p>
              </div>
              
              <div className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                <h3 className="text-xs text-gray-500 uppercase">Field Data</h3>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold mt-1">{fieldCount}</p>
                  <p className="text-xs text-gray-500 ml-1">
                    ({Math.round((fieldCount / insights.length) * 100)}%)
                  </p>
                </div>
              </div>
              
              <div className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                <h3 className="text-xs text-gray-500 uppercase">Online Data</h3>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold mt-1">{onlineCount}</p>
                  <p className="text-xs text-gray-500 ml-1">
                    ({Math.round((onlineCount / insights.length) * 100)}%)
                  </p>
                </div>
              </div>
              
              <div className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                <h3 className="text-xs text-gray-500 uppercase">Unique Tags</h3>
                <p className="text-2xl font-semibold mt-1">
                  {new Set(insights.flatMap(i => i.tags)).size}
                </p>
              </div>
            </div>
          </div>
          
          {/* Sentiment analysis */}
          <div className="bg-white rounded-lg shadow-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Sentiment Analysis</h2>
              <div className="flex items-center">
                <BarChart size={16} className="text-gray-500 mr-1" />
                <span className="text-sm text-gray-500">Last 30 days</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <div className="flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    <span>Positive</span>
                  </div>
                  <span>{sentimentCounts.positive} ({Math.round((sentimentCounts.positive / sentimentTotal) * 100)}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(sentimentCounts.positive / sentimentTotal) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <div className="flex items-center">
                    <Clock size={16} className="text-gray-500 mr-2" />
                    <span>Neutral</span>
                  </div>
                  <span>{sentimentCounts.neutral} ({Math.round((sentimentCounts.neutral / sentimentTotal) * 100)}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gray-500 h-2 rounded-full" 
                    style={{ width: `${(sentimentCounts.neutral / sentimentTotal) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <div className="flex items-center">
                    <AlertTriangle size={16} className="text-red-500 mr-2" />
                    <span>Negative</span>
                  </div>
                  <span>{sentimentCounts.negative} ({Math.round((sentimentCounts.negative / sentimentTotal) * 100)}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${(sentimentCounts.negative / sentimentTotal) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tag cloud */}
          <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Common Themes</h2>
            
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(insights.flatMap(i => i.tags))).map(tag => (
                <div 
                  key={tag}
                  className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition-colors"
                  onClick={() => setSearchTerm(tag)}
                >
                  #{tag}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Insight list */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-800">Insights</h2>
              <span className="text-sm text-gray-500">
                {filteredInsights.length} results
              </span>
            </div>
            
            <div className="overflow-y-auto max-h-[600px] space-y-3 pr-2">
              {filteredInsights.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No insights found matching your search</p>
              ) : (
                filteredInsights.map(insight => (
                  <div 
                    key={insight.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedInsight?.id === insight.id 
                        ? 'border-blue-400 bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => handleInsightClick(insight)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        {insight.source === 'field' ? (
                          <MessageCircle size={14} className="text-blue-500 mr-1" />
                        ) : (
                          <Tag size={14} className="text-purple-500 mr-1" />
                        )}
                        <span className="text-xs text-gray-500 capitalize">{insight.source}</span>
                      </div>
                      <div className="flex items-center">
                        {insight.sentiment === 'positive' && (
                          <CheckCircle size={14} className="text-green-500" />
                        )}
                        {insight.sentiment === 'neutral' && (
                          <Clock size={14} className="text-gray-500" />
                        )}
                        {insight.sentiment === 'negative' && (
                          <AlertTriangle size={14} className="text-red-500" />
                        )}
                      </div>
                    </div>
                    
                    <h3 className="font-medium text-gray-800 mb-1">{insight.category}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{insight.content}</p>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {insight.tags.slice(0, 3).map(tag => (
                        <span 
                          key={tag} 
                          className="inline-block bg-gray-100 text-gray-700 rounded-full px-2 py-0.5 text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                      {insight.tags.length > 3 && (
                        <span className="inline-block text-gray-500 text-xs">
                          +{insight.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Insight detail panel */}
          {selectedInsight && (
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Insight Details</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Category</span>
                    <span className="text-sm font-medium">{selectedInsight.category}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Region</span>
                    <span className="text-sm font-medium">{selectedInsight.region}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Date</span>
                    <span className="text-sm font-medium">
                      {new Date(selectedInsight.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Priority</span>
                    <span className={`text-sm font-medium capitalize px-2 py-0.5 rounded-full ${
                      selectedInsight.priority === 'high' ? 'bg-red-100 text-red-800' :
                      selectedInsight.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {selectedInsight.priority}
                    </span>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm text-gray-500">Content</span>
                  <p className="text-sm mt-1 bg-gray-50 p-3 rounded-md">
                    {selectedInsight.content}
                  </p>
                </div>
                
                <div>
                  <span className="text-sm text-gray-500">Tags</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedInsight.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="inline-block bg-gray-100 text-gray-700 rounded-full px-2 py-0.5 text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;