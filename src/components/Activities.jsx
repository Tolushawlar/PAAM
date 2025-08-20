function Activities() {
  const activitiesData = [
      { date: "2024-07-20", type: "Completed a module", description: " Shared an article on community building strategies" },
      { date: "2024-07-15", type: "Took examination", description: "Participated in a discussion about platform features" },
      { date: "2024-07-10", type: "Reaction", description: "Liked a post about upcoming events" },
  ];
  return (
      <div className="overflow-x-auto pl-5">
          <table className="table-fixed w-full border border-gray-300">
              <thead>
                  <tr className="border-b border-gray-300">
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Description</th>
                  </tr>
              </thead>
              <tbody className="text-[#61758A]">
                  {activitiesData.map((data, index) => (
                      <tr className="border-b border-gray-300" key={index}>
                          <td className="px-4 py-2">{data.date}</td>
                          <td className="px-4 py-2">{data.type}</td>
                          <td className="px-4 py-2">{data.description}
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
}

export default Activities;