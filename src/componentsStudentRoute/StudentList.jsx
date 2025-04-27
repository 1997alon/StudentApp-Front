import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudents, getExcellentStudents } from '../api/student';  
import StudentsTable from './StudentsTable'; // <-- Add this import
import SelectOptions from './SelectOptions';


// A component for student list, can give or excellent student list or regular student list
// the excellent prop will determine that(true for excellent and false for regular)
const StudentList = ({ excellent }) => {
    const [students, setStudents] = useState([]);
    const [sortBy, setSortBy] = useState('id');
    const [direction, setDirection] = useState('asc');
    const [sortExcellentBy, setSortExcellentBy] = useState('gpa');
    const [directionExcellent, setDirectionExcellent] = useState('desc');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                if (excellent) {
                    const data = await getExcellentStudents(sortExcellentBy, directionExcellent); 
                    if (data.success) {
                        setStudents(data.data);  
                    } else {
                        alert(data.message);
                    }
                } else {
                    const data = await getStudents(sortBy, direction); 
                    if (data.success) {
                        setStudents(data.data);  
                    } else {
                        alert(data.message);
                    }
                }
            } catch (error) {
                console.error('Error fetching students:', error);
                alert('Failed to fetch students.');
            }
        };

        fetchStudents();
    }, [excellent, sortBy, direction, sortExcellentBy, directionExcellent]);

    const handleSortChange = (e) => setSortBy(e.target.value);
    const handleDirectionChange = (e) => setDirection(e.target.value);
    const handleSortExcellentChange = (e) => setSortExcellentBy(e.target.value);
    const handleDirectionExcellentChange = (e) => setDirectionExcellent(e.target.value);
    const handleEditClick = (student) => navigate('/update-student', { state: student });
    
    return (
        <div>
            <h2>{excellent ? "Excellent Students List Sort By:" : "Students List Sort By:"}</h2>
            {!excellent && (
                <div>
                    <label>Sort By: </label>
                    <select onChange={handleSortChange} value={sortBy}>
                       <SelectOptions />
                    </select>

                    <label>Direction: </label>
                    <select onChange={handleDirectionChange} value={direction}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            )}
            {excellent && (
                <div>
                    <label>Sort Excellent By: </label>
                    <select onChange={handleSortExcellentChange} value={sortExcellentBy}>
                        <SelectOptions />
                    </select>

                    <label>Direction: </label>
                    <select onChange={handleDirectionExcellentChange} value={directionExcellent}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            )}
            <StudentsTable students={students} handleEditClick={handleEditClick} />
        </div>
    );
};

export default StudentList;
