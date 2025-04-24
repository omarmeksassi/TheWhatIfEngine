import React from 'react';
import { MapPin } from 'lucide-react';

interface RegionMapProps {
  regions: { 
    name: string; 
    insightCount: number;
    coordinates: { x: number; y: number };
  }[];
  onRegionClick: (region: string) => void;
}

const RegionMap: React.FC<RegionMapProps> = ({ regions, onRegionClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Regional Insights</h2>
      </div>
      
      <div className="relative w-full h-[300px] bg-blue-50 rounded-lg overflow-hidden">
        {/* This is a simplified map visualization. In a real app, you'd use a proper map library */}
        <div className="absolute inset-0 p-2">
          <img 
            src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="World map background" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        
        {regions.map((region) => (
          <div 
            key={region.name}
            className="absolute cursor-pointer transition-transform hover:scale-110"
            style={{ 
              left: `${region.coordinates.x}%`, 
              top: `${region.coordinates.y}%` 
            }}
            onClick={() => onRegionClick(region.name)}
          >
            <div className="flex flex-col items-center">
              <div className={`
                p-1 rounded-full 
                ${region.insightCount > 5 ? 'bg-red-500' : 
                  region.insightCount > 2 ? 'bg-amber-500' : 'bg-blue-500'}
                shadow-md text-white
              `}>
                <MapPin size={region.insightCount > 5 ? 24 : 20} />
              </div>
              <span className="text-xs font-medium bg-white px-2 py-0.5 rounded mt-1 shadow-sm">
                {region.name}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 space-y-2">
        <p className="text-sm text-gray-600 font-medium">Click on a region to see insights</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <span className="w-3 h-3 inline-block bg-blue-500 rounded-full mr-1"></span>
            <span>Low activity</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 inline-block bg-amber-500 rounded-full mr-1"></span>
            <span>Medium activity</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 inline-block bg-red-500 rounded-full mr-1"></span>
            <span>High activity</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionMap;