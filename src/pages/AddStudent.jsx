import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import { getDepartments, addStudent } from '../api/student';
import '../style/AddStudent.css'

// add student page, when finish this page take you back to the student route page automatically
const AddStudent = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gpa, setGpa] = useState('');
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);

    const navigate = useNavigate();  

    // get the department for case of a change in the server
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
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const student = {
            firstName,
            lastName,
            email,
            gpa,
            department,
        };

        try {
            const response = await addStudent(student);
            if (response.data.success) {
                alert("Student added successfully! 🎉");
                navigate('/'); // return to students page
            } else {
                alert(`Oops! ${response.data.message}`);  
            }
        } catch (error) {
            console.error('Error adding student:', error);
            alert('Failed to add student.');
        }
    };

    const handleReturn = () => {
        navigate('/'); // return to student page
    };

    return (
        <div className='add-student'>
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <br></br>
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <br></br>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br></br>
                <input
                    type="number"
                    placeholder="GPA"
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                    step="1"
                    min="0"
                    max="100"
                    required
                />
                <br></br>
                <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                >
                    <option value="">Select Department</option>
                    {departments.map((dep, index) => (
                        <option key={index} value={dep}>
                            {dep}
                        </option>
                    ))}
                </select>

                <div>
                    <button type="submit" style={{ marginRight: "10px" }}>Add Student</button>
                    <button type="button" onClick={handleReturn}>Return</button> 
                </div>
            </form>
        </div>
    );
};

export default AddStudent;
