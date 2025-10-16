import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import ProgressBar from "../../components/ProgressBar";
import MeetingCard from "../../components/MeetingCard";
import TrainingDashboard from "../../components/TrainingDashboard";
import meetingImage3 from "../../assets/meetingImage3.svg"
import meetingImage4 from "../../assets/meetingImage4.svg"
import meetingImage5 from "../../assets/meetingImage5.svg"
import Button from "../../UI/Button";
import meetingImage1 from "../../assets/meetingImage1.svg"

export default function UserDashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [trainingProgress, setTrainingProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchTrainingProgress();
    }
  }, [user]);

  const fetchTrainingProgress = async () => {
    try {
      const response = await fetch("/v1/admin?endpoint=selectentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({
          table: "training_progress",
          user_id: user.id
        }),
      });

      const result = await response.json();
      if (result.status === "success" && result.data && result.data.length > 0) {
        const progress = result.data[0];
        const completionPercentage = progress.completed_at ? 100 : 60;
        setTrainingProgress({
          progress: completionPercentage,
          title: "Mandate Training",
          subtitle: progress.completed_at ? "Training completed!" : "Complete your certification modules"
        });
      } else {
        setTrainingProgress({
          progress: 0,
          title: "Mandate Training",
          subtitle: "Start your certification journey"
        });
      }
    } catch (error) {
      console.error("Error fetching training progress:", error);
      setTrainingProgress({
        progress: 0,
        title: "Mandate Training",
        subtitle: "Complete your certification modules"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
     <div className="w-full space-y-8 sm:space-y-16">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">{t('dashboard')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('welcome')} {user?.firstname || 'User'}.</p>
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
        {loading ? (
          <div className="flex items-center justify-center h-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#b8144a]"></div>
          </div>
        ) : trainingProgress ? (
          <ProgressBar
            progress={trainingProgress.progress}
            title={trainingProgress.title}
            subtitle={trainingProgress.subtitle}
          />
        ) : (
          <div className="text-center py-8 text-gray-500">
            No training progress found
          </div>
        )}
      </div>

      {/* Training Programs Dashboard */}
      <TrainingDashboard />

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
