function MeetingCard({ title, date, time, image }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Upcoming Meetings</h3>
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600">{date}</p>
          <p className="text-sm text-gray-600">{time}</p>
        </div>
        <div className="ml-4">
          <img 
            src={image} 
            alt="Meeting" 
            className="w-16 h-16 rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default MeetingCard;