import { useState, useEffect } from "react";
import Button from "../../UI/Button";
import InputField from "../../UI/InputField";

// Facebook Live Component
const FacebookLive = ({ videoUrl, title }) => {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, [videoUrl]);

  if (!videoUrl) return null;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div
        className="fb-video"
        data-href={videoUrl}
        data-width="500"
        data-show-text="false"
      ></div>
    </div>
  );
};

function AdminLiveStreaming() {
    const [streams, setStreams] = useState(() => {
        const cached = localStorage.getItem('adminLiveStreams');
        return cached ? JSON.parse(cached) : [];
    });
    const [loading, setLoading] = useState(() => {
        const cached = localStorage.getItem('adminLiveStreams');
        return !cached;
    });
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        stream_code: '',
        start_time: '',
        end_time: '',
        facebook_url: '',
        stream_type: 'internal'
    });

    useEffect(() => {
        // Only load from cache, no automatic API calls
        const cached = localStorage.getItem('adminLiveStreams');
        if (cached) {
            setLoading(false);
        }
    }, []);

    const fetchStreams = async () => {
        try {
            const response = await fetch("/v1/admin?endpoint=selectentry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
                },
                body: JSON.stringify({ table: "live_streams" }),
            });

            const result = await response.json();
            console.log('Live Streams API Response:', result);
            if (result.status === "success" && result.data) {
                setStreams(result.data);
                localStorage.setItem('adminLiveStreams', JSON.stringify(result.data));
            }
        } catch (error) {
            console.error("Error fetching streams:", error);
        } finally {
            setLoading(false);
        }
    };

    const createStream = async () => {
        try {
            const response = await fetch("/v1/admin?endpoint=addentry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
                },
                body: JSON.stringify({
                    table: "live_streams",
                    data: formData
                }),
            });

            const result = await response.json();
            console.log('Create Stream API Response:', result);
            if (result.status === "success") {
                alert('Live stream created successfully!');
                setShowCreateForm(false);
                setFormData({
                    title: '',
                    stream_code: '',
                    start_time: '',
                    end_time: '',
                    facebook_url: '',
                    stream_type: 'internal'
                });
                fetchStreams();
            } else {
                alert('Error creating stream: ' + (result.message || 'Unknown error'));
            }
        } catch (error) {
            console.error("Error creating stream:", error);
            alert('Error creating stream. Please try again.');
        }
    };

    const endStream = async (streamId) => {
        try {
            const response = await fetch("/v1/admin?endpoint=updateentry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
                },
                body: JSON.stringify({
                    table: "live_streams",
                    id: streamId,
                    end_time: new Date().toISOString().slice(0, 19).replace('T', ' ')
                }),
            });

            const result = await response.json();
            console.log('End Stream API Response:', result);
            if (result.status === "success") {
                alert('Stream ended successfully!');
                fetchStreams();
            }
        } catch (error) {
            console.error("Error ending stream:", error);
            alert('Error ending stream. Please try again.');
        }
    };

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const refreshStreams = () => {
        setLoading(true);
        localStorage.removeItem('adminLiveStreams');
        fetchStreams();
    };

    const isStreamLive = (stream) => {
        const now = new Date();
        const startTime = new Date(stream.start_time);
        const endTime = stream.end_time ? new Date(stream.end_time) : null;
        return startTime <= now && (!endTime || endTime > now);
    };

    const isStreamUpcoming = (stream) => {
        const now = new Date();
        const startTime = new Date(stream.start_time);
        return startTime > now;
    };

    const isStreamEnded = (stream) => {
        return stream.end_time && new Date(stream.end_time) <= new Date();
    };

    return (
        <div className="p-6 w-full space-y-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900">Live Streaming Management</h1>
                <p className="text-gray-600">Create and manage live streaming events for your organization.</p>
            </div>

            <div className="flex justify-end gap-3">
                <button
                    onClick={refreshStreams}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                    <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                </button>
                <Button 
                    title="Create Stream" 
                    onClick={() => setShowCreateForm(true)}
                />
            </div>

            {/* Create Stream Form */}
            {showCreateForm && (
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Create New Live Stream</h2>
                        <button
                            onClick={() => setShowCreateForm(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            ×
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Stream Title
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={handleInputChange('title')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Start Time
                            </label>
                            <input
                                type="datetime-local"
                                value={formData.start_time}
                                onChange={handleInputChange('start_time')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                End Time (Optional)
                            </label>
                            <input
                                type="datetime-local"
                                value={formData.end_time}
                                onChange={handleInputChange('end_time')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Stream Code
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={formData.stream_code}
                                    onChange={handleInputChange('stream_code')}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter stream code"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({
                                        ...prev,
                                        stream_code: Math.random().toString(36).substring(2, 10).toUpperCase()
                                    }))}
                                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                                >
                                    Generate
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <Button title="Create Stream" onClick={createStream} />
                        <Button 
                            title="Cancel" 
                            variant="outline" 
                            onClick={() => setShowCreateForm(false)} 
                        />
                    </div>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stream</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code/URL</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#b8144a] mx-auto"></div>
                                    </td>
                                </tr>
                            ) : streams.map((stream) => {
                                const isLive = isStreamLive(stream);
                                const isUpcoming = isStreamUpcoming(stream);
                                const isEnded = isStreamEnded(stream);
                                
                                return (
                                <tr key={stream.stream_id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{stream.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                            stream.stream_type === 'facebook' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {stream.stream_type === 'facebook' ? 'Facebook' : 'Internal'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {stream.stream_type === 'facebook' ? (
                                            <a href={stream.facebook_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">
                                                Facebook Live
                                            </a>
                                        ) : (
                                            <span className="inline-flex px-2 py-1 text-xs font-mono bg-gray-100 text-gray-800 rounded">
                                                {stream.stream_code}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {new Date(stream.start_time).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                            isLive ? 'bg-red-100 text-red-800' :
                                            isUpcoming ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {isLive ? 'LIVE' : isUpcoming ? 'Upcoming' : 'Ended'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex gap-2">
                                            {isLive && (
                                                <button
                                                    onClick={() => endStream(stream.stream_id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    End Stream
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Live Facebook Streams Display */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Active Facebook Live Streams</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {streams
                        .filter(stream => stream.stream_type === 'facebook' && isStreamLive(stream))
                        .map(stream => (
                            <FacebookLive 
                                key={stream.stream_id}
                                videoUrl={stream.facebook_url}
                                title={stream.title}
                            />
                        ))
                    }
                </div>
                {streams.filter(stream => stream.stream_type === 'facebook' && isStreamLive(stream)).length === 0 && (
                    <p className="text-gray-500 text-center py-8">No active Facebook Live streams</p>
                )}
            </div>
        </div>
    );
}

export default AdminLiveStreaming;