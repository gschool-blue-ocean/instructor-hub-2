import React from "react";
import { Button } from "react-bootstrap";

const URL = "http://localhost:8000/api";

export const Cohorts = (props) => {
  const { cohorts, setCohortName, getCohortStudents } = props;

  const handleCohortClick = (cohortName) => {
    setCohortName(cohortName);
    if (cohortName) getCohortStudents(cohortName);
  };

  const handleAddCohort = () => {
    
  }

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "space-evenly",
        paddingTop: "2.5em",
        width: "85vw",
        minHeight: "100%",
        backgroundColor: "navy",
        borderRadius: "2em",
        position:'relative'
      }}>
      {/* <div>
        {" "}
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
          onClick={handleShowAddCohorts}>
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
      </div>
      <div> */}
        {cohorts.map((cohort) => (
          <button
            id="cohort-button"
            key={cohort.cohort_name}
            style={{
              display: "flex",
              border: ".05em solid #0d0f4a",
              backgroundImage: "linear-gradient(to bottom, #fff, #ff8a3d)",
              color: "#0d0f4a",
              minWidth: "15vw",
              minHeight: "10vh",
              maxHeight: "10vh",
              fontSize: "1.75em",
              fontWeight: "bolder",
              textOverflow: "hidden",
              verticalAlign: "middle",
              justifyContent: "center",
            }}
            onClick={() => {
              console.log(cohort.cohort_name);
              handleCohortClick(cohort.cohort_name);
            }}>
            {cohort.cohort_name}
          </button>
        ))}
      {/* </div> */}
    </div>
  );
};
