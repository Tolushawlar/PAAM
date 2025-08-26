import MemberListing from "../../components/ListingCard";
import Pagination from "../../UI/Pagination";
import Image from "../../assets/profile-picture-sm.svg"
import SearchBar from "../../UI/SearchBar";



function CoordinatorMembersDirectory() {
  // Dummy members list (10 items)
  const members = [
    { id: 1, name: "Ethan Walker", expertise: "Data Analysis", pic: Image },
    { id: 2, name: "Sophia Bennett", expertise: "Community Development", pic: Image },
    { id: 3, name: "Lucas Carter", expertise: "Youth Empowerment", pic: Image },
    { id: 4, name: "Isabella Hayes", expertise: "Financial Literacy", pic: Image },
    { id: 5, name: "Owen Foster", expertise: "Healthcare Advocacy", pic: Image },
    { id: 6, name: "Ava Johnson", expertise: "Environmental Awareness", pic: Image },
    { id: 7, name: "Mason Rivera", expertise: "Education Programs", pic: Image },
    { id: 8, name: "Olivia Brooks", expertise: "Technology Training", pic: Image },
    { id: 9, name: "Liam Mitchell", expertise: "Public Speaking", pic: Image },
    { id: 10, name: "Emma Thompson", expertise: "Volunteer Coordination", pic: Image},
  ];

  return (
    <div className="p-6 w-full space-y-12">
      {/* Header */}
       <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Member Directory</h1>
        <p className="text-gray-600">Explore our community of professionals. Use the search and filters to find members by name, expertise, or location. Connect and collaborate with peers across the globe.</p>
      </div>

      {/* searchbar */}
      <div>
        <SearchBar placeholder = "by name, username, or keywords"/>
      </div>


      {/* Members List */}
      <div className="space-y-4">
        <p className="text-xl font-semibold">Member Listings</p>
        {members.map((member) => (
          <MemberListing
            key={member.id}
            image={member.pic}
            text={member.name}
            subtext={member.expertise}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination />
      </div>
    </div>
  );
}

export default CoordinatorMembersDirectory;
