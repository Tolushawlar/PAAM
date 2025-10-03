import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

function MetricCard({
  title,
  number,
  timeline,
  percentage,
  graphType,
  graphData,
}) {
  const handleTitle = title || "";
  const handleNumber = number || "";
  const handleTimeline = timeline || "";
  const handlePercentage = percentage || "";
  const handleGraphType = graphType || "bar";
  const handleGraphData = graphData || [];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const chartData = handleGraphData.map((value, index) => ({
    month: months[index % 12],
    value: value,
  }));

  const renderGraph = () => {
    if (!chartData || chartData.length === 0) {
      return <div className="flex-1 flex items-center justify-center text-gray-400">No data available</div>;
    }

    return (
      <div className="flex-1 h-full min-h-[200px]">
        <ResponsiveContainer width="100%" height={200}>
          {handleGraphType === "bar" ? (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 10, fill: '#9CA3AF' }}
              />
              <YAxis hide />
              <Bar dataKey="value" fill="#3B82F6" radius={[2, 2, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 10, fill: '#9CA3AF' }}
              />
              <YAxis hide />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#3B82F6' }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="card-base p-4 sm:p-6 w-full h-[300px] sm:h-[390px] transition-colors duration-300">
      <div className="flex flex-col justify-between space-y-2 items-start mb-3">
        <p className="text-sm sm:text-base text-gray-900 dark:text-gray-100">{handleTitle}</p>
        <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">{handleNumber}</p>
      </div>
      <div className="flex items-baseline gap-3 mb-4">
        <p className="text-sm sm:text-base text-gray-400 dark:text-gray-500">{handleTimeline}</p>
        <p
          className={`text-xs sm:text-sm font-medium ${
            parseFloat(handlePercentage) > 0 ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"
          }`}
        >
          {handlePercentage}%
        </p>
      </div>
      <div className="flex-1 min-h-[200px]">
        {renderGraph()}
      </div>
    </div>
  );
}

export default MetricCard;