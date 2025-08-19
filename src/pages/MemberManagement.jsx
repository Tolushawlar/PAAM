import SearchBar from "../components/SearchBar";
import Button from "../components/Button";

function MemberManagement() {
    return ( 
        <div className="p-6">
            <div className="flex justify-between mb-3">
                <h1 className="font-bold text-3xl pb-5">Members</h1>
                <Button title="Add Member" />
            </div>
            <div>
                <SearchBar/>
            </div>
        </div>
     );
}

export default MemberManagement;