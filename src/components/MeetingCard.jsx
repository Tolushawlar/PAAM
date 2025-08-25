import Button from "../UI/Button";

function MeetingCard({ 
  method, 
  title, 
  time, 
  info, 
  buttonTitle, 
  image, 
  imagePosition = "side" ,
  onClick
}) {
  return (    
    <div
      className={`flex bg-white rounded-lg shadow p-6 
      ${imagePosition === "top" ? "flex-col items-start" : "flex-row justify-between items-center"}`}
    >
      {/* Image at the top */}
      {image && imagePosition === "top" && (
        <div className="mb-4 w-full">
          <img 
            src={image} 
            alt="Meeting" 
            className="rounded-lg object-cover w-full"
          />
        </div>
      )}

      <div className="flex-1">
        {method && <p className="text-sm text-gray-600">{method}</p>}
        {title && <h4 className="font-medium text-gray-900">{title}</h4>}
        {time && <p className="text-sm text-gray-600">{time}</p>}
        {info && <p className="text-sm text-gray-600">{info}</p>}

        {buttonTitle && (
          <div className="mt-3">
            <Button title={buttonTitle} onClick={onClick}/>
          </div>
        )}
      </div>

      {/* Image at the side */}
      {image && imagePosition === "side" && (
        <div className="ml-4">
          <img 
            src={image} 
            alt="Meeting" 
            className="rounded-lg object-cover"
          />
        </div>
      )}
    </div>
  );
}

export default MeetingCard;
