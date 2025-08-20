function Activities({activitiesData}) {
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