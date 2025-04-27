// SelectOptions.js
import React from 'react';

// this code was repeated so I made it a component for reuse
// A compnonent who show the options of the table student.
// separating code.
const SelectOptions = () => {
  const options = [
    { value: 'id', label: 'ID' },
    { value: 'firstName', label: 'First Name' },
    { value: 'lastName', label: 'Last Name' },
    { value: 'email', label: 'Email' },
    { value: 'department', label: 'Department' },
    { value: 'gpa', label: 'GPA' },
  ];

  return (
    <>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </>
  );
};

export default SelectOptions;
