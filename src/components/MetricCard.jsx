import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';

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
    return (
      <div className="flex-1 h-full">
        <ResponsiveContainer width="100%" height="100%">
          {handleGraphType === "bar" ? (
            <BarChart data={chartData}>
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 10, fill: '#9CA3AF' }}
              />
              <Bar dataKey="value" fill="#3B82F6" radius={[2, 2, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={chartData}>
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 10, fill: '#9CA3AF' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-[12px] rounded-[8px] p-[24px] w-full h-[390px] bg-white border-2 border-grey-200 ">
      <div className="flex flex-col justify-between space-y-2 items-start">
        <p className="text-[16px] text-black">{handleTitle}</p>
        <p className="text-[32px] font-bold">{handleNumber}</p>
      </div>
      <div className="flex items-baseline gap-3">
        <p className="text-[16px] text-gray-400">{handleTimeline}</p>

        <p
          className={`text-[14px] font-medium ${
            parseFloat(handlePercentage) > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {handlePercentage}%
        </p>
      </div>
      {renderGraph()}
    </div>
  );
}

export default MetricCard;