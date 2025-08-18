import { MdDashboard, MdPeople, MdBusiness, MdDescription, MdSettings, MdHelp, MdOpenInNew } from 'react-icons/md'

const Sidebar = () => {
  return (
    <div className="flex flex-col w-80 bg-white border-r border-gray-200">
      <div className="flex h-full min-h-screen flex-col justify-between p-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-gray-900 text-lg font-semibold">PAAM Admin</h1>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-600">
              <MdDashboard size={20} />
              <p className="text-sm font-medium">Dashboard</p>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <MdPeople size={20} className="text-gray-600" />
              <p className="text-gray-900 text-sm font-medium">Users</p>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <MdBusiness size={20} className="text-gray-600" />
              <p className="text-gray-900 text-sm font-medium">Organizations</p>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <MdDescription size={20} className="text-gray-600" />
              <p className="text-gray-900 text-sm font-medium">Content</p>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <MdSettings size={20} className="text-gray-600" />
              <p className="text-gray-900 text-sm font-medium">Settings</p>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <MdHelp size={20} className="text-gray-600" />
              <p className="text-gray-900 text-sm font-medium">Support</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer">
            <MdOpenInNew size={20} className="text-gray-600" />
            <p className="text-gray-900 text-sm font-medium">View Site</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;