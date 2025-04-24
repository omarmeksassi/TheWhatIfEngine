import React from 'react';

interface TrendChartProps {
  title: string;
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      color: string;
    }[];
  };
}

const TrendChart: React.FC<TrendChartProps> = ({ title, data }) => {
  // Calculate height for each bar
  const maxValue = Math.max(...data.datasets.flatMap(dataset => dataset.data));
  const getHeight = (value: number) => (value / maxValue) * 150;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      
      <div className="mt-4 h-[200px] flex items-end space-x-2">
        {data.labels.map((label, i) => (
          <div key={label} className="flex-1 flex flex-col items-center">
            <div className="w-full flex justify-center space-x-1">
              {data.datasets.map((dataset, datasetIndex) => (
                <div
                  key={datasetIndex}
                  className={`w-3 rounded-t transition-all duration-500 ease-in-out`}
                  style={{ 
                    height: `${getHeight(dataset.data[i])}px`,
                    backgroundColor: dataset.color
                  }}
                />
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-2">{label}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex justify-center space-x-4">
        {data.datasets.map((dataset, i) => (
          <div key={i} className="flex items-center">
            <span 
              className="w-3 h-3 rounded-full mr-1" 
              style={{ backgroundColor: dataset.color }}
            />
            <span className="text-xs text-gray-600">{dataset.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendChart;