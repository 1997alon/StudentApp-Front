import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HonorStudentsList from "../componentsHonorStudents/HonorStudentsList";
import FilterHonorStudents from "../componentsHonorStudents/FilterHonorStudents";
import '../style/HonorCandidate.css';


// honor candidate route, can get here from student route page and can back to student route page
// with return button
export default function HonorCandidate() {
    const navigate = useNavigate();
    const [showFilter, setShowFilter] = useState(false); // Single state to toggle components

    const handleReturn = () => navigate('/');

    return (
        <div className="honor-candidate">
            <h1>Hello, Welcome To Honor-Candidates Route</h1>
            <button className="student-route2" onClick={handleReturn}>Student Route</button>
            <button className="honor-route-button2" onClick={() => console.log("nothing")}>Honor Candidate Route</button>
            <br></br>
            <FilterHonorStudents setShowFilter={setShowFilter} showFilter={showFilter} />
            {!showFilter && <HonorStudentsList />}
            {showFilter && <button onClick={() => setShowFilter(false)}>Show Honor Students List</button>}
            <br></br>
        </div>
    );
}
