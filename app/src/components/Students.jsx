// import { StudentAverages } from "./StudentAverages";
import { ButtonGroup, Table, Badge, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { BsPersonPlusFill } from "react-icons/bs";

export const Students = (props) => {
  //State courses is set in home
  const {
    setSelectedComponent,
    studentData,
    cohortName,
    getCohortStudents,
    clickedStudent,
    setClickedStudent,
    ...avgProps
  } = props;

  // useState for assessment grades and project grades
  const [grades, setGrades] = useState([]);

  // useState for learn grades
  const [learnGrades, setLearnGrades] = useState([]);
  
  const URL = "http://localhost:8000/api";

  // open Student Info function
  const handleShowStudentInfo = (name) => {
    setClickedStudent(name);
      setSelectedComponent("Student Info");
  };

  // open Add Student function
  const handleShowAddStudents = () => {
    setSelectedComponent("Add Students");
  };

  // Sets Assessment Averages
  useEffect(() => {
    avgProps.setLearnAvg(
      studentData
        .map((student) => student.dve)
        .reduce((acc, score) => acc + score, 0)
    );
    avgProps.setLoopsAvg(
      studentData
        .map((student) => student.loops)
        .reduce((acc, score) => acc + score, 0)
    );
    avgProps.setFunAvg(
      studentData
        .map((student) => student.fun)
        .reduce((acc, score) => acc + score, 0)
    );
    avgProps.setArraysAvg(
      studentData
        .map((student) => student.arrays)
        .reduce((acc, score) => acc + score, 0)
    );
    avgProps.setObjAvg(
      studentData
        .map((student) => student.obj)
        .reduce((acc, score) => acc + score, 0)
    );
    avgProps.setDomApiAvg(
      studentData
        .map((student) => student.dom_api)
        .reduce((acc, score) => acc + score, 0)
    );
    avgProps.setSsAvg(
      studentData
        .map((student) => student.ss)
        .reduce((acc, score) => acc + score, 0)
    );
    avgProps.setSDbAvg(
      studentData
        .map((student) => student.s_db)
        .reduce((acc, score) => acc + score, 0)
    );
    avgProps.setReactAvg(
      studentData
        .map((student) => student.react)
        .reduce((acc, score) => acc + score, 0)
    );
  }, []);

  //Does a fetch when student is clicked to get their grades from projects
  function getGrades(id) {
    fetch(`${URL}/student/scores/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
      .then((result) => result.json())
      .then((data) => {
        let studentProjectData = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].student_id === id) {
            console.log(data[i]);
            studentProjectData.push(data[i]);
            console.log(studentProjectData);
            setGrades(studentProjectData);
          }
        }
      });
  }

  //Does a fetch when student is clicked to get their grades from learn content
  function getLearnGrades(id) {
    fetch(`${URL}/student/learn/scores/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
      .then((result) => result.json())
      .then((data) => setLearnGrades(data));
  }

  return (
    <>
      <div
        id="student-table-container"
        className="d-flex justify-content-center"
        style={{
          flexFlow: "column nowrap",
          backgroundImage: "linear-gradient(to bottom, #ffa76d, #ff8a3d",
          padding: "1.5em",
          width: "85vw",
          minHeight: "100%",
          borderRadius: "2em",
          position: "relative",
        }}>
        <Button
          id="add-students-btn"
          style={{
            maxHeight: "2em",
            maxWidth: "2em",
            flex: 1,
            justifyContent: "center",
            verticalAlign: "middle",
            backgroundColor: "#ffba8c",
            border: ".075em solid #0d0f4a",
            color: "#0d0f4a",
          }}
          onClick={handleShowAddStudents}>
          <BsPersonPlusFill
            style={{
              margin: "1em",
              cursor: "pointer",
              position: "absolute",
              top: 8,
              left: 13,
              minHeight: "2em",
              minWidth: "1.5em",
            }}
          />
        </Button>
        <Table
          id="student-list"
          striped
          style={{ flex: 1, width: "100%", marginTop: "1em" }}>
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
                  onClick={() => {
                    getLearnGrades(student.student_id);
                    getGrades(student.student_id);
                    handleShowStudentInfo(student.name);
                  }}>
                  {student.name}
                </td>
                <td>{student.github}</td>
                <td className="student-average" width={"15%"}>
                  <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary" size="sm">
                      <Badge bg={student.learn_avg < 70 ? "danger" : "success"}>
                        {student.learn_avg || "--"}%
                      </Badge>
                      <span className="visually-hidden">unread messages</span>
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};


