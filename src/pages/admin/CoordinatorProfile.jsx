import PersonalInfo from "../../Components/PersonalInfo";
import ProfileInfo from "../../Components/ProfileInfo";
import InfoCard from "../../Components/InfoCard";
import Activities from "../../Components/Activities";
import Breadcrumb from "../../components/Breadcrumb";
import Button from "../../UI/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function CoordinatorProfile() {
    const navigate = useNavigate();
    const [selectedPosition, setSelectedPosition] = useState('');
    
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
        { label: 'Coordinator Management', href: '/admin/CoordinatorManagement' },
        { label: 'Coordinator Profile' }
    ];
    const personalInfo = [
        { key: "Full Name", value: "Sarah Johnson" },
        { key: "Email", value: "sarah.johnson@email.com" },
        { key: "Phone Number", value: "(555) 123-4567" },
        { key: "Location", value: "123 Main Street, Anytown, USA" }
    ];
    const responsibilities = [
        { key: "Assigned Region", value: "North Region" },
        { key: "Responsibilities", value: "Oversee volunteer activities, coordinate events, and manage regional communications." }
    ];
    const activitiesData = [
        { date: "2023-08-15", type: "Event Coordination", description: "Coordinated the 'Community Cleanup' event with 50 volunteers." },
        { date: "2023-07-20", type: "Volunteer Management", description: "Onboarded 15 new volunteers in the North Region." },
        { date: "2023-06-05", type: "Communication", description: "Sent out a regional newsletter to 200 recipients." },
    ];
    return (
        <div className="p-6 w-full">
            <Breadcrumb items={breadcrumbItems} />
            <ProfileInfo fullName="Sarah Johnson" title="Coordinator" />
            <div className="flex justify-end items-center gap-4 mb-6">
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
                    onClick={() => navigate('/admin/CoordinatorManagement/CoordinatorProfile/AssignLeader')}
                    variant="primary"
                />
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
            <PersonalInfo personalInfo={personalInfo} />
            <div>
                <h1 className="font-semibold text-xl p-5">Roles & Responsibilities</h1>
                <hr />
                <ul className="grid grid-cols-2">
                    {responsibilities.map((Info, index) => (
                        <li key={index} className="p-5">
                            <p className="text-[#61758A]">{Info.key}</p>
                            <p>{Info.value}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <p className="font-semibold text-xl p-5">Activity History</p>
            <Activities activitiesData={activitiesData} />
        </div>
    );
}

export default CoordinatorProfile;