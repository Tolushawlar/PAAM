import { MdPeople, MdBusiness, MdDescription, MdAdd, MdPersonAdd } from 'react-icons/md'

const Dashboard = () => {
  const activities = [
    { activity: "User 'Alex' signed up", user: "Alex", organization: "N/A", timestamp: "2023-09-20 10:00 AM" },
    { activity: "Organization 'Tech Innovators' created", user: "N/A", organization: "Tech Innovators", timestamp: "2023-09-19 03:30 PM" },
    { activity: "Content 'AI in Education' published", user: "Sarah", organization: "EduTech Solutions", timestamp: "2023-09-18 01:15 PM" },
    { activity: "User 'David' updated profile", user: "David", organization: "N/A", timestamp: "2023-09-17 09:45 AM" },
    { activity: "Organization 'Green Future' joined", user: "N/A", organization: "Green Future", timestamp: "2023-09-16 05:00 PM" }
  ];

  return (
    <div className="flex flex-col flex-1 p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of platform activity and key metrics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <MdPeople className="text-blue-500" size={24} />
            <p className="text-gray-900 font-medium">Total Users</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">1,234</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <MdBusiness className="text-green-500" size={24} />
            <p className="text-gray-900 font-medium">Active Organizations</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">567</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <MdDescription className="text-purple-500" size={24} />
            <p className="text-gray-900 font-medium">Content Published</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">890</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Activity</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">User</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Organization</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 last:border-b-0">
                <td className="px-6 py-4 text-sm text-gray-600">{item.activity}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.user}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.organization}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
      
      <div className="flex gap-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          <MdPersonAdd size={20} />
          Add New User
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 font-medium">
          <MdAdd size={20} />
          Create Organization
        </button>
      </div>
    </div>
  );
};

export default Dashboard;