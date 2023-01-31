//Sets up requires that the server needs
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const { Pool } = require("pg");

//Sets up encryption hashing tools:
const bcrypt = require("bcrypt");
const saltRounds = 10;

//Used to access jwt tools
const jwt = require("jsonwebtoken");
//const { json } = require('express');

//Creates random strings for tokens
const Str = require("@supercharge/strings");

const format = require("pg-format");

//Sets up env and port
const PORT = 8000;

//Sets up the pool for the server
const pool = new Pool({
  connectionString: process.env.PG_CONNECT,
});
pool.connect();

app.use(cors());
app.use(express.json());

//Gets all the cohorts
app.get("/api/cohorts", authenticateToken, (req, res) => {
  pool
    .query("SELECT * FROM cohorts")
    .then((result) => res.send(result.rows))
    .catch((error) => res.send(error));
});

//Route to select students from cohort//
app.get("/api/students", authenticateToken, (req, res) => {
  pool
    .query(`SELECT * FROM students WHERE cohort_name = $1 ORDER BY name ASC`, [
      cohortName,
    ])
    .then((result) => res.send(result.rows))
    .catch((error) => res.send(error));
});

//Route to select all students
app.get("/api/students/:cohortdc", authenticateToken, (req, res) => {
  let cohortName = req.params.cohort;
  pool
    .query(`SELECT * FROM students`)
    .then((result) => res.send(result.rows))
    .catch((error) => res.send(error));
});

//Route selects students from list inside modal//
app.post("/api/selectedstudents", authenticateToken, (req, res) => {
  let studentIds = req.body.studentIds;
  let queryString = "";
  studentIds.forEach((studentId) => {
    if (queryString === "") {
      queryString = queryString + `${studentId}`;
    } else {
      queryString = queryString + ", " + `${studentId}`;
    }
  });
  console.log(queryString);
  pool
    .query(`SELECT * FROM students WHERE student_id in (${queryString})`)
    .then((result) => res.send(result.rows))
    .catch((error) => res.send(error));
});

//Adds a route to update users default cohort
app.patch("/api/default-cohort", authenticateToken, (req, res) => {
  //TODO change to email
  pool
    .query(
      "UPDATE users SET default_cohort = $1 WHERE email = $2 RETURNING default_cohort",
      [req.body.default_cohort, req.body.username]
    )
    .then((result) => res.send(result.rows))
    .catch((error) => res.send(error));
});

//Call to get users default cohort data
//Pseudo code:
//SELECT * FROM variable cohort name RIGHT OUTER JOIN students where cohorit_id = cohort_id

// app.update('/api/students/update', (req, res) => {
//     studentIds = req.body.studentIds
//     techApt = req.body.te
//     pool.query(`SELECT * FROM students WHERE cohort_id = $1`, [cohortId])
//     .then(result => res.send(result.rows))
//     .catch(error => res.send(error))
// })

//Route to create a new user

//Route to verify the user logging in
app.post("/api/authent", authenticateToken, (req, res) => {
  //Access the request body that is sent with the fetch
  const user = req.body.username;
  const userToken = req.body.userToken;
  const sessionToken = req.body.sessionToken;
  //Accesses the tokens from the user sent with username
  pool
    .query("SELECT token, session_token FROM users WHERE email = $1", [user])
    .then((result) => {
      //Compares the stored tokens with sent token and sends a response based on result
      userToken == result.rows[0].token &&
      sessionToken == result.rows[0].session_token
        ? res.status(200).send([{ response: "true" }])
        : res.status(401).send([{ response: "false" }]);
    })
    .catch((error) => res.status(404).send(error));
});

// route for creating new cohort
app.post(`/api/create/cohort`, authenticateToken, (req, res) => {
  // gets cohort object from body
  const newCohort = req.body.newCohort;
  // updates cohort table inside database
  pool
    .query(
      `INSERT INTO cohorts (cohort_name, begin_date, end_date, instructor) VALUES ($1, $2, $3, $4) RETURNING *`,
      [
        newCohort.name,
        newCohort.begin_date,
        newCohort.end_date,
        newCohort.instructor,
      ]
    )
    .then((result) => res.status(200).send(result.rows))
    .catch((error) => res.status(404).send(error));
});

