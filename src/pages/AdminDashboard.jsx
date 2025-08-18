import React from 'react'

export default function AdminDashboard() {
  const stats = [
    { title: "Total Users", value: "1,234", color: "bg-blue-500" },
    { title: "Active Members", value: "987", color: "bg-green-500" },
    { title: "Pending Reports", value: "23", color: "bg-yellow-500" },
    { title: "Events This Month", value: "12", color: "bg-purple-500" }
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Manage users, content, and system settings.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">System Activities</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-50 rounded">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              <span className="text-sm">System maintenance scheduled</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-sm">New user registrations: 15</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm">Content approved: 8</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Admin Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-red-50 hover:bg-red-100 rounded transition-colors">
              Manage Users
            </button>
            <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded transition-colors">
              System Settings
            </button>
            <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded transition-colors">
              Content Moderation
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">System Activities</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-50 rounded">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              <span className="text-sm">System maintenance scheduled</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-sm">New user registrations: 15</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm">Content approved: 8</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Admin Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-red-50 hover:bg-red-100 rounded transition-colors">
              Manage Users
            </button>
            <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded transition-colors">
              System Settings
            </button>
            <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded transition-colors">
              Content Moderation
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">System Activities</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-50 rounded">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              <span className="text-sm">System maintenance scheduled</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-sm">New user registrations: 15</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm">Content approved: 8</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Admin Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-red-50 hover:bg-red-100 rounded transition-colors">
              Manage Users
            </button>
            <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded transition-colors">
              System Settings
            </button>
            <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded transition-colors">
              Content Moderation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}