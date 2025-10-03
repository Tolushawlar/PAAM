import React from "react";
import { useTranslation } from 'react-i18next';
import ProgressBar from "../../components/ProgressBar";
import MeetingCard from "../../components/MeetingCard";
import meetingImage3 from "../../assets/meetingImage3.svg"
import meetingImage4 from "../../assets/meetingImage4.svg"
import meetingImage5 from "../../assets/meetingImage5.svg"
import Button from "../../UI/Button";
import meetingImage1 from "../../assets/meetingImage1.svg"

export default function UserDashboard() {
  const { t } = useTranslation();
  
  return (
     <div className="w-full space-y-8 sm:space-y-16">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">{t('dashboard')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('welcome')} Sarah.</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button title={t('continueTraining')} />
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button title={t('findCFN')} variant="secondary" />
            <Button title={t('give')} variant="outline" />
          </div>
        </div>
      </div>

      {/* Training Progress */}
      <div className="space-y-4">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">{t('trainingProgress')}</h1>
        <ProgressBar
          progress={60}
          title="Mandate Training"
          subtitle="Complete your certification modules"
        />
      </div>

      {/* Upcoming Meetings */}
      <div className="space-y-4">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">{t('upcomingMeetings')}</h1>
        <MeetingCard
          title="CFN Monthly Meeting"
          date="March 15, 2024"
          time="2:00 PM - 3:30 PM"
          image={meetingImage1}
        />
      </div>

      {/* Recommended for You */}
      <div className="space-y-6">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">{t('recommendedForYou')}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1 */}
          <div className="flex flex-col items-center text-center space-y-3 card-base p-4">
            <img src={meetingImage3} alt="meetingImage3" className="w-full max-w-[200px]" />
            <p className="font-semibold text-gray-800 dark:text-gray-200">Worship and Its Impact</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Experience the transformative power of worship</p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center text-center space-y-3 card-base p-4">
            <img src={meetingImage4} alt="meetingImage4" className="w-full max-w-[200px]" />
            <p className="font-semibold text-gray-800 dark:text-gray-200">The Power of Prayer</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Learn effective prayer techniques</p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center text-center space-y-3 card-base p-4">
            <img src={meetingImage5} alt="meetingImage5" className="w-full max-w-[200px]" />
            <p className="font-semibold text-gray-800 dark:text-gray-200">Deep Dive into Scripture</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Unlock the wisdom of the Bible</p>
          </div>
        </div>
      </div>
    </div>

  );
}
