//import npm components
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import swal from "sweetalert";

// import css
import "../css/Home.css";

//import SPA JSX components
import { Header } from "../components/Header";
import { LeftNav } from "../components/LeftNav";
import { Cohorts } from "../components/Cohorts";
import { Students } from "../components/Students";
import { StudentInfo } from "../components/StudentInfo";
import { AddStudents } from "../components/AddStudents";
// import { GroupCreator } from "../components/GroupCreator";
// import { Averages } from "../components/Averages";
// import { Assessments } from "../components/Assessments";
// import { Projects } from "../components/Projects";


export const Home = (props) => {
  const URL = "http://localhost:8000/api";

  const { isLoggedIn, setIsLoggedIn } = props;

  const [isLoadingCourses, setIsLoadingCourses] = useState(true);

  //display state used to display the component set to this state
  const [selectedComponent, setSelectedComponent] = useState("");

  //cohort states
  const [cohorts, setCohorts] = useState([]);
  const [cohortName, setCohortName] = useState(null);

  //student states
  const [clickedStudent, setClickedStudent] = useState();
  const [studentData, setStudentData] = useState([]);

  //assignment score states
  const [learnAvg, setLearnAvg] = useState(0);
  const [loopsAvg, setLoopsAvg] = useState(0);
  const [funAvg, setFunAvg] = useState(0);
  const [arraysAvg, setArraysAvg] = useState(0);
  const [objAvg, setObjAvg] = useState(0);
  const [domApiAvg, setDomApiAvg] = useState(0);
  const [ssAvg, setSsAvg] = useState(0);
  const [sDbAvg, setSDbAvg] = useState(0);
  const [reactAvg, setReactAvg] = useState(0);

  //props passed to all SPA JSX components
const propsForAll = {
  cohorts: cohorts,
  cohortName: cohortName, 
  setCohortName: setCohortName,
  studentData: studentData,
  setSelectedComponent: setSelectedComponent,
  getCohortStudents: getCohortStudents
}

  //sets the averages props to one name for readability
  const avgProps = {
    learnAvg: learnAvg,
    setLearnAvg: setLearnAvg,
    loopsAvg: loopsAvg,
    setLoopsAvg: setLoopsAvg,
    funAvg: funAvg,
    setFunAvg: setFunAvg,
    arraysAvg: arraysAvg,
    setArraysAvg: setArraysAvg,
    objAvg: objAvg,
    setObjAvg: setObjAvg,
    domApiAvg: domApiAvg,
    setDomApiAvg: setDomApiAvg,
    ssAvg: ssAvg,
    setSsAvg: setSsAvg,
    sDbAvg: sDbAvg,
    setSDbAvg: setSDbAvg,
    reactAvg: reactAvg,
    setReactAvg: setReactAvg,
  };

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

  // Fetch and set cohorts data
  useEffect(() => {
    fetch(`${URL}/cohorts`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
      .then((result) => result.json())
      .then((data) => {
        setCohorts(data);
        setSelectedComponent("Cohorts");
      });
  }, []);

  const handleLinkClicked = (component) => {
    setSelectedComponent(component);
  };

  function getCohortStudents(cohortName) {
    setStudentData([]);
    fetch(`${URL}/students/${cohortName}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
      .then((result) => result.json())
      .then((data) => {
        // console.log(data)
        setStudentData(data);
        setSelectedComponent("Students");
      });
  }

  return (
    <div id="home">
      <Header
        style={{ display: "flex", flexFlow: "row nowrap", position: "fixed" }}
      />
      <div style={{ display: "flex", flexFlow: "row nowrap" }}>
        <LeftNav
          id="navBar"
          handleLinkClicked={handleLinkClicked}
          style={{ color: "black" }}
        />
        {selectedComponent === "Cohorts" && (
          <Cohorts
            setStudentData={setStudentData}
            {...propsForAll}
          />
        )}
        {selectedComponent === "Students" && (
          <Students
            clickedStudent={clickedStudent}
            setClickedStudent={setClickedStudent}
            {...propsForAll}
            {...avgProps}
          />
        )}
        {selectedComponent === "Add Students" && (
          <AddStudents
          {...propsForAll}
            getCohortStudents={getCohortStudents}

          />
        )}
        {selectedComponent === "Student Info" && (
          <StudentInfo
          clickedStudent={clickedStudent}
          setClickedStudent={setClickedStudent}
          {...propsForAll}
          />
        )}
        {/* {selectedComponent === "Group Creator" && (
          <GroupCreator {...propsForAll} />
        )}
        {selectedComponent === "Averages" && (
          <Averages {...propsForAll} {...avgProps} />
        )}
        {selectedComponent === "Assessments" && (
          <Assessments {...propsForAll} />
        )}
        {selectedComponent === "Projects" && (
          <Projects {...propsForAll} />
        )} */}
      </div>
    </div>
  );
};
