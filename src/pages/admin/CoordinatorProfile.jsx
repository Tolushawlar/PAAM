import PersonalInfo from "../../components/PersonalInfo";
import ProfileInfo from "../../components/ProfileInfo";
import InfoCard from "../../components/InfoCard";
import Activities from "../../components/Activities";
import Breadcrumb from "../../components/Breadcrumb";
import Button from "../../UI/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


function CoordinatorProfile() {
    const location = useLocation();
    const navigate = useNavigate();
    const coordinatorId = location.state?.coordinator?.id;
    const [coordinatorDetails, setCoordinatorDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedPosition, setSelectedPosition] = useState('');

    useEffect(() => {
        if (coordinatorId) {
            fetchCoordinator();
        } else {
            setLoading(false);
        }
    }, [coordinatorId]);

    const fetchCoordinator = async () => {
        try {
            const response = await fetch("/v1/admin?endpoint=selectentry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
                },
                body: JSON.stringify({
                    table: "users",
                    id: coordinatorId
                }),
            });

            const result = await response.json();
            if (result.status === "success" && result.data) {
                setCoordinatorDetails(result.data[0]);
            }
        } catch (error) {
            console.error("Error fetching coordinator:", error);
        } finally {
            setLoading(false);
        }
    };
    
    const positions = [
        { value: 'center', label: 'Center Coordinator', description: 'Discipline 1-25 persons offline, 1-50 persons online' },
        { value: 'area', label: 'Area Coordinator', description: 'Overseeing 3-5 centers' },
        { value: 'zonal', label: 'Zonal Coordinator', description: 'Overseas 2-3 Areas' },
        { value: 'local', label: 'Local Govt Council Coordinator', description: 'Overseeing 2-4 Zones' },
        { value: 'divisional', label: 'Divisional Coordinator', description: 'Overseeing 3-5 local government councils' },
        { value: 'provincial', label: 'Provincial Coordinator', description: 'Overseas 5 Divisions' },
        { value: 'regional', label: 'Regional Coordinator', description: 'Overseeing 5 Provincials' },
        { value: 'national', label: 'National Overseer', description: 'Overseeing All' }
    ];
    
    const breadcrumbItems = [
        { label: 'Coordinator Management', onClick: () => navigate('/admin/CoordinatorManagement') },
        { label: 'Coordinator Profile' }
    ];

    if (loading) {
        return (
            <div className="p-6">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8144a]"></div>
                    <span className="ml-3 text-lg text-gray-600">Loading coordinator...</span>
                </div>
            </div>
        );
    }

    if (!coordinatorDetails) {
        return (
          <div className="p-6">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                No coordinator data provided
              </div>
            </div>
            <button
              onClick={() => navigate("/admin/CoordinatorManagement")}
              className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b8144a]"
            >
              <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Coordinator Management
            </button>
          </div>
        );
    }
    
    const personalInfo = [
        { key: "Full Name", value: coordinatorDetails.firstname && coordinatorDetails.lastname ? `${coordinatorDetails.firstname} ${coordinatorDetails.lastname}` : "N/A" },
        { key: "Email", value: coordinatorDetails.email?.replace("mailto:", "") || "N/A" },
        { key: "Phone Number", value: coordinatorDetails.phone || "N/A" },
        { key: "Location", value: coordinatorDetails.address || coordinatorDetails.city || coordinatorDetails.state || "N/A" }
    ];
    const responsibilities = [
        { key: "Assigned Region", value: coordinatorDetails.region || "Not Assigned" },
        { key: "Responsibilities", value: "Oversee volunteer activities, coordinate events, and manage regional communications." }
    ];
    const activitiesData = [
        { date: "2023-08-15", type: "Event Coordination", description: "Coordinated the 'Community Cleanup' event with 50 volunteers." },
        { date: "2023-07-20", type: "Volunteer Management", description: "Onboarded 15 new volunteers in the North Region." },
        { date: "2023-06-05", type: "Communication", description: "Sent out a regional newsletter to 200 recipients." },
    ];
    console.log('Full coordinator details:', coordinatorDetails);
    
    return (
        <div className="p-6 w-full">
            <Breadcrumb items={breadcrumbItems} />
            <ProfileInfo 
                fullName={coordinatorDetails.firstname && coordinatorDetails.lastname ? `${coordinatorDetails.firstname} ${coordinatorDetails.lastname}` : "N/A"} 
                title="Coordinator" 
            />
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        coordinatorDetails.status === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                        {coordinatorDetails.status === 1 ? "Active" : "Inactive"}
                    </span>
                    <span className="text-sm text-gray-500">
                        Joined: {new Date(coordinatorDetails.created_at || coordinatorDetails.date_joined || Date.now()).toLocaleDateString()}
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <select
                            value={selectedPosition}
                            onChange={(e) => setSelectedPosition(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none min-w-[200px]"
                        >
                            <option value="">Select Position</option>
                            {positions.map((position) => (
                                <option key={position.value} value={position.value}>
                                    {position.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Button 
                        title="Assign Leader" 
                        onClick={() => navigate('/admin/CoordinatorManagement/CoordinatorProfile/AssignLeader', {
                            state: { coordinator: coordinatorDetails, selectedPosition }
                        })}
                        variant="primary"
                        disabled={!selectedPosition}
                    />
                </div>
            </div>
            {selectedPosition && (
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        {positions.find(p => p.value === selectedPosition)?.label}
                    </h4>
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                        {positions.find(p => p.value === selectedPosition)?.description}
                    </p>
                </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Personal Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <svg className="h-5 w-5 text-[#b8144a] mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                    </div>
                    <div className="space-y-4">
                        {personalInfo.map((info, index) => (
                            <div key={index} className="flex justify-between py-2 border-b border-gray-200">
                                <span className="font-medium text-gray-600">{info.key}:</span>
                                <span className="text-gray-900">{info.value}</span>
                            </div>
                        ))}
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
                            <span className="text-gray-900">{coordinatorDetails.id || "N/A"}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="font-medium text-gray-600">Role:</span>
                            <span className="text-gray-900">Coordinator</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="font-medium text-gray-600">Role Title:</span>
                            <span className="text-gray-900">{coordinatorDetails.role_title || "N/A"}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="font-medium text-gray-600">Member Since:</span>
                            <span className="text-gray-900">
                                {new Date(coordinatorDetails.created_at || coordinatorDetails.date_joined || Date.now()).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h1 className="font-semibold text-xl mb-4 flex items-center">
                    <svg className="h-5 w-5 text-[#b8144a] mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm4-3a1 1 0 00-1 1v1h2V4a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Roles & Responsibilities
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {responsibilities.map((info, index) => (
                        <div key={index} className="">
                            <p className="text-[#61758A] font-medium mb-1">{info.key}</p>
                            <p className="text-gray-900">{info.value}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            {(() => {
                let teamMembers = [];
                console.log('Raw team data:', coordinatorDetails.team);
                try {
                    if (coordinatorDetails.team) {
                        let teamData = coordinatorDetails.team;
                        console.log('Team data type:', typeof teamData);
                        console.log('Team data value:', teamData);
                        
                        if (typeof teamData === 'string') {
                            // Handle double-escaped JSON
                            teamData = teamData.replace(/\\\\"/g, '"').replace(/\\"/g, '"');
                            console.log('Cleaned team data:', teamData);
                            teamMembers = JSON.parse(teamData);
                        } else {
                            teamMembers = teamData;
                        }
                        console.log('Parsed team members:', teamMembers);
                    }
                } catch (e) {
                    console.log('Team parsing error:', e);
                    teamMembers = [];
                }
                console.log('Final team members length:', teamMembers.length);
                return teamMembers.length > 0 ? (
                    <div className="bg-gray-50 rounded-lg p-6 mb-8">
                        <h2 className="font-semibold text-xl mb-4 flex items-center">
                            <svg className="h-5 w-5 text-[#b8144a] mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                            </svg>
                            Team Members ({teamMembers.length})
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {teamMembers.map((member) => (
                            <div key={member.id} className="bg-white rounded-lg p-4 border border-gray-200">
                                <div className="flex items-center mb-3">
                                    <div className="h-10 w-10 rounded-full bg-[#b8144a] flex items-center justify-center">
                                        <span className="text-white font-semibold text-sm">
                                            {member.firstname?.[0]}{member.lastname?.[0]}
                                        </span>
                                    </div>
                                    <div className="ml-3">
                                        <h4 className="font-medium text-gray-900">
                                            {member.firstname} {member.lastname}
                                        </h4>
                                        <p className="text-sm text-gray-500">{member.role_title || "Coordinator"}</p>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Email:</span>
                                        <span className="text-gray-900">{member.email?.replace("mailto:", "") || "N/A"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Phone:</span>
                                        <span className="text-gray-900">{member.phone || "N/A"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Status:</span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            member.status === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                        }`}>
                                            {member.status === 1 ? "Active" : "Inactive"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                ) : null;
            })()}
            
            <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="font-semibold text-xl mb-4 flex items-center">
                    <svg className="h-5 w-5 text-[#b8144a] mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Activity History
                </h2>
                <Activities activitiesData={activitiesData} />
            </div>
        </div>
    );
}

export default CoordinatorProfile;