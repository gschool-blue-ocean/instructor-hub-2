import React, { useState, useRef, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import swal from "sweetalert";

const URL = "http://localhost:8000/api";

export const EditStudent = ({
  studentId,
  setClickedStudent,
}) => {
  const newNameRef = useRef();
  const newEmailRef = useRef();
  const newGitHubRef = useRef();
  const newCohortRef = useRef();
  const [editClicked, setEditClicked] = useState(false);
  const [editedInfo, setEditedInfo] = useState();

  const handleClick = () => {
    setEditClicked(true);
  };

  const EditStudentInfo = () => {
   
      let editedName = newNameRef.current.value;
      let editedEmail = newEmailRef.current.value;
      let editedGitHub = newGitHubRef.current.value;
      let editedCohort = newCohortRef.current.value;
    
      let editedInfo = {};
      if (editedName !== '') {
        let nameRegex = /^([a-zA-ZÀ-ÿ]+)(\s[a-zA-ZÀ-ÿ]+)?\s([a-zA-ZÀ-ÿ]+)$/;
        if (!nameRegex.test(editedName)) {
          swal('Enter First & Last Name');
          return;
        } else {
          editedInfo.name = editedName;
          setClickedStudent(editedName);
        }
      }
    
      if (editedEmail !== '') {
        editedInfo.email = editedEmail;
      }
    
      if (editedGitHub !== '') {
        editedInfo.github = editedGitHub;
      }
    
      if (editedCohort !== '') {
        editedInfo.cohort_name = editedCohort;
      }
    
      setEditedInfo(editedInfo);
    };
  
  
  useEffect(() => {
    if (!editedInfo) {
      return;
    }
   fetch(`${URL}/students/${studentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(editedInfo),
      })
      .then(() => {
        swal("Changes saved!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    
  
      
      setEditClicked(false);
  
  }, [editedInfo]);


  //checks for email or github conflicts across the rest of the students
  // const checkConflict = async (editedInfo) => {

  //   if(editedInfo.email || editedInfo.github){
  //   const response = await fetch(`${URL}/students`);
  //   const students = await response.json();

  //   const emailConflict = students.some(
  //     (student) => student.email === editedInfo.email
  //   );
  //   const gitHubConflict = students.some(
  //     (student) => student.github === editedInfo.github
  //   );

  //   if (emailConflict) {
  //     swal(
  //       "The email is already in use by another student. Please enter a different email."
  //     );
  //     return false;
  //   }

  //   if (gitHubConflict) {
  //     swal(
  //       "The GitHub username is already in use by another student. Please enter a different username."
  //     );
  //     return false;
  //   }
  // }
  //   return true;
  // };

  // const handleClick = () => {
  //   setEditClicked(true);
  // };

  const handleSave = async () => {
    // if (await checkConflict(editedInfo)) {
      // send request to update student information
    EditStudentInfo();
    setEditClicked(false);
    // }
  };

  return (
    <div className="pen-change-name">
      <a className="pen"  onClick={handleClick}>
        <BsPencilSquare style={{color:'#0d0f4a'}}/>
      </a>
      {editClicked && (
        <div className="pen-input">
          <Form.Control
            type="text"
            placeholder="Enter New First & Last Name"
            ref={newNameRef}
            name="name"
          />
          <Form.Control
            type="email"
            placeholder="Enter New Email"
            ref={newEmailRef}
            name="email"
          />
          <Form.Control
            placeholder="Enter New GitHub"
            ref={newGitHubRef}
            name="github"
          />
          <Form.Control
            placeholder="Enter New Cohort Name"
            ref={newCohortRef}
            name="cohort_name"
          />
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      )}
    </div>
  );
};
