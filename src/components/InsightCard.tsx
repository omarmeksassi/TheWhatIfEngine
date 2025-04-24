import React from 'react';
import { MessageSquare, MapPin, Tag, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { InsightData } from '../../contexts/DataContext';

interface InsightCardProps {
  insight: InsightData;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  const priorityClasses = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200'
  };

  const sourceIcons = {
    field: <MessageSquare size={16} className="text-blue-500" />,
    online: <Tag size={16} className="text-purple-500" />
  };

  const sentimentIcons = {
    negative: <AlertTriangle size={16} className="text-red-500" />,
    neutral: <Clock size={16} className="text-gray-500" />,
    positive: <CheckCircle size={16} className="text-green-500" />
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-lg">
      <div className={`p-4 border-l-4 ${priorityClasses[insight.priority]}`}>
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            {sourceIcons[insight.source]}
            <span className="ml-2 text-sm font-medium capitalize text-gray-600">
              {insight.source} Data
            </span>
          </div>
          <div className="flex items-center">
            {sentimentIcons[insight.sentiment]}
            <span className="ml-1 text-xs capitalize text-gray-500">
              {insight.sentiment}
            </span>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-800 mb-2">{insight.category}</h3>
        <p className="text-gray-600 text-sm mb-3">{insight.content}</p>
        
        <div className="flex flex-wrap items-center text-xs text-gray-500 mt-3 space-x-3">
          <div className="flex items-center">
            <MapPin size={14} className="mr-1" />
            {insight.region}
          </div>
          <div>
            {new Date(insight.date).toLocaleDateString()}
          </div>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {insight.tags.map(tag => (
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
  );
};

export default InsightCard;