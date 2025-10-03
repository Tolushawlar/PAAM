function InfoCard({ title, number, percent, color }) {
  const handleTitle = title || ""
  const handleNumber = number || ""
  const handlePercent = percent || ""
  const handleColor = color || "bg-gray-100 dark:bg-gray-800"
  
  return (
      <div className={`flex flex-col gap-2 rounded-lg p-4 sm:p-6 w-full min-h-[120px] sm:min-h-[142px] ${handleColor} transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105`}>
          <p className={`text-sm sm:text-base font-medium ${handleColor.includes('text-white') ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'}`}>{handleTitle}</p>
          <p className={`text-xl sm:text-2xl font-bold ${handleColor.includes('text-white') ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>{handleNumber}</p>
          <p className={`text-sm sm:text-base font-medium ${handleColor.includes('text-white') ? 'text-white/80' : 'text-green-600 dark:text-green-400'}`}>{handlePercent}</p>
      </div>
  );
}

export default InfoCard;