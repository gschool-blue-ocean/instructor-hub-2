import React, { useState, useEffect } from "react";


const Cohorts = (props) => {
const { getCohortStudents, cohorts, cohortName, setCohortName } = props;
 

  const URL = "http://localhost:8000";


  return (
    <div style={{display:'flex', flexFlow:'row wrap', justifyContent:'space-evenly', paddingTop:'2.5em', width:'85vw', minHeight: '100%', backgroundColor:'navy', borderRadius:'2em' }}>
      {cohorts.map((cohort) => (
        <button id="cohort-button"
          key={cohort.cohort_name}
          style={{display:'flex',border:'.05em solid #0d0f4a', backgroundImage: 'linear-gradient(to bottom, #fff, #ff8a3d)', 
          color:'#0d0f4a', minWidth:'15vw', minHeight:'10vh',maxHeight:'10vh', fontSize:'1.75em', textOverflow:'hidden', 
          verticalAlign:'middle', flexFlow:'row wrap', justifyContent:'center'}}
          onClick={() => {
            setCohortName(cohort.cohort_name);
            getCohortStudents(cohort.cohort_name);
          }}
        >
          {cohort.cohort_name}
        </button>
      ))}
    </div>
  );
};

export default Cohorts;