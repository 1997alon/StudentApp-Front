import React from 'react';

// this code was repeated so I made it a component for reuse
// A components to show the table names
// for cleaner code
const StudentsTable = ({ students, handleEditClick }) => (
    <>
        {students.length > 0 ? (
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>GPA</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.email}</td>
                            <td>{student.department}</td>
                            <td>{student.gpa}</td>
                            <td>
                                <button onClick={() => handleEditClick(student)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p>No students found.</p>
        )}
    </>
);

export default StudentsTable;
