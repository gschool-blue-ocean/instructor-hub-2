import React, { useState, useEffect } from "react";
import { GenerateGroupsModal } from "./GenerateGroupsModal";
import Table from "react-bootstrap/Table";

const Groups = ({ students }) => {
  const URL = "http://localhost:8000/api";
  const [groups, setGroups] = useState([]);

  // console.log(students);

  const fetchGroups = () => {
    fetch(`${URL}/assigned-student-groupings`)
      .then((result) => result.json())
      .then((data) => {
        // console.log(data);
        setGroups(data);
      });
  };

  const getGroupIds = () => {
    let currentClass = '';
    if (sessionStorage.getItem("currentClass")) {
      currentClass = sessionStorage.getItem("currentClass");
    } else {
      currentClass = sessionStorage.getItem("defaultCohort");
    }
    fetch(`${URL}/get-group-ids/${currentClass}`)
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    fetchGroups();
    getGroupIds();
  }, []);

  console.log(groups);

  return (
    <div id="groups-container">
      <div id="groups-header">
        <h2>Groups</h2>
        <GenerateGroupsModal students={students} />
      </div>
      <div>
        <Table id="groups-table" striped bordered hover>
          <tbody>
            <tr>
              <td>Group 1</td>
            </tr>
            {groups.map((el) => (
              <tr key={el.student_id}>
                <td>{students.find((student) => student.student_id === el.student_id).name}</td>
                <td>Group {el.group_id}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Groups;
