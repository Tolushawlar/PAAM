function ListingCard({ image, text, subtext, onClick}) {
  return (
    <div className="flex items-center h-16 gap-4 p-4 bg-white shadow rounded-xl"   onClick={onClick}>
      {/* Image */}
      <img
        src={image}
        alt={text}
        className="w-12 h-12 rounded-full object-cover"
      />

      {/* Info */}
      <div>
        <p className="font-semibold text-sm">{text}</p>
        <p className="text-gray-600 text-xs">{subtext}</p>
      </div>
    </div>
  );
}

export default ListingCard;
