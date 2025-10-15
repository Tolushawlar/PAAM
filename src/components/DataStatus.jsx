import React from 'react';
import { useData } from '../contexts/DataContext';
import Button from '../UI/Button';

function DataStatus() {
  const { 
    isDataLoaded, 
    loading, 
    getLastFetchTime, 
    fetchAllTrainingData, 
    clearTrainingData 
  } = useData();

  const lastFetch = getLastFetchTime();

  const handleRefreshAll = async () => {
    if (confirm('This will refresh all training data from the server. Continue?')) {
      await fetchAllTrainingData();
    }
  };

  const handleClearData = () => {
    if (confirm('This will clear all cached training data. You will need to fetch data again. Continue?')) {
      clearTrainingData();
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
        Training Data Status
      </h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
          <span className={`text-sm font-medium ${
            isDataLoaded ? 'text-green-600' : 'text-orange-600'
          }`}>
            {isDataLoaded ? 'Data Loaded' : 'No Data'}
          </span>
        </div>
        
        {lastFetch && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Last Fetch:</span>
            <span className="text-sm text-gray-900 dark:text-gray-100">
              {new Date(lastFetch).toLocaleString()}
            </span>
          </div>
        )}
        
        {loading.allTrainingData && (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#b8144a]"></div>
            <span className="text-sm text-blue-600">Fetching data...</span>
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        <Button
          title="Refresh All Data"
          onClick={handleRefreshAll}
          disabled={loading.allTrainingData}
          backgroundColor="#10B981"
        />
        <Button
          title="Clear Cache"
          onClick={handleClearData}
          disabled={loading.allTrainingData}
          backgroundColor="#EF4444"
        />
      </div>
    </div>
  );
}

export default DataStatus;