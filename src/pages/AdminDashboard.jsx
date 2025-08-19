import React from 'react'
import InfoCard from '../components/InfoCard'

export default function AdminDashboard() {
  const InfoCardStats = [
    { title: "Total Members", number: "12,345", percent: "+10%"},
    { title: "Active Members", number: "8,765",percent: "+5%"},
    { title: "Total Donations", number: "$50,000",percent: "+15%"},
    { title: "Training", number: "75%",percent: "+8%"}
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#0d141c] pb-5">Dashboard Overview</h1>
        <p className="text-xl font-bold text-[#0d141c]">High-Level Analytics</p>
      </div>

      <div className="flex justify-between gap-[16px] h-[174px]">
        {InfoCardStats.map((stat, index) => (
          <InfoCard  key={index} title={stat.title} number={stat.number} percent={stat.percent} color= "bg-[#b8144a]/20" />
        ))}  
      </div>


      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
      </div> */}

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