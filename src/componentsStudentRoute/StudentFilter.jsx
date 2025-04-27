import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { getFilteredStudents, getDepartments, getFilteredExcellentStudents } from '../api/student';
import { useNavigate } from 'react-router-dom';
import FilterForm from './FilterForm';
import StudentsTable from './StudentsTable';


// filter student list 
// A component that excellent student list and regular student list use
// props.excellent is the one who decide what to show, excellent or regular.
const StudentFilter = forwardRef((props, ref) => {
    const [filterField, setFilterField] = useState('firstName');
    const [filterValue, setFilterValue] = useState('');
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');
    const [showList, setShowList] = useState(false);
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();  

    useEffect(() => {
        getDepartments()
            .then(data => {
                if (data.success) {
                    const names = data.data.map(dep => dep.name);
                    setDepartments(names);
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching departments:', error);
                alert('Failed to fetch departments.');
            });
    }, []);

    const handleFilterFieldChange = (e) => setFilterField(e.target.value);
    const handleFilterValueChange = (e) => setFilterValue(e.target.value);
    const handleDepartmentChange = (e) => setDepartment(e.target.value);

    const handleReset = () => {
        setStudents([]);
        setFilterValue('');
        setError('');
        setShowList(false);
        setDepartment('');
    };

    const handleFilterSubmit = async (e) => {
        e.preventDefault();
        if (filterField === 'department') {
            if (!department) {
                setError('Please select a department.');
                return;
            }
        } else if (!filterValue) {
            setError('Please enter a value to filter.');
            return;
        }
        setError('');
        try {
            let data;
            if (filterField === 'department' && department) {
                data = props.excellent
                    ? await getFilteredExcellentStudents('department', department)
                    : await getFilteredStudents('department', department);
            } else {
                data = props.excellent
                    ? await getFilteredExcellentStudents(filterField, filterValue)
                    : await getFilteredStudents(filterField, filterValue);
            }

            if (data.success) {
                setStudents(data.data);
                setShowList(true);
                props.setShowList(false);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Failed to fetch filtered students.');
            console.error(error);
        }
    };

    const handleEditClick = (student) => navigate('/update-student', { state: student });

    useImperativeHandle(ref, () => ({ resetFilter: handleReset }));
    
    return (
        <div>
            <h2>{props.excellent ? "Filter Excellent Students" : "Filter Students"}</h2>
            <FilterForm 
                filterField={filterField}
                filterValue={filterValue}
                department={department}
                departments={departments}
                handleFilterFieldChange={handleFilterFieldChange}
                handleFilterValueChange={handleFilterValueChange}
                handleDepartmentChange={handleDepartmentChange}
                handleFilterSubmit={handleFilterSubmit}
                canSubmit={() => {
                    if (filterField === 'department') {
                        return department !== '';
                    }
                    return filterValue.trim() !== '';
                }}
            />
            {error && <p>{error}</p>}
            {showList && (
                <StudentsTable 
                    students={students} 
                    handleEditClick={handleEditClick} 
                />
            )}
        </div>
    );
});

export default StudentFilter;
