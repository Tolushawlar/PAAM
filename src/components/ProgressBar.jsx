function ProgressBar({ progress, title, subtitle }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1 bg-gray-200 rounded-full h-3">
          <div 
            className="bg-[#b8144a] h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm font-medium text-gray-700">{progress}%</span>
      </div>
    </div>
  );
}

export default ProgressBar;