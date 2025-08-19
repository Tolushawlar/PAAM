import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function MemberManagement() {
        const navigate = useNavigate();
            
        return (
            <div className="p-6">
                <div className="flex justify-between mb-3">
                    <h1 className="font-bold text-3xl pb-5">Members</h1>
                    <Button title="Add Member" onClick={() => navigate("/admin/MemberManagement/MemberProfile" )} />
                </div>
                <div>
                    <SearchBar />
                </div>
            </div>
        );
    }

    export default MemberManagement;