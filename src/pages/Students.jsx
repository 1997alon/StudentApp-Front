import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
import StudentList from "../componentsStudentRoute/StudentList";
import StudentFilter from "../componentsStudentRoute/StudentFilter";
import '../style/Students.css';


// The student route page, the default page when you are opening the app.
// manage the excellent students list and filter and regular students list and filter
// have the options to hide the lists
export default function Students() {
    const [filterApplied, setFilterApplied] = useState(false); 
    const [showList, setShowList] = useState(true); // show the regular list when filter not use
    const [showExcellent, setShowExcellent] = useState(true); // show the excellent list when filter not use
    const filterRef = useRef();  // for reset the filter list
    const filterExcellentRef = useRef(); // for reset the filter excellent list
    const [showWholeList, setShowWholeList] = useState(true); //show the whole filer + list of regular or not
    const [showExcellentList, setShowExcellentList] = useState(true); //show the whole filer + list of excellent or not

    const navigate = useNavigate(); 

    const handleAdd = () =>  {
        console.log("add here");
        navigate('/add-student'); 
    };

    // for reset the filter list
    const handleResetClick = () => {
        setFilterApplied(false); 
        setShowList(true);    
        if (filterRef.current) {
            filterRef.current.resetFilter(); 
        }
    };

    // for reset the filter excellent list
    const handleResetExcellentClick = () => {
        setFilterApplied(false); 
        setShowExcellent(true);    
        if (filterExcellentRef.current) {
            filterExcellentRef.current.resetFilter();   
        }
    };

    //show the excellent list
    const toggleShowExcellentList = () => { setShowExcellentList(prev => !prev); };
    const toggleShowList = () => { setShowWholeList(prev => !prev); };
    const handleHonorRoute = () => { navigate("/honor-candidates"); };
    // when you hide the list, the reset will happen automatically. 
    useEffect(() => {
        if (!showWholeList) handleResetClick();
    }, [showWholeList]);

    useEffect(() => {
        if (!showExcellentList) handleResetExcellentClick();
    }, [showExcellentList]);

    return (
        <div className="honor-students">
            <h1>Hello, Welcome To Students Route</h1>
            <button className="student-route" onClick={() => console.log("nothing")}>Student Route</button>
            <button className="honor-route-button" onClick={handleHonorRoute}>Honor Candidate Route</button>
            <br></br>
            <>
                <button className="add-student" onClick={handleAdd}>Add</button>
                <button onClick={toggleShowList}>
                    {showWholeList ? "Hide list" : "Show list"}
                </button>
                <button onClick={toggleShowExcellentList}>
                    {showExcellentList ? "Hide Excellent list" : "Show Excellent list"}
                </button>
                
            </>
            <br></br>
            {showWholeList && (
                <div className="show-list">
                {!showList && <button className="reset-student" onClick={handleResetClick}>Reset Filter</button>}
                <StudentFilter ref={filterRef} setShowList={setShowList} excellent={false} />
                
                {showList && <StudentList excellent={false} />}
                </div>
            )}
           
            <br></br>
            {showExcellentList && (
                <div className="show-excellent-list">
                {!showExcellent && <button className="reset-excellent-student" onClick={handleResetExcellentClick}>Reset Excellent Filter</button>}
                <StudentFilter ref={filterExcellentRef} setShowList={setShowExcellent} excellent={true} />
                {showExcellent && <StudentList excellent={true} />}   
                </div>
            )}
        
            <br></br>
        </div>
    );
}
