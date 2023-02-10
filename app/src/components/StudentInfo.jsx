import React, { useEffect, useState, useRef } from "react";
import { Button, Table } from "react-bootstrap";
import { EditStudent } from "./EditStudent";
import "../css/StudentInfoModal.css";


export const StudentInfo = (props) => {
  // prop deconstruction for Student Info Modal displaying/not displaying
  const {
    grades,
    learnGrades,
    clickedStudent,
    setClickedStudent,
    cohortName,
    getCohortStudents,
    studentData,
    ...propsForAll
  } = props;

  const [editClicked, setEditClicked] = useState(false);
  const [studentId, setStudentId] = useState(0);
  const [studentGitHub, setStudentGitHub] = useState()
  const [studentEmail, setstudentEmail] =useState()

    //function to get student Id when student name is clicked
    const retrieveStudentId = clickedStudent => {
      const student = studentData.find(student => student.name === clickedStudent);
      if (student){
        setStudentId(student.student_id)
        setStudentGitHub(student.github)
        setstudentEmail(student.email)
      }
    };

    useEffect(() => {
      if(clickedStudent){
        retrieveStudentId(clickedStudent);
      }
      return;
    }, [clickedStudent])


  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "center",
        padding: "1.5em",
        width: "85vw",
        minHeight: "100%",
        backgroundImage: "linear-gradient(to bottom, #ffa76d, #ff8a3d",
        borderRadius: "2em",
      }}>
      <div id="header" style={{ display: "flex", flexFlow: "row nowrap", justifyContent:'space-between'}}>
        <div
          className="student-name"
          style={{
            fontWeight: "bolder",
            fontSize: "2em",
            color:'#0d0f4a'
          }}>
          {clickedStudent}
          </div>
         <div style={{fontSize:"1em", color:'#0d0f4a', alignSelf:'flex-end'}}>{studentGitHub}</div> 
          <div style={{fontSize:"1em", color:'#0d0f4a' , alignSelf:'flex-end'}}>{studentEmail}</div>
        
        <div>
        <EditStudent
              clickedStudent={clickedStudent}
              setClickedStudent={setClickedStudent}
              setStudentEmail={setstudentEmail}
              studentEmail={studentEmail}
              studentGitHub={studentGitHub}
              studentId={studentId}
              editClicked={editClicked}
              setEditClicked={setEditClicked}
              {...propsForAll}
            />
</div>
        
      </div>
      <Table id="student-list">
        <thead>
          <tr>
            <th>Graded Content</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Projects</th>
          </tr>
          {/* {grades.map((test) => (
            <tr key={test.project_grades_id}>
              <td key={test.project_name}>{test.project_name}</td>
              <td key={test.project_id}>
                {test.project_passed ? "Passed" : "Failed"}
              </td>
            </tr>
          ))} */}
          <tr>
            <th>Assessments</th>
          </tr>
          {/* {learnGrades.map((test) => (
            <tr key={test.learn_grade_id}>
              <td key={test.assessment_name}>{test.assessment_name}</td>
              <td key={test.assessment_id}>{test.assessment_grade}</td>
            </tr>
          ))} */}
        </tbody>
      </Table>
      <Button
        variant="primary"
        style={{backgroundColor:'#0d0f4a', maxWidth:'fit-content', justifySelf:'center', alignSelf:'center'}}
        onClick={() => {
          getCohortStudents(cohortName);
        }}>
        Close
      </Button>
    </div>
  );
};
