import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: string | number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  color: 'blue' | 'green' | 'amber' | 'red' | 'teal';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  color
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    green: 'bg-green-50 text-green-700 border-green-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    red: 'bg-red-50 text-red-700 border-red-100',
    teal: 'bg-teal-50 text-teal-700 border-teal-100'
  };

  const changeClasses = {
    increase: 'text-green-600',
    decrease: 'text-red-600',
    neutral: 'text-gray-500'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={20} />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
            {change && (
              <p className={`ml-2 text-sm ${changeClasses[change.type]}`}>
                {change.type === 'increase' ? '↑' : 
                 change.type === 'decrease' ? '↓' : '→'} 
                {change.value}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;