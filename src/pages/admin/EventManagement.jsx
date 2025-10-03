import { useState } from "react";
import Button from "../../UI/Button";
import InputField from "../../UI/InputField";
import SearchBar from "../../UI/SearchBar";

function EventManagement() {
    const [events] = useState([
        {
            id: 1,
            title: "CFN Monthly Meeting",
            date: "March 15, 2024",
            time: "2:00 PM - 3:30 PM",
            location: "Main Hall",
            status: "Upcoming"
        },
        {
            id: 2,
            title: "Leadership Training Workshop",
            date: "March 20, 2024", 
            time: "10:00 AM - 4:00 PM",
            location: "Conference Room A",
            status: "Upcoming"
        },
        {
            id: 3,
            title: "Community Outreach",
            date: "February 28, 2024",
            time: "9:00 AM - 12:00 PM", 
            location: "Community Center",
            status: "Completed"
        }
    ]);

    return (
        <div className="p-6 w-full space-y-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Event Management</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage and organize events for your organization.</p>
            </div>

            <div className="flex justify-between items-center">
                <SearchBar placeholder="Search events..." />
                <Button title="Create Event" />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Event</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date & Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {events.map((event) => (
                                <tr key={event.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{event.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 dark:text-gray-100">{event.date}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{event.time}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        {event.location}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                            event.status === 'Upcoming' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {event.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex gap-2">
                                            <Button title="Edit" variant="outline" />
                                            <Button title="Delete" variant="outline" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default EventManagement;