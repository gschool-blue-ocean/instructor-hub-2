import React, { useEffect, useState } from 'react';
import Cohorts from './Cohorts';
import Students from './Students';
// import GroupCreator from './GroupCreator';
// import Averages from './Averages';
// import Assessments from './Assessments';
// import Projects from './Projects';

const Display= (props) => {

  const {cohorts, cohortName, setCohortName, studentData, getCohortStudents } = props

  const [showStudents, setShowStudents] = useState(false);
  const [showAverages, setShowAverages] = useState(false);
  const [showAssessments, setShowAssessments] = useState(false);
  const [showGroupCreator, setShowGroupCreator] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [students, setStudents] = useState([]);
  
  const URL = "http://localhost:8000";


  
  return (
    <>
    <Cohorts key={cohortName} cohorts={cohorts} setCohortName={setCohortName} getCohortStudents={getCohortStudents(cohortName)}/>
    <Students cohortName={cohortName} studentData={studentData}/>
    {/* {showGroupCreator ? <GroupCreator showGroupCreator={showGroupCreator} setShowGroupCreator={setShowGroupCreator} /> : null}
    {showAverages ? <Averages showAverages={showAverages} setShowAverages={setShowAverages} /> : null}
    {showAssessments ? <Assessments showAssessments={showAssessments} setShowAssessments={setShowAssessments} /> : null}
    {showProjects ? <Projects showProjects={showProjects} setShowProjects={setShowProjects} /> : null} */}
    </>
  );
};

export default Display