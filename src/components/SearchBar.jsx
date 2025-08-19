import searchIcon from '../assets/search.svg'
function SearchBar({ placeholder = "members" }) {
    return (
        <form action="" className='flex gap-2 p-2 rounded-lg bg-[#b8144a]/20 '>
            <button type="submit" className='p-2'><img src={searchIcon} alt="search" /></button>
            <input type="text" placeholder={`Search ${placeholder}`} className='bg-transparent flex-1 focus:outline-none'/>
        </form>
    );
}

export default SearchBar;