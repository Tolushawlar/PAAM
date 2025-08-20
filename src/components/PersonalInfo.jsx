function PersonalInfo({personalInfo}) {
  return (
      <div>
          <h1 className="font-bold text-xl p-5">Personal Information</h1>
          <hr />
          <ul className="grid grid-cols-2">
              {personalInfo.map((Info, index) => (
                  <li key={index} className="p-5">
                      <p className="text-[#61758A]">{Info.key}</p>
                      <p>{Info.value}</p>
                  </li>
              ))}
           </ul>
      </div >
  );
}

export default PersonalInfo;