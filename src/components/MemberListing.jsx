function MemberListing({ profilePic, fullName, expertise }) {
  return (
    <div className="flex items-center h-16 gap-4 p-4 bg-white shadow rounded-xl">
      {/* Profile Image */}
      <img
        src={profilePic}
        alt={fullName}
        className="w-12 h-12 rounded-full object-cover"
      />

      {/* Info */}
      <div>
        <p className="font-semibold text-sm">{fullName}</p>
        <p className="text-gray-600 text-xs">{expertise}</p>
      </div>
    </div>
  );
}

export default MemberListing;
