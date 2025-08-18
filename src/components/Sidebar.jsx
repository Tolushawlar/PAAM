import { MdDashboard, MdPeople, MdBusiness, MdDescription, MdSettings, MdHelp, MdOpenInNew, MdEvent, MdMessage, MdPerson } from 'react-icons/md'
import { useNavigate, useLocation } from 'react-router-dom'

const Sidebar = ({ userType }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  
  const adminMenuItems = [
    { icon: MdDashboard, label: 'Dashboard', path: '/admin' },
    { icon: MdPeople, label: 'Users', path: '/admin/users' },
    { icon: MdBusiness, label: 'Organizations', path: '/admin/organizations' },
    { icon: MdDescription, label: 'Content', path: '/admin/content' },
    { icon: MdSettings, label: 'Settings', path: '/admin/settings' },
    { icon: MdHelp, label: 'Support', path: '/admin/support' }
  ]
  
  const userMenuItems = [
    { icon: MdDashboard, label: 'Dashboard', path: '/user' },
    { icon: MdEvent, label: 'Events', path: '/user/events' },
    { icon: MdMessage, label: 'Messages', path: '/user/messages' },
    { icon: MdPerson, label: 'Profile', path: '/user/profile' },
    { icon: MdSettings, label: 'Settings', path: '/user/settings' },
    { icon: MdHelp, label: 'Help', path: '/user/help' }
  ]
  
  const menuItems = isAdmin ? adminMenuItems : userMenuItems
  
  return (
    <div className="flex flex-col w-80 bg-white border-r border-gray-200">
      <div className="flex h-full min-h-screen flex-col justify-between p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-900 text-lg font-semibold">{userType || 'PAAM'}</h1>
            <button 
              onClick={() => navigate(isAdmin ? '/user' : '/admin')}
              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 transition-colors"
            >
              {isAdmin ? 'User View' : 'Admin View'}
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <div 
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'hover:bg-gray-50 text-gray-900'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-blue-600' : 'text-gray-600'} />
                  <p className="text-sm font-medium">{item.label}</p>
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div 
            onClick={() => window.open('/', '_blank')}
            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer"
          >
            <MdOpenInNew size={20} className="text-gray-600" />
            <p className="text-gray-900 text-sm font-medium">View Site</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;