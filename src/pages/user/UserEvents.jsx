import streamImage1 from "../../assets/streamImage1.svg"
import streamImage2 from "../../assets/streamImage2.svg"
import meetingImage1 from "../../assets/meetingImage1.svg"
import meetingImage2 from "../../assets/meetingImage2.svg"
import MeetingCard from "../../components/MeetingCard";


function UserEvents() {
    return (
        <div className="space-y-12 p-6 w-full">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Upcoming Events</h1>
                <p className="text-gray-600">Explore our curated list of upcoming events designed to enhance your skills, expand your network, and keep you informed about the latest trends in the industry. Join us for insightful sessions, workshops, and networking opportunities.</p>
            </div>

            {/* Featured Events Section */}
            <div className="space-y-6">
                <p className="text-lg font-semibold">Featured Events</p>
               <div className="flex">
                 <MeetingCard
                    title="Global Tech Summit 2024"
                    info="Join industry leaders and innovators at the premier tech event of the year."
                    image={streamImage1}
                    imagePosition="top"
                />


                <MeetingCard
                    title="Advanced Workshop on AI"
                    info="Enhance your AI skills with hands-on training from experts in the field."
                    image={streamImage2}
                    imagePosition="top"
                />


                <MeetingCard
                    title="Industry Leaders Networking Mixer"
                   info="Connect with peers and thought leaders in a relaxed and engaging atmosphere."
                    image={streamImage1}
                    imagePosition="top"
                />
               </div>
            </div>

            {/* Upcoming Streams Section*/}
            <div className="space-y-6">
                <p className="text-lg font-semibold">All Upcoming Events</p>
                    <MeetingCard
                        method="October 15, 2024"
                        title="Digital Marketing Masterclass"
                       info="Learn the latest digital marketing strategies and tactics from industry experts. This workshop covers SEO, social media, content marketing, and more."
                        image={meetingImage2 }
                    />
                  
                    <MeetingCard
                        method="November 5, 2024"
                        title="Data Science Summit"
                       info="Stay ahead of cyber threats with insights from leading cybersecurity professionals. Topics include threat intelligence, incident response, and data protection."
                        image={streamImage1 }
                    />

                      <MeetingCard
                        method="December 10, 2024"
                        title="Cybersecurity Conference"
                        info="Explore the latest advancements in data science, machine learning, and AI. Hear from top researchers and practitioners about their work and insights."
                        image={meetingImage2}
                    />
                
            </div>

            {/* Past Streams Section*/}
            <div className="space-y-6">
                <p className="text-lg font-semibold">Past Events</p>
                 <MeetingCard
                        method="September 20, 2024"
                        title="Innovation in Tech Forum"
                       info="A forum discussing the latest innovations in technology, featuring keynote speakers and panel discussions on emerging trends."
                        image={meetingImage1}
                    />
                     <MeetingCard
                        method="August 12, 2024"
                        title="Leadership Development Workshop"
                       info="A workshop focused on developing leadership skills, including communication, team building, and strategic thinking."
                        image={meetingImage2}
                    />
                     <MeetingCard
                        method="July 5, 2024"
                        title="Global Business Conference"
                        info="An international conference covering various aspects of global business, including market trends, international trade, and cross-cultural management."
                        image={streamImage2 }
                    />
               
            </div>

        </div>
    );
}

export default UserEvents;