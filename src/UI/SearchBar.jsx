import searchIcon from '../assets/search.svg'
function SearchBar({ placeholder = "members", className = "", value, onChange }) {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className={`flex gap-2 p-2 rounded-lg bg-paam-primary/20 dark:bg-paam-primary/30 transition-colors duration-200 ${className}`}>
            <button type="submit" className='p-1 sm:p-2'><img src={searchIcon} alt="search" className="w-4 h-4 sm:w-5 sm:h-5" /></button>
            <input 
                type="text" 
                placeholder={`Search ${placeholder}`} 
                value={value}
                onChange={onChange}
                className='bg-transparent flex-1 focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-600 dark:placeholder-gray-400 text-sm sm:text-base'
            />
        </form>
    );
}

export default SearchBar;