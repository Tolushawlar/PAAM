import videoImage from "../../assets/videoImage.svg"
import streamImage1 from "../../assets/streamImage1.svg"
import streamImage2 from "../../assets/streamImage2.svg"
import MeetingCard from "../../components/MeetingCard";






function UserLiveStreaming() {
  return (
    <div className="space-y-12 p-6 w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Streaming</h1>
        <p className="text-gray-600">Welcome to the PAAM Global Digital Hub's live streaming page. Here, you can join our live events, participate in real-time discussions, and access recordings of past streams. Stay connected with our community and never miss an important event.</p>
      </div>

      {/* video Section */}
      <div className="space-y-6">
        {/* <video src={videoImage}></video> */}
      </div>

      {/*Current Stream Section */}
      <div className="space-y-6">
        <p className="text-lg font-semibold">Current Live Stream: PAAM Global Leadership Summit</p>
        <MeetingCard
          title="Join us for the PAAM Global Leadership Summit, featuring keynote speakers, panel discussions, and interactive workshops. This event is designed to empower leaders and foster collaboration within our community. The stream is currently live, and you can participate in the live chat alongside the video player."
          time="Date and Time: July 26, 2024, 10:00 AM - 4:00 PM (EST)"
        />
      </div>

      {/* Upcoming Streams Section*/}
      <div className="space-y-6">
        <p className="text-lg font-semibold">Upcoming Streams</p>
        <div>
          <MeetingCard
            title="Community Town Hall"
            time="August 15, 2024,2:00 PM (EST)"
          />
        </div>

        <div>
          <MeetingCard
            title="Member Spotlight Series"
            time="September 5, 2024,11:00 AM (EST)"
          />
        </div>
      </div>

      {/* Past Streams Section*/}
      <div className="space-y-6">
        <p className="text-lg font-semibold">Past Streams</p>
        <div>
          <MeetingCard
            method="Recorded Stream"
            title="CFN Center Meeting"
            info="Watch the full recording of our annual conference, featuring highlights from keynote speeches, workshops, and networking sessions."
            image={streamImage1}
          />
        </div>

        <div>
          <MeetingCard
            method="Recorded Stream"
            title="Community Outreach Event"
            info="Access the recording of our recent leadership training webinar, covering essential skills and strategies for effective leadership."
            image={streamImage2}
          />
        </div>
      </div>

    </div>
  );
}

export default UserLiveStreaming;