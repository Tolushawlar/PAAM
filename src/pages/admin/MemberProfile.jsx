import { useLocation, useNavigate } from "react-router-dom";

function MemberProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const userDetails = location.state?.user;

  if (!userDetails) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            No user data provided
          </div>
        </div>
        <button
          onClick={() => navigate("/admin/MemberManagement")}
          className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b8144a]"
        >
          <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Member Management
        </button>
      </div>
    );
  }

  const getRoleTitle = (userRole) => {
    switch (userRole) {
      case 1: return "Admin";
      case 2: return "Coordinator";
      case 3: return "Member";
      default: return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Member Profile</h1>
              <p className="mt-2 text-sm text-gray-600">Detailed information about the member</p>
            </div>
            <button
              onClick={() => navigate("/admin/MemberManagement")}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b8144a]"
            >
              <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Members
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#b8144a] to-[#a01240] px-6 py-8">
            <div className="flex items-center">
              <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center">
                <svg className="h-12 w-12 text-[#b8144a]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-bold text-white">
                  {userDetails.firstname} {userDetails.lastname}
                </h2>
                <p className="text-pink-100">{getRoleTitle(userDetails.user_roles)}</p>
                <div className="mt-2">
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                    userDetails.status === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {userDetails.status === 1 ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <svg className="h-5 w-5 text-[#b8144a] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-600">Full Name:</span>
                    <span className="text-gray-900">{userDetails.firstname} {userDetails.lastname}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-600">Email:</span>
                    <span className="text-gray-900">{userDetails.email?.replace("mailto:", "") || "N/A"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-600">Phone:</span>
                    <span className="text-gray-900">{userDetails.phone || "N/A"}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium text-gray-600">Date of Birth:</span>
                    <span className="text-gray-900">{userDetails.dob || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <svg className="h-5 w-5 text-[#b8144a] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-600">User ID:</span>
                    <span className="text-gray-900">{userDetails.id || "N/A"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-600">Role:</span>
                    <span className="text-gray-900">{getRoleTitle(userDetails.user_roles)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-600">Role Title:</span>
                    <span className="text-gray-900">{userDetails.role_title || "N/A"}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium text-gray-600">Member Since:</span>
                    <span className="text-gray-900">
                      {new Date(userDetails.created_at || userDetails.date_joined || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <svg className="h-5 w-5 text-[#b8144a] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900">Location Information</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-600">Address:</span>
                    <span className="text-gray-900">{userDetails.address || "N/A"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-600">City:</span>
                    <span className="text-gray-900">{userDetails.city || "N/A"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-600">State:</span>
                    <span className="text-gray-900">{userDetails.state || "N/A"}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium text-gray-600">Country:</span>
                    <span className="text-gray-900">{userDetails.country || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <svg className="h-5 w-5 text-[#b8144a] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm4-3a1 1 0 00-1 1v1h2V4a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900">Professional Information</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-600">Profession:</span>
                    <span className="text-gray-900">{userDetails.profession || "N/A"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-600">Organization:</span>
                    <span className="text-gray-900">{userDetails.organization || "N/A"}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium text-gray-600">Experience:</span>
                    <span className="text-gray-900">{userDetails.experience || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberProfile;