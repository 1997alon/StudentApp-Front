import React from 'react';

// A component the show the honor student table.
const HonorStudentsTable = ({ students }) => {
    if (students.length === 0) {
        return (
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Department</th>
                        <th>GPA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="3">No students found.</td>
                    </tr>
                </tbody>
            </table>
        );
    }

    return (
        <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Department</th>
                    <th>GPA</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student, index) => (
                    <tr key={index}>
                        <td>{student.email}</td>
                        <td>{student.department}</td>
                        <td>{student.gpa}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default HonorStudentsTable;
