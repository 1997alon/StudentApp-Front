import React from 'react';

// this code was repeated so I made it a component for reuse
// A component for filtering the list of student
// main purpose making the code separating and cleaner.
const FilterForm = ({ 
    filterField, filterValue, department, departments, 
    handleFilterFieldChange, handleFilterValueChange, handleDepartmentChange, 
    handleFilterSubmit, canSubmit 
}) => (
    <form onSubmit={handleFilterSubmit}>
        <div>
            <label>Filter By: </label>
            <select onChange={handleFilterFieldChange} value={filterField} required>
                <option value="firstName">First Name</option>
                <option value="lastName">Last Name</option>
                <option value="department">Department</option>
            </select>
        </div>
        <div>
            <label>Filter Value: </label>
            {filterField === 'department' ? (
                <select onChange={handleDepartmentChange} value={department} required>
                    <option value="">Select Department</option>
                    {departments.map((dept, index) => (
                        <option key={index} value={dept}>
                            {dept}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type="text"
                    onChange={handleFilterValueChange}
                    value={filterValue}
                    placeholder="Enter value"
                />
            )}
        </div>
        <button type="submit" disabled={!canSubmit()}>Apply Filter</button>
    </form>
);

export default FilterForm;
