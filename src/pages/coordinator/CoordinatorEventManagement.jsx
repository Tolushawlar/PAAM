import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../UI/Button";
import SearchBar from "../../UI/SearchBar";

function CoordinatorEventManagement() {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAttendanceModal, setShowAttendanceModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [attendance, setAttendance] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCoordinatorEvents();
        fetchMembers();
    }, [user]);

    const fetchCoordinatorEvents = async () => {
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
            if (result.status === "success" && result.data) {
                // Filter events for coordinator's groups
                const coordinatorEvents = result.data.filter(event => {
                    // This would need to be filtered by coordinator's CFN groups
                    return true; // For now, show all events
                });
                setEvents(coordinatorEvents);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
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
            if (result.status === "success" && result.data) {
                setMembers(result.data.filter(user => user.user_roles === 3));
            }
        } catch (error) {
            console.error("Error fetching members:", error);
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
                fetchCoordinatorEvents();
            } else {
                alert('Error updating attendance: ' + (result.message || 'Unknown error'));
            }
        } catch (error) {
            console.error("Error updating attendance:", error);
            alert('Error updating attendance. Please try again.');
        }
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
                <p className="text-gray-600 dark:text-gray-400">Manage attendance for your CFN group events.</p>
            </div>

            <div className="flex justify-between items-center">
                <SearchBar 
                    placeholder="Search events..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Event</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date & Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center">
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex gap-2">
                                            <Button 
                                                title="Mark Attendance" 
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
                            {members.map(member => (
                                <div key={member.id} className="flex items-center justify-between p-2 border rounded">
                                    <span className="text-sm text-gray-900 dark:text-gray-100">
                                        {member.firstname} {member.lastname}
                                    </span>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={attendance[member.id] || false}
                                            onChange={() => handleAttendanceChange(member.id)}
                                            className="mr-2"
                                        />
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            Present
                                        </span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <Button title="Update Attendance" onClick={updateAttendance} />
                            <Button 
                                title="Cancel" 
                                variant="outline" 
                                onClick={() => setShowAttendanceModal(false)} 
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CoordinatorEventManagement;