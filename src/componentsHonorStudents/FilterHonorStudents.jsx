import { useEffect, useState } from "react";
import { getDepartments } from "../api/student";  
import { getHighestGpaStudentsPerDepartment } from "../api/honorStudent"; // Updated API function for fetching top students
import HonorStudentsTable from "./HonorStudentsTable"; 

// A component for filtering students
const FilterHonorStudents = ({ setShowFilter, showFilter }) => {
    const [departments, setDepartments] = useState([]);  
    const [filteredStudents, setFilteredStudents] = useState([]); 

    // Reset when the whole list is shown
    useEffect(() => {
        if (!showFilter) {
            setFilteredStudents([]);
        }
    }, [showFilter]); 

    // Show the department options
    useEffect(() => {
        getDepartments()
            .then(data => {
                if (data.success) {
                    const departmentNames = data.data.map(dep => dep.name);
                    setDepartments(departmentNames);  
                } else {
                    alert(data.message);  
                }
            })
            .catch(error => {
                console.error("Error fetching departments:", error);
                alert("Failed to fetch departments.");
            });
    }, []);

    const handleFilterClick = () => {
        getHighestGpaStudentsPerDepartment()
            .then(data => {
                if (data.success) {
                    setFilteredStudents(data.data); // Set the excellent students for each department
                    setShowFilter(true); // Show the filtered list
                } else {
                    alert(data.message);  
                }
            })
            .catch(error => {
                console.error("Error fetching highest GPA students:", error);
                alert("Failed to fetch the excellent students.");
            });
    };

    return (
        <div className="filter-honor-students">
            <button onClick={handleFilterClick}>Filter Excellent Students by Department</button>

            {showFilter && <HonorStudentsTable students={filteredStudents} />}
        </div>
    );
};

export default FilterHonorStudents;
