import React from 'react';


// give me the sorting method to use to sort column and direction.
const SortControls = ({ sortBy, direction, onSortChange, onDirectionChange }) => {
    return (
        <div style={{ marginBottom: "1rem" }}>
            <label>
                Sort By:
                <select value={sortBy} onChange={onSortChange}>
                    <option value="gpa">GPA</option>
                    <option value="email">Email</option>
                    <option value="department">Department</option>
                </select>
            </label>

            <label style={{ marginLeft: "1rem" }}>
                Direction:
                <select value={direction} onChange={onDirectionChange}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </label>
        </div>
    );
};

export default SortControls;
