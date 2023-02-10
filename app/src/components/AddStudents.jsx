import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import swal from "sweetalert";

const URL = "http://localhost:8000/api";

export const AddStudents = (props) => {
  const { studentData, getCohortStudents, cohortName } = props;
  const [inputs, setInputs] = useState([
    {
      name: "",
      email: "",
      github: "",
      cohort_name: cohortName,
    },
  ]);

  const handleAddStudent = () => {
    setInputs([
      ...inputs,
      {
        name: "",
        email: "",
        github: "",
        cohort_name: cohortName,
      },
    ]);
  };

  const handleInputChange = (event, index) => {
    const updatedInputs = [...inputs];
    updatedInputs[index][event.target.name] = event.target.value;
    setInputs(updatedInputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newStudentData = inputs.filter(
      (input) => input.name !== "" && input.email !== "" && input.github !== ""
    );

    const alreadyExists = studentData.some((student) =>
      newStudentData.some(
        (newStudent) =>
          student.name === newStudent.name ||
          student.github === newStudent.github ||
          student.email === newStudent.email
      )
    );
    if (alreadyExists) {
      swal("One or more values entered were already used.");
      return;
    }

    // Your code to make a POST request to the server here
    fetch(`${URL}/students/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        newStudentData,
      }),
    })
    }

    // Reset the form
    const formReset = () => {
      setInputs([
      {
        name: "",
        email: "",
        github: "",
        cohort_name: cohortName,
      },
    ]);
    getCohortStudents(cohortName);
  };

  return (
    <div className="form-group">
      <Form onSubmit={handleSubmit}>
        {inputs.map((input, index) => (
          <div key={index}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={input.name}
                onChange={(event) => handleInputChange(event, index)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={input.email}
                onChange={(event) => handleInputChange(event, index)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicGithub">
              <Form.Label>Github</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Github username"
                name="github"
                value={input.github}
                onChange={(event) => handleInputChange(event, index)}
              />
            </Form.Group>
          </div>
        ))}
        <Button variant="primary" type="submit" onClick={formReset}>
          Submit
        </Button>
        <Button variant="secondary" onClick={handleAddStudent}>
          Add Another Student
        </Button>
      </Form>
    </div>
  );
};
