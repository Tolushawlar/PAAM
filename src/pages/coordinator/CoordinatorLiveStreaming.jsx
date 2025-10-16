import { useState, useEffect } from "react";
import MeetingCard from "../../components/MeetingCard";

function CoordinatorLiveStreaming() {
  const [streams, setStreams] = useState(() => {
    const cached = localStorage.getItem('coordinatorLiveStreams');
    return cached ? JSON.parse(cached) : [];
  });
  const [loading, setLoading] = useState(() => {
    const cached = localStorage.getItem('coordinatorLiveStreams');
    return !cached;
  });

  useEffect(() => {
    // Only load from cache, no automatic API calls
    const cached = localStorage.getItem('coordinatorLiveStreams');
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
      console.log('Coordinator Live Streams API Response:', result);
      if (result.status === "success" && result.data) {
        setStreams(result.data);
        localStorage.setItem('coordinatorLiveStreams', JSON.stringify(result.data));
      }
    } catch (error) {
      console.error("Error fetching streams:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshStreams = () => {
    setLoading(true);
    localStorage.removeItem('coordinatorLiveStreams');
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

  const liveStreams = streams.filter(isStreamLive);
  const upcomingStreams = streams.filter(isStreamUpcoming);
  const pastStreams = streams.filter(isStreamEnded);

  return (
    <div className="space-y-12 p-6 w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Streaming</h1>
            <p className="text-gray-600">Welcome to the PAAM Global Digital Hub's live streaming page. Here, you can join our live events, participate in real-time discussions, and access recordings of past streams. Stay connected with our community and never miss an important event.</p>
          </div>
          <button
            onClick={refreshStreams}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#b8144a]"></div>
        </div>
      ) : (
        <>
          {/* Current Live Streams */}
          {liveStreams.length > 0 && (
            <div className="space-y-6">
              <p className="text-xl font-semibold text-red-600">🔴 LIVE NOW</p>
              {liveStreams.map(stream => (
                <div key={stream.stream_id} className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{stream.title}</h3>
                  <p className="text-gray-600 mb-4">Started: {new Date(stream.start_time).toLocaleString()}</p>
                  <div className="flex items-center gap-4">
                    <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-800">
                      LIVE
                    </span>
                    <span className="inline-flex px-3 py-1 text-sm font-mono bg-blue-100 text-blue-800 rounded">
                      Code: {stream.stream_code}
                    </span>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                      Watch Stream
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upcoming Streams */}
          {upcomingStreams.length > 0 && (
            <div className="space-y-6">
              <p className="text-xl font-semibold">Upcoming Streams</p>
              {upcomingStreams.map(stream => (
                <MeetingCard
                  key={stream.stream_id}
                  title={stream.title}
                  info={`Starts: ${new Date(stream.start_time).toLocaleString()}`}
                  time={stream.end_time ? `Ends: ${new Date(stream.end_time).toLocaleString()}` : 'No end time set'}
                />
              ))}
            </div>
          )}

          {/* Past Streams */}
          {pastStreams.length > 0 && (
            <div className="space-y-6">
              <p className="text-xl font-semibold">Past Streams</p>
              {pastStreams.map(stream => (
                <div key={stream.stream_id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{stream.title}</h3>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      Recorded
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Streamed: {new Date(stream.start_time).toLocaleString()} - {new Date(stream.end_time).toLocaleString()}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="inline-flex px-3 py-1 text-sm font-mono bg-gray-100 text-gray-800 rounded">
                      Code: {stream.stream_code}
                    </span>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                      Watch Recording
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {streams.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500">No live streams available at the moment.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CoordinatorLiveStreaming;