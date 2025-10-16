import { useState, useEffect } from "react";
import Button from "../../UI/Button";
import InputField from "../../UI/InputField";
import SearchBar from "../../UI/SearchBar";

function EventManagement() {
    const [events, setEvents] = useState(() => {
        const cached = localStorage.getItem('eventManagementEvents');
        return cached ? JSON.parse(cached) : [];
    });
    const [cfnGroups, setCfnGroups] = useState(() => {
        const cached = localStorage.getItem('eventManagementCfnGroups');
        return cached ? JSON.parse(cached) : [];
    });
    const [members, setMembers] = useState(() => {
        const cached = localStorage.getItem('eventManagementMembers');
        return cached ? JSON.parse(cached) : [];
    });
    const [loading, setLoading] = useState(() => {
        const cachedEvents = localStorage.getItem('eventManagementEvents');
        const cachedGroups = localStorage.getItem('eventManagementCfnGroups');
        const cachedMembers = localStorage.getItem('eventManagementMembers');
        return !(cachedEvents && cachedGroups && cachedMembers);
    });
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showAttendanceModal, setShowAttendanceModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [attendance, setAttendance] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        cfn_id: '',
        title: '',
        meeting_time: '',
        location_details: ''
    });

    const refreshData = () => {
        setLoading(true);
        localStorage.removeItem('eventManagementEvents');
        localStorage.removeItem('eventManagementCfnGroups');
        localStorage.removeItem('eventManagementMembers');
        fetchEvents();
        fetchCfnGroups();
        fetchMembers();
    };

    useEffect(() => {
        // Only load from cache, no automatic API calls
        const cachedEvents = localStorage.getItem('eventManagementEvents');
        const cachedGroups = localStorage.getItem('eventManagementCfnGroups');
        const cachedMembers = localStorage.getItem('eventManagementMembers');
        
        if (cachedEvents && cachedGroups && cachedMembers) {
            setLoading(false);
        }
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch("/v1/admin?endpoint=selectentry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
                },
                body: JSON.stringify({ table: "cfn_meetings" }),
            });

            const result = await response.json();
            console.log('Events API Response:', result);
            if (result.status === "success" && result.data) {
                setEvents(result.data);
                localStorage.setItem('eventManagementEvents', JSON.stringify(result.data));
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCfnGroups = async () => {
        try {
            const response = await fetch("/v1/admin?endpoint=selectentry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
                },
                body: JSON.stringify({ table: "cfn_groups" }),
            });

            const result = await response.json();
            console.log('CFN Groups API Response:', result);
            if (result.status === "success" && result.data) {
                setCfnGroups(result.data);
                localStorage.setItem('eventManagementCfnGroups', JSON.stringify(result.data));
            }
        } catch (error) {
            console.error("Error fetching CFN groups:", error);
        }
    };

    const fetchMembers = async () => {
        try {
            const response = await fetch("/v1/admin?endpoint=listusers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
                },
                body: JSON.stringify({}),
            });

            const result = await response.json();
            console.log('Members API Response:', result);
            if (result.status === "success" && result.data) {
                const memberData = result.data.filter(user => user.user_roles === 3);
                setMembers(memberData);
                localStorage.setItem('eventManagementMembers', JSON.stringify(memberData));
            }
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    };

    const createEvent = async () => {
        try {
            const response = await fetch("/v1/admin?endpoint=addentry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
                },
                body: JSON.stringify({
                    table: "cfn_meetings",
                    data: formData
                }),
            });

            const result = await response.json();
            if (result.status === "success") {
                alert('Event created successfully!');
                setShowCreateForm(false);
                setFormData({
                    cfn_id: '',
                    title: '',
                    meeting_time: '',
                    location_details: ''
                });
                fetchEvents();
            } else {
                alert('Error creating event: ' + (result.message || 'Unknown error'));
            }
        } catch (error) {
            console.error("Error creating event:", error);
            alert('Error creating event. Please try again.');
        }
    };

    const updateAttendance = async () => {
        const presentMembers = Object.keys(attendance).filter(id => attendance[id]);
        
        try {
            const response = await fetch("/v1/admin?endpoint=updateentry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
                },
                body: JSON.stringify({
                    table: "cfn_meetings",
                    id: selectedEvent.id,
                    attendance: JSON.stringify(presentMembers)
                }),
            });

            const result = await response.json();
            if (result.status === "success") {
                alert('Attendance updated successfully!');
                setShowAttendanceModal(false);
                fetchEvents();
            } else {
                alert('Error updating attendance: ' + (result.message || 'Unknown error'));
            }
        } catch (error) {
            console.error("Error updating attendance:", error);
            alert('Error updating attendance. Please try again.');
        }
    };

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleAttendanceChange = (memberId) => {
        setAttendance(prev => ({
            ...prev,
            [memberId]: !prev[memberId]
        }));
    };

    const openAttendanceModal = (event) => {
        setSelectedEvent(event);
        const currentAttendance = {};
        if (event.attendance) {
            try {
                const attendeeIds = JSON.parse(event.attendance);
                attendeeIds.forEach(id => {
                    currentAttendance[id] = true;
                });
            } catch (e) {
                console.error('Error parsing attendance:', e);
            }
        }
        setAttendance(currentAttendance);
        setShowAttendanceModal(true);
    };

    return (
        <div className="p-6 w-full space-y-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Event Management</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage and organize events for your organization.</p>
            </div>

            <div className="space-y-4">
                <SearchBar 
                    placeholder="Search events..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex justify-end gap-3">
                    <button
                        onClick={refreshData}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Refresh
                    </button>
                    <Button 
                        title="Create Event" 
                        onClick={() => setShowCreateForm(true)}
                    />
                </div>
            </div>

            {/* Create Event Form */}
            {showCreateForm && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Create New Event
                        </h2>
                        <button
                            onClick={() => setShowCreateForm(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            ×
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                CFN Group
                            </label>
                            <select
                                value={formData.cfn_id}
                                onChange={handleInputChange('cfn_id')}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                required
                            >
                                <option value="">Select CFN Group</option>
                                {cfnGroups.map(group => (
                                    <option key={group.id} value={group.id}>
                                        {group.group_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Event Title
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={handleInputChange('title')}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Meeting Time
                            </label>
                            <input
                                type="datetime-local"
                                value={formData.meeting_time}
                                onChange={handleInputChange('meeting_time')}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Location Details
                            </label>
                            <input
                                type="text"
                                value={formData.location_details}
                                onChange={handleInputChange('location_details')}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <Button title="Create Event" onClick={createEvent} />
                        <Button 
                            title="Cancel" 
                            variant="outline" 
                            onClick={() => setShowCreateForm(false)} 
                        />
                    </div>
                </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Event</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date & Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">CFN Group</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#b8144a] mx-auto"></div>
                                    </td>
                                </tr>
                            ) : events.filter(event => 
                                !searchTerm || 
                                event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                event.location_details?.toLowerCase().includes(searchTerm.toLowerCase())
                            ).map((event) => (
                                <tr key={event.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{event.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 dark:text-gray-100">
                                            {new Date(event.meeting_time).toLocaleDateString()}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(event.meeting_time).toLocaleTimeString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        {event.location_details}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                            Group {event.cfn_id}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex gap-2">
                                            <Button 
                                                title="View Attendance" 
                                                variant="outline" 
                                                onClick={() => openAttendanceModal(event)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Attendance Modal */}
            {showAttendanceModal && selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 max-h-96 overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                Mark Attendance - {selectedEvent.title}
                            </h2>
                            <button
                                onClick={() => setShowAttendanceModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        </div>
                        <div className="space-y-2 mb-6">
                            {members.map(member => {
                                const isPresent = attendance[member.id] || false;
                                return (
                                    <div key={member.id} className="flex items-center justify-between p-2 border rounded">
                                        <span className="text-sm text-gray-900 dark:text-gray-100">
                                            {member.firstname} {member.lastname}
                                        </span>
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            isPresent 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {isPresent ? 'Present' : 'Absent'}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex gap-3">
                            <Button 
                                title="Close" 
                                onClick={() => setShowAttendanceModal(false)} 
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EventManagement;