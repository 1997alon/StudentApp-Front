import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateStudent, getDepartments } from '../api/student';  // import getDepartments too
import '../style/AddStudent.css';


// update student page, to each student in student route there is a button for edit
const UpdateStudent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id, firstName, lastName, email, gpa, department } = location.state;
    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newLastName, setNewLastName] = useState(lastName);
    const [newEmail, setNewEmail] = useState(email);
    const [newGpa, setNewGpa] = useState(gpa);
    const [newDepartment, setNewDepartment] = useState(department);
    const [departments, setDepartments] = useState([]);  

    // Fetch my departments 
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const data = await getDepartments();
                if (data.success) {
                    const names = data.data.map(dep => dep.name);
                    setDepartments(names);
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Error fetching departments:', error);
                alert('Failed to fetch departments.');
            }
        };

        fetchDepartments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedStudent = {
            id: id,
            firstName: newFirstName,
            lastName: newLastName,
            email: newEmail,
            gpa: newGpa,
            department: newDepartment,
        };

        try {
            const response = await updateStudent(updatedStudent);
            if (response.success) {
                alert('Student updated successfully!');
                navigate('/'); 
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.error('Error updating student:', error);
            alert('Failed to update student.');
        }
    };

    const handleReturn = () => {
        navigate('/');
    };

    return (
        <div>
            <h2>Update Student</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name (Current: {firstName})</label><br/>
                    <input
                        type="text"
                        value={newFirstName}
                        onChange={(e) => setNewFirstName(e.target.value)}
                        required
                    />
                </div>
                <br/>
                <div>
                    <label>Last Name (Current: {lastName})</label><br/>
                    <input
                        type="text"
                        value={newLastName}
                        onChange={(e) => setNewLastName(e.target.value)}
                        required
                    />
                </div>
                <br/>
                <div>
                    <label>Email (Current: {email})</label><br/>
                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        required
                    />
                </div>
                <br/>
                <div>
                    <label>GPA (Current: {gpa})</label><br/>
                    <input
                        type="number"
                        value={newGpa}
                        onChange={(e) => setNewGpa(e.target.value)}
                        required
                        min="0"
                        max="100"
                    />
                </div>
                <br/>
                <div>
                    <label>Department (Current: {department})</label><br/>
                    <select
                        value={newDepartment}
                        onChange={(e) => setNewDepartment(e.target.value)}
                        required
                    >
                        <option value="">Select Department</option>
                        {departments.map((dept, index) => (
                            <option key={index} value={dept}>
                                {dept}
                            </option>
                        ))}
                    </select>
                </div>
                <br/>
                <button type="submit">Update Student</button>
                <button type="button" onClick={handleReturn}>Return</button>
            </form>
        </div>
    );
};

export default UpdateStudent;
