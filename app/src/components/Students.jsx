// import { StudentAverages } from "./StudentAverages";
// import { LoadingDropdown } from "./Loading";
// import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { ButtonGroup, Table, Badge } from "react-bootstrap";
import { useState, useEffect, Suspense } from "react";
// import { GenerateGroupsModal } from "../../../../back-again/unused_files/GenerateGroupsModal";
// import { StudentInfoModal } from "../../../../back-again/unused_files/StudentInfoModal";
// import { AssessmentModal } from "../../../../back-again/unused_files/AssessmentModal";


const Students = (props) => {

  //State courses is set in home
  const { courses, setCourses, isLoadingCourses, setIsLoadingCourses, studentData, cohortName, getCohortStudents } = props;

  // //set the cohort
  // const [cohort, setCohort] = useState(null);
  // //Assessment Averages
  // const [learnAvg, setLearnAvg] = useState(0);
  // const [loopsAvg, setLoopsAvg] = useState(0);
  // const [funAvg, setFunAvg] = useState(0);
  // const [arraysAvg, setArraysAvg] = useState(0);
  // const [objAvg, setObjAvg] = useState(0);
  // const [domApiAvg, setDomApiAvg] = useState(0);
  // const [ssAvg, setSsAvg] = useState(0);
  // const [sDbAvg, setSDbAvg] = useState(0);
  // const [reactAvg, setReactAvg] = useState(0);
  // // Show/Hide Student Info Modal
  // const [showStudentInfoModal, setShowStudentInfoModal] = useState(false);
  // // state for current student clicked
  // const [clickedStudent, setClickedStudent] = useState();
  // // useState for assessment grades and project grades
  // const [grades, setGrades] = useState([]);
  // // useState for learn grades
  // const [learnGrades, setLearnGrades] = useState([]);

  const URL = "http://localhost:8000";


    // open Student Info Modal function
    // const handleShowStudentInfoModal = (name) => {
    //   setClickedStudent(name);
    //   setShowStudentInfoModal(true);
    // };

  // //Does a fetch to get the users default cohort and a fetch to get all of the students and scores from the same
  // useEffect(() => {
  //   fetch(`${URL}/api/users/${sessionStorage.getItem("userId")}`, {
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
  //     },
  //   })
  //   .then((result) => result.json())
  //   .then((data) => setCohort(data.defaultCohort));

  //   let currentClass = sessionStorage.getItem("currentClass");
  //   fetch(`${URL}/api/students/${currentClass}`, {
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
  //     },
  //   })
  //     .then((result) => result.json())
  //     .then((data) => {
  //       setStudents(data);
  //     })
  //     .then(() => {
  //       setLearnAvg(
  //         students
  //           .map((student) => student.dve)
  //           .reduce((acc, score) => acc + score, 0)
  //       );
  //       setLoopsAvg(
  //         students
  //           .map((student) => student.loops)
  //           .reduce((acc, score) => acc + score, 0)
  //       );
  //       setFunAvg(
  //         students
  //           .map((student) => student.fun)
  //           .reduce((acc, score) => acc + score, 0)
  //       );
  //       setArraysAvg(
  //         students
  //           .map((student) => student.arrays)
  //           .reduce((acc, score) => acc + score, 0)
  //       );
  //       setObjAvg(
  //         students
  //           .map((student) => student.obj)
  //           .reduce((acc, score) => acc + score, 0)
  //       );
  //       setDomApiAvg(
  //         students
  //           .map((student) => student.dom_api)
  //           .reduce((acc, score) => acc + score, 0)
  //       );
  //       setSsAvg(
  //         students
  //           .map((student) => student.ss)
  //           .reduce((acc, score) => acc + score, 0)
  //       );
  //       setSDbAvg(
  //         students
  //           .map((student) => student.s_db)
  //           .reduce((acc, score) => acc + score, 0)
  //       );
  //       setReactAvg(
  //         students
  //           .map((student) => student.react)
  //           .reduce((acc, score) => acc + score, 0)
  //       );
  //     });
  // }, [courses]);

  // //Does a fetch when student is clicked to get their grades from projects
  // function getGrades(id) {
  //   fetch(`${url}/api/student/scores/${id}`, {
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
  //     },
  //   })
  //     .then((result) => result.json())
  //     .then((data) => {
  //       let studentIdData = [];
  //       for (let i = 0; i < data.length; i++) {
  //         if (data[i].student_id === id) {
  //           console.log(data[i]);
  //           studentIdData.push(data[i]);
  //           console.log(studentIdData);
  //           setGrades(studentIdData);
  //         }
  //       }
  //     });
  // }
  // //Does a fetch when student is clicked to get their grades from learn content
  // function getLearnGrades(id) {
  //   fetch(`${url}/api/student/learn/scores/${id}`, {
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
  //     },
  //   })
  //     .then((result) => result.json())
  //     .then((data) => setLearnGrades(data));
  // }

  //"Courses"

  // useEffect((cohortName) =>{
  //   getCohortStudents(cohortName)
  // })

  return (
    <>
      <div id="student-list-container">
        <div id="student-table-container">
          <Table id="student-list" striped>
            <thead>
              <tr>
                <th>Name</th>
                <th>GitHub</th>
                <th>Assessments AVG</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student) => (
                <tr key={student.student_id}>
                  <td
                    id="student-name"
                    value={student.student_id}
                    onClick={(e) => {
                      // getLearnGrades(student.student_id);
                      // getGrades(student.student_id);
                      // handleShowStudentInfoModal(student.name);
                    }}>
                    {student.name}
                  </td>
                  <td>{student.github}</td>
                  {/* <td className="student-average" width={"15%"}>
                    <ButtonGroup aria-label="Basic example">
                      <Button variant="secondary" size="sm">
                        <Badge
                          bg={student.learn_avg < 70 ? "danger" : "success"}
                        >
                          {student.learn_avg || "--"}%
                        </Badge>
                        <span className="visually-hidden">unread messages</span>
                      </Button>
                    </ButtonGroup>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {/* <StudentAverages
          students={students}
          learnAvg={learnAvg}
          arraysAvg={arraysAvg}
          objAvg={objAvg}
          domApiAvg={domApiAvg}
          ssAvg={ssAvg}
          sDbAvg={sDbAvg}
          reactAvg={reactAvg}
          loopsAvg={loopsAvg}
          funAvg={funAvg}
        />
        <StudentInfoModal
          grades={grades}
          learnGrades={learnGrades}
          clickedStudent={clickedStudent}
          showStudentInfoModal={showStudentInfoModal}
          setShowStudentInfoModal={setShowStudentInfoModal}
          setClickedStudent={setClickedStudent}
          loadStudents={loadStudents}
        /> */}
      </div>
    </>
  );
};

export default Students;