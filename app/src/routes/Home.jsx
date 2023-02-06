import "../css/Home.css";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import LeftNav from "../components/LeftNav";
import Cohorts from "../components/Cohorts";
import Students from "../components/Students";
import swal from "sweetalert";
import Display from "../components/Display";


export const Home = (props) => {
  const URL = "http://localhost:8000/api";
  const { isLoggedIn, setIsLoggedIn } = props;

  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [defaultCohort, setDefaultCohort] = useState(null);
  const [cohorts, setCohorts] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState("Cohorts");
  const [cohortName, setCohortName] = useState(null);
  
  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      setIsLoggedIn(true);
    } else {
      kickUser();
    }
  });

  function kickUser() {
    swal("Not Authenticated");
    sessionStorage.clear();
    setIsLoggedIn(false);
    swal("Not Authenticated");
    sessionStorage.clear();
    setIsLoggedIn(false);
  }

  //if user is not already logged in, they will be automatically navigated to the login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const getInitialCohortInfo = (id) =>{
    fetch(`${URL}/users/${id}/default-cohort`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
    .then((result) => result.json())
    .then((data) => console.log(data));


    // Fetch cohorts data
    fetch(`${URL}/cohorts`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
      .then((result) => result.json())
      .then((data) => setCohorts(data));

    // If user has a default cohort, fetch students data for that cohort and set state to display students
    if (cohortName) {
      getCohortStudents(cohortName);
      setSelectedComponent("Students");
    }
  }
  getInitialCohortInfo(sessionStorage.getItem('user_id'))
  }, []);

 function getCohortStudents(cohortName) {
    fetch(`${URL}/students/${cohortName}`)
        .then((result) => result.json())
        .then((data) => {
          setStudentData(data);
        });
  }
  

  const handleLinkClicked = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div id="home">
      <Header style={{ display: 'flex', flexFlow: 'row nowrap', position: 'fixed'}}/>  
      <div style={{ display: 'flex', flexFlow: 'row nowrap'}}>
        <LeftNav id='navBar' handleLinkClicked={handleLinkClicked}  style={{color: 'black'}}/>
        {selectedComponent === "Cohorts" && <Cohorts cohorts={cohorts} setCohortName={setCohortName} getCohortStudents={getCohortStudents(cohortName)} />} 
        {selectedComponent === "Students" && <Students cohortName={cohortName} studentData={studentData} />}
        {/* {selectedComponent === "Group Creator" && <GroupCreator students={students} />}
        {selectedComponent === "Averages" && <Averages students={students} />} 
        {selectedComponent === "Assessments" && <Assessments students={students} />}
        {selectedComponent === "Projects" && <Projects students={students} />} */}
        </div>
      </div>
  );
}
