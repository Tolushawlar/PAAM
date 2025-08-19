function InfoCard({ title, number, percent, color }) {
    const handleTitle = title || ""
    const handleNumber = number || ""
    const handlePercent = percent || ""
    const handleColor = color || " "
    return (
        <div className={`flex flex-col gap-[8px] rounded-[8px] p-[24px] w-60 h-[142px] ${handleColor}`}>
            <p className="leading-[24px] font-medium text-[16px]">{handleTitle}</p>
            <p className="leading-[30px] font-bold text-[24px]">{handleNumber}</p>
            <p className="leading-[24px] font-medium text-[16px] text-[#088738]">{handlePercent}</p>
        </div>
    );
}

export default InfoCard;