import { useEffect, useState } from "react";
import { getHonorStudents } from "../api/honorStudent";
import SortControls from "./SortControls"; // Import SortControls component
import HonorStudentsTable from "./HonorStudentsTable"; // Import HonorStudentsTable component

// give me a list of the honor students
// like filterform in the student route.
const HonorStudentsList = () => {
    const [students, setStudents] = useState([]);
    const [sortBy, setSortBy] = useState('gpa');
    const [direction, setDirection] = useState('desc');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await getHonorStudents(sortBy, direction);
                if (data.success) {
                    setStudents(data.data);
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Error fetching students:', error);
                alert('Failed to fetch students.');
            }
        };
        fetchStudents();
    }, [sortBy, direction]);

    return (
        <div className="honor-student-list">
            <SortControls
                sortBy={sortBy}
                direction={direction}
                onSortChange={(e) => setSortBy(e.target.value)}
                onDirectionChange={(e) => setDirection(e.target.value)}
            />
            <HonorStudentsTable students={students} />
        </div>
    );
};

export default HonorStudentsList;
