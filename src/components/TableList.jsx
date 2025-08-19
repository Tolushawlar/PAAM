import FilterButton from './FilterButton';
import Pagination from './Pagination';
import { useState } from 'react';

function TableList({ data = [], itemsPerPage = 5, isReports = false, isContent = false }) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-gray-700">{isContent ? 'Title' : 'Name'}</th>
            {!isReports && !isContent && <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>}
            {isContent && <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>}
            <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
            {isReports ? (
              <>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date Submitted</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
              </>
            ) : isContent ? (
              <th className="text-left py-3 px-4 font-medium text-gray-700">Date Created</th>
            ) : (
              <>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Joined</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Last Active</th>
              </>
            )}
            <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              {(row.name || row.title) && <td className="py-3 px-4">{row.title || row.name}</td>}
              {!isReports && !isContent && row.email && <td className="py-3 px-4">{row.email}</td>}
              {isContent && row.type && <td className="py-3 px-4">{row.type}</td>}
              {row.status && (
                <td className="py-3 px-4">
                  <FilterButton 
                    label={row.status} 
                    onClick={() => {}}
                  />
                </td>
              )}
              {isReports ? (
                <>
                  {row.date && <td className="py-3 px-4">{row.date}</td>}
                  {row.type && <td className="py-3 px-4">{row.type}</td>}
                </>
              ) : isContent ? (
                row.dateCreated && <td className="py-3 px-4">{row.dateCreated}</td>
              ) : (
                <>
                  {row.joined && <td className="py-3 px-4">{row.joined}</td>}
                  {row.lastActive && <td className="py-3 px-4">{row.lastActive}</td>}
                </>
              )}
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  {isContent ? (
                    <>
                      <button className="text-sm" style={{ color: '#b8144a' }}>Edit</button>
                      <button className="text-sm" style={{ color: '#b8144a' }}>Delete</button>
                    </>
                  ) : (
                    <>
                      <button className="text-sm" style={{ color: '#b8144a' }}>View</button>
                      <button className="text-sm" style={{ color: '#b8144a' }}>Delete</button>
                      {!isReports && <button className="text-sm" style={{ color: '#b8144a' }}>Update</button>}
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default TableList;