// route for getting all learn assessment names
app.get(`/api/learn/assessment-names`, authenticateToken, (req, res) => {
  pool
    .query(` SELECT * FROM learn;`)
    .then((result) => res.status(200).send(result.rows))
    .catch((error) => res.status(404).send(error));
});

// route for getting all project names
app.get(`/api/projects/project-names`, authenticateToken, (req, res) => {
  pool
    .query(` SELECT * FROM projects;`)
    .then((result) => res.status(200).send(result.rows))
    .catch((error) => res.status(404).send(error));
});

// route to post the learn grates for selected users
app.post(`/api/learn/grades-update`, authenticateToken, (req, res) => {
  //gets information from the body
  console.log(req.body);
  let student_id = req.body.student_id;
  let assessment_id = req.body.assessment_id;
  let assessment_grade = req.body.assessment_grade;
  //updates the learn_grades table in the database
  pool
    .query(
      `INSERT INTO learn_grades (student_id, assessment_id, assessment_grade) VALUES ($1, $2, $3);`,
      [student_id, assessment_id, assessment_grade]
    )
    .then((result) => res.status(200).send(result.rows))
    .catch((error) => res.status(404).send(error));
});

////////////////////////////////////////ROUTES FOR WEEKLY UPDATE MODAL////////////////////////////////////////

//Route that updates the student_teamwork_skills table with the tech scores for a group of students
app.post(`/api/weekly-update/tech-skills`, authenticateToken, (req, res) => {
  const students = req.body.students;
  let record_date = new Date().toISOString();
  let values = [];
  students.forEach((student) =>
    values.push([student.student_id, student.score, record_date])
  );
  pool
    .query(
      format(
        "INSERT INTO student_tech_skills (student_id, score, record_date) VALUES %L",
        values
      ),
      []
    )
    .then((result) => res.status(200).send(result.rows))
    .catch((error) => res.status(404).send(error));
});

//Route updates the student_teamwork_skills table with the team scores for a group of students
app.post(
  `/api/weekly-update/teamwork-skills`,
  authenticateToken,
  (req, res) => {
    const students = req.body.students;
    let record_date = new Date().toISOString();
    let values = [];
    students.forEach((student) =>
      values.push([student.student_id, student.score, record_date])
    );
    pool
      .query(
        format(
          "INSERT INTO student_teamwork_skills (student_id, score, record_date) VALUES %L",
          values
        ),
        []
      )
      .then((result) => res.status(200).send(result.rows))
      .catch((error) => res.status(404).send(error));
  }
);

////////////////////////////////////////ROUTES FOR ASSESSMENT MODAL////////////////////////////////////////

//Route posts the learn_grades table with the assessment grades for a group of students
app.post(
  `/api/application-update/learn-grades-post`,
  authenticateToken,
  (req, res) => {
    const students = req.body.students;
    let values = [];
    students.forEach((student) =>
      values.push([
        student.student_id,
        student.assessment_id,
        student.assessment_grade,
      ])
    );
    pool
      .query(
        format(
          "INSERT INTO learn_grades (student_id, assessment_id, assessment_grade) VALUES %L",
          values
        ),
        []
      )
      .then((result) => res.status(200).send(result.rows))
      .catch((error) => res.status(404).send(error));
  }
);

//Route updates the learn_grades table with the assessment grades for a group of students
app.post(
  `/api/application-update/learn-grades-update`,
  authenticateToken,
  (req, res) => {
    const students = req.body.students;
    const promises = students.map((student) => {
      const studentId = student.student_id;
      const assessmentId = student.assessment_id;
      const assessmentGrade = student.assessment_grade;
      return pool.query(
        format(
          `UPDATE learn_grades SET assessment_grade = %s WHERE student_id = %s AND assessment_id = %s;`,
          assessmentGrade,
          studentId,
          assessmentId
        )
      );
    });
    Promise.all(promises)
      .then((result) => res.status(200).send(result))
      .catch((error) => res.status(404).send(error));
  }
);

//Route selects all from learn_grades table
app.get(`/api/learn-grades`, authenticateToken, (req, res) => {
  pool
    .query(`SELECT * FROM learn_grades;`)
    .then((result) => res.status(200).send(result.rows))
    .catch((error) => res.status(404).send(error));
});

////////////////////////////////////////ROUTES FOR PROJECT MODAL////////////////////////////////////////

//Route posts the project_grades table with the project grades for a group of students
app.post(
  `/api/application-update/project-grades-post`,
  authenticateToken,
  (req, res) => {
    const students = req.body.students;
    let values = [];
    students.forEach((student) =>
      values.push([
        student.student_id,
        student.project_id,
        student.project_passed,
      ])
    );
    pool
      .query(
        format(
          "INSERT INTO project_grades (student_id, project_id, project_passed) VALUES %L",
          values
        ),
        []
      )
      .then((result) => res.status(200).send(result.rows))
      .catch((error) => res.status(404).send(error));
  }
);

//Route updates the project_grades table with the project grades for a group of students
app.post(
  `/api/application-update/project-grades-update`,
  authenticateToken,
  (req, res) => {
    const students = req.body.students;
    const promises = students.map((student) => {
      const studentId = student.student_id;
      const projectId = student.project_id;
      const projectPassed = student.project_passed;
      return pool.query(
        format(
          `UPDATE project_grades SET project_passed = %L WHERE student_id = %s AND project_id = %s;`,
          projectPassed,
          studentId,
          projectId
        )
      );
    });
    Promise.all(promises)
      .then((result) => res.status(200).send(result))
      .catch((error) => {
        res.status(404).send(error);
        console.log(error);
      });
  }
);

//Route selects all from the project)grades table
app.get(`/api/project-grades`, authenticateToken, (req, res) => {
  pool
    .query(`SELECT * FROM project_grades;`)
    .then((result) => res.status(200).send(result.rows))
    .catch((error) => res.status(404).send(error));
});

//Creates a route to insert multiple students into a course
//Uses pg-format to do a mass insert with multiple values
//The values are taken from the request body and pushed into an array as their own array
app.post("/api/create/students", authenticateToken, (req, res) => {
  const students = req.body.students;
  let values = [];
  students.forEach((student) =>
    values.push([student.name, student.cohort_name, student.github])
  );
  pool
    .query(
      format(
        "INSERT INTO students (name, cohort_name, github) VALUES %L RETURNING *",
        values
      ),
      []
    )
    .then((result) => res.send(result.rows))
    .catch((error) => res.send(error));
});

//creating a rout send a PATCH request and eidt the first name of selected student.

app.patch("/api/students/nameChange", authenticateToken, (req, res) => {
  let cohortName = req.body.cohort_name;
  let studentName = req.body.oldName;
  let newName = req.body.name;
  pool
    .query(
      `UPDATE students SET name = $1 WHERE cohort_name = $2 AND name = $3`,
      [newName, cohortName, studentName]
    )
    .then((result) => res.send("Name updated"))
    .catch((error) => res.send(error));
});

app.get("/api/student/scores/:id", authenticateToken, (req, res) => {
  let studentId = req.params.id;
  pool
    .query(
      `SELECT *
                FROM students
                RIGHT JOIN project_grades
                ON students.student_id = project_grades.student_id 
                AND students.student_id=$1
                JOIN projects
                ON project_grades.project_id = projects.project_id`,
      [studentId]
    )
    .then((result) => res.status(200).send(result.rows))
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
});

app.get("/api/student/learn/scores/:id", authenticateToken, (req, res) => {
  let studentId = req.params.id;
  pool
    .query(
      `SELECT *
                FROM learn_grades
                RIGHT JOIN learn
                ON learn_grades.assessment_id=learn.assessment_id
                WHERE learn_grades.student_id=$1`,
      [studentId]
    )
    .then((result) => res.status(200).send(result.rows))
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
});

//=====================================================================
//-----------------MiddleWare for Authorization------------------------
//=====================================================================

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

//=====================================================================
//-----------------End of MiddleWare for Authorization-----------------
//=====================================================================

app.get("/", (req, res) => {
  console.log("Received a GET request at the root route");
  res.send("Hello, From Server!");
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
