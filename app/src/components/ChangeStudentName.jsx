import React from "react";
import { useState, useRef, useEffect } from "react";
import swal from "sweetalert";
import { BsPencilFill } from "react-icons/bs";
import "../css/ChangeStudentName.css";

export const ChangeStudentName = (props) => {
  const URL = "http://localhost:8000";
  const [studentNewName, setStudentNewName] = useState();
  const [isClicked, setIsClicked] = useState(false);

  const { clickedStudent, setClickedStudent, loadStudents } = props;

  const newNameRef = useRef();

  function ChangeName() {
    let newName = newNameRef.current.value;
    fetch(`${URL}/api/students/nameChange`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${newName} `,
        cohort_name: sessionStorage.getItem("currentClass"),
        oldName: clickedStudent,
      }),
    }).then(() => {
      swal("Name Changed!");
      loadStudents(sessionStorage.getItem("currentClass"));
    });

    //console.log(newNameRef.current.value);
    if (newName == "") {
      swal("Please fill out all fields");
    } else {
      setStudentNewName({
        name: `${newName} `,
        cohort_name: sessionStorage.getItem("currentClass"),
        oldName: clickedStudent,
      });
      setClickedStudent(newName);
    }
  }
  //console.log(studentNewName);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="pen-change-name">
      <a className="pen" onClick={handleClick}>
        <BsPencilFill />
      </a>
      {isClicked ? (
        <div className="pen-input">
          <input
            className="form-control"
            placeholder="Enter New First & Last Name"
            ref={newNameRef}
            type="text"
            name="name"
          ></input>
          <button className="btn btn-primary" onClick={ChangeName}>
            Save
          </button>
        </div>
      ) : (
        <p className="change-text">Change Name </p>
      )}
    </div>
  );
};