import streamImage1 from "../../assets/streamImage1.svg"
import streamImage2 from "../../assets/streamImage2.svg"
import meetingImage1 from "../../assets/meetingImage1.svg"
import meetingImage2 from "../../assets/meetingImage2.svg"
import MeetingCard from "../../components/MeetingCard";
import SearchBar from "../../UI/SearchBar";
import Button from "../../UI/Button";


function UserResources() {
    return (
        <div className="space-y-12 p-6 w-full">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Resources & Publications</h1>
                <p className="text-gray-600">Explore a comprehensive collection of resources designed to support your engagement with our platform and mission. Find publications, training materials, multimedia content, and practical tools to enhance your leadership and community involvement.</p>
            </div>


            {/* searchbar */}
            <div>
                <SearchBar placeholder="resources" />
            </div>

            {/* Publications Section */}
            <div className="space-y-6">
                <p className="text-lg font-semibold">Publications</p>
                    <MeetingCard
                        title="Annual Report 2023"
                        info="A comprehensive overview of our activities, achievements, and financial performance in the past year."
                        buttonTitle="Download (PDF)"
                        image={streamImage1}
                    />


                <MeetingCard
                    title="Leadership Newsletter - Summer Edition"
                    info="Stay updated with the latest insights, articles, and news in leadership development and community engagement."
                    buttonTitle="Read Online"
                    image={streamImage2}
                />


            </div>

            {/* Training Materials Section*/}
            <div className="space-y-6">
                <p className="text-lg font-semibold">Training Materials</p>
                    <MeetingCard
                        title="Community Engagement Guide"
                        info="A practical guide with strategies and best practices for effective community engagement and outreach."
                        buttonTitle="Download (PDF)"
                        image={streamImage1}
                    />


                <MeetingCard
                    title="Leadership Development Workbook"
                    info="A workbook with exercises and activities to enhance your leadership skills and personal development."
                    buttonTitle="Download (PDF)"
                    image={streamImage2}
                />


            </div>
            

            {/* Multimedia Section*/}
           <div className="space-y-6">
                <p className="text-lg font-semibold">Multimedia</p>
                    <MeetingCard
                        title="Webinar: Effective Communication Strategies"
                        info="Watch our webinar on mastering communication skills for leadership and community interaction."
                        buttonTitle="Watch Now"
                        image={streamImage1}
                    />


                <MeetingCard
                    title="Podcast: Insights from Community Leaders"
                    info="Listen to interviews with prominent community leaders sharing their experiences and insights."
                    buttonTitle="Listen Now"
                    image={streamImage2}
                />


            </div>
            
            {/*Tools & Templates Section*/}
           <div className="space-y-6">
                <p className="text-lg font-semibold">Tools & Templates</p>
                    <MeetingCard
                        title="Project Planning Template"
                        info="A customizable template to help you plan and manage your community projects effectively."
                        buttonTitle="Download (DOCX)"
                        image={streamImage1}
                    />


                <MeetingCard
                    title="Community Survey Template"
                    info="A template for conducting surveys to gather feedback and insights from your community."
                    buttonTitle="Download (DOCX)"
                    image={streamImage2}
                />


            </div>
            

        </div>
    );
}

export default UserResources;