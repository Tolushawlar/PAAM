import { ChevronDownIcon } from '@heroicons/react/24/outline';

function FilterButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
      style={{ backgroundColor: '#b8144a', color: 'white', fontWeight: 'bold' }}    >
      {label}
      <ChevronDownIcon className="ml-2 w-4 h-4" />
    </button>
  );
}

export default FilterButton;