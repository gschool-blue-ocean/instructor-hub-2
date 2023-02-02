-- Clean the slate
DROP TABLE IF EXISTS students CASCADE;

DROP TABLE IF EXISTS users CASCADE;

DROP TABLE IF EXISTS cohorts CASCADE;

DROP TABLE IF EXISTS coding_groups CASCADE;

DROP TABLE IF EXISTS notes CASCADE;

DROP TABLE IF EXISTS projects CASCADE;

DROP TABLE IF EXISTS learn CASCADE;

DROP TABLE IF EXISTS project_grades CASCADE;

DROP TABLE IF EXISTS learn_grades CASCADE;

DROP TABLE IF EXISTS assigned_student_groupings CASCADE;

DROP TABLE IF EXISTS pairs CASCADE;

DROP FUNCTION IF EXISTS calc_projavg() CASCADE;

DROP EXTENSION IF EXISTS pgcrypto;

CREATE EXTENSION pgcrypto;

--TABLE OF CONTENTS--
--SECTION 1: TABLES AND RELATIONS
------ (1) users
------ (2) cohorts
------ (3) students
------ (4) coding_groups
------ (5) assigned_student_groupings
------ (6) notes
------ (7) projects
------ (8) project_grades
------ (9) learn
------ (10) learn_grades
--SECTION 2: FUNCTIONS AND TRIGGERS
------ (1) calc_learnAvg()
------ (2) calc_dveAvg()
------ (3) calc_loopsAvg()
------ (4) calc_functionsAvg()
------ (5) calc_arraysAvg()
------ (6) calc_objectAvg()
------ (7) calc_domApiAvg()
------ (8) calc_serverAvg()
------ (9) calc_databaseAvg()
------ (10) calc_reactAvg()
/* ============================================================
 -- SECTION 1: Create tables and relations
 ============================================================== */
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR (50) UNIQUE,
  password TEXT NOT NULL,
  default_cohort TEXT,
  img text,
  token VARCHAR(255),
  session_token VARCHAR(255)
);

CREATE TABLE cohorts (
  cohort_id SERIAL,
  cohort_name TEXT UNIQUE PRIMARY KEY,
  begin_date DATE,
  end_date DATE,
  instructor TEXT
);

-- fun is short for functions, ss stands for server side and s_db stands for server database
CREATE TABLE students (
  student_id SERIAL PRIMARY KEY,
  name TEXT,
  learn_avg INT,
  dve INT,
  loops INT,
  fun INT,
  arrays INT,
  obj INT,
  dom_api INT,
  ss INT,
  s_db INT,
  react INT,
  cohort_name TEXT,
  ETS_date DATE,
  github TEXT,
  FOREIGN KEY (cohort_name) REFERENCES cohorts(cohort_name) ON DELETE CASCADE
);

--THIS ENABLES TRACKING OF STUDENT CODING PAIR/GROUP ASSIGNMENTS
CREATE TABLE coding_groups (
  group_id SERIAL PRIMARY KEY,
  cohort_name TEXT,
  FOREIGN KEY (cohort_name) REFERENCES cohorts(cohort_name) ON DELETE CASCADE
);

CREATE TABLE assigned_student_groupings (
  group_assignment_id SERIAL PRIMARY KEY,
  student_id INT,
  group_id INT,
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
  FOREIGN KEY (group_id) REFERENCES coding_groups(group_id) ON DELETE CASCADE
);

CREATE TABLE notes (
  student_id INT,
  note_id SERIAL PRIMARY KEY,
  notes TEXT,
  name TEXT,
  note_date TIMESTAMPTZ,
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
);

--THIS ALLOWS TRACKING STUDENTS' PROJECT RATINGS/SCORES
CREATE TABLE projects (
  project_id SERIAL PRIMARY KEY,
  project_name TEXT
);

INSERT INTO
  projects (project_name)
VALUES
  ('Checkerboard');

INSERT INTO
  projects (project_name)
VALUES
  ('Stoplight');

INSERT INTO
  projects (project_name)
VALUES
  ('Twiddler');

INSERT INTO
  projects (project_name)
VALUES
  ('TV Show Finder');

INSERT INTO
  projects (project_name)
VALUES
  ('Hack-a-thon');

INSERT INTO
  projects (project_name)
VALUES
  ('Front End Project');

INSERT INTO
  projects (project_name)
VALUES
  ('React MVP');

INSERT INTO
  projects (project_name)
VALUES
  ('Front End Capstone');

INSERT INTO
  projects (project_name)
VALUES
  ('System Design Captosone');

INSERT INTO
  projects (project_name)
VALUES
  ('Blue Ocean');

CREATE TABLE project_grades (
  project_grades_id SERIAL PRIMARY KEY,
  student_id INT,
  project_id INT,
  project_passed BOOLEAN,
  notes TEXT,
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE RESTRICT --removes learn grades if student is deleted. Cannot delete projects without deleting grades first
);

----this index ensures students don't have duplicate grades
CREATE UNIQUE INDEX project_grades_only_one_per_student ON project_grades (student_id, project_id);

CREATE TABLE learn (
  assessment_id SERIAL PRIMARY KEY,
  assessment_name TEXT
);

INSERT INTO
  learn (assessment_name)
VALUES
  (
    'Data Types, Variables, and Expressions Assessment'
  );

INSERT INTO
  learn (assessment_name)
VALUES
  ('Loops and Control Flow Assessment');

INSERT INTO
  learn (assessment_name)
VALUES
  ('Functions Assessment');

INSERT INTO
  learn (assessment_name)
VALUES
  ('Arrays Assessment');

INSERT INTO
  learn (assessment_name)
VALUES
  ('Objects Assessment');

INSERT INTO
  learn (assessment_name)
VALUES
  ('DOM API Assessment');

INSERT INTO
  learn (assessment_name)
VALUES
  ('Server Side Assessment');

INSERT INTO
  learn (assessment_name)
VALUES
  ('Server and DB Assessment');

INSERT INTO
  learn (assessment_name)
VALUES
  ('React Assessment');

CREATE TABLE learn_grades (
  learn_grade_id SERIAL PRIMARY KEY,
  student_id INT,
  assessment_id INT,
  assessment_grade INT,
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
  FOREIGN KEY (assessment_id) REFERENCES learn(assessment_id) ON DELETE RESTRICT --removes learn grades if student is deleted. Cannot delete assessments without deleting grades first
);

----this index ensures students don't have duplicate grades
CREATE UNIQUE INDEX learn_grades_only_one_per_student ON learn_grades (student_id, assessment_id);

/* ============================================================
 -- SECTION 2: FUNCTIONS AND TRIGGERS
 ============================================================== */
-- --- (1) UPDATE STUDENT'S LEARN AVG WHEN NEW GRADE IS ADDED OR UPDATED TO LEARN.
-- -- FUNCTION: UPDATE STUDENT'S LEARN AVG SCORE
CREATE
OR REPLACE FUNCTION calc_learnavg() RETURNS trigger AS $ $ BEGIN WITH grades AS (
  SELECT
    AVG(learn_grades.assessment_grade) as avg
  FROM
    learn_grades
  WHERE
    student_id = NEW.student_id
)
UPDATE
  students
SET
  learn_avg = grades.avg
FROM
  grades
WHERE
  student_id = NEW.student_id;

RETURN NEW;

END;

$ $ LANGUAGE 'plpgsql';

-- -- TRIGGER: RUNS WHEN STUDENT'S GRADE IS ADDED OR UPDATED
CREATE TRIGGER learnGrade
AFTER
INSERT
  OR
UPDATE
  OF assessment_grade ON learn_grades FOR EACH ROW EXECUTE PROCEDURE calc_learnavg();

--- (2) UPDATE STUDENT'S DVE GRADE WHEN NEW GRADE IS ADDED OR UPDATED.
-- FUNCTION: UPDATE STUDENT'S DVE AVG SCORE
CREATE
OR REPLACE FUNCTION calc_dveGrade() RETURNS trigger AS $ $ BEGIN WITH grades AS (
  SELECT
    (learn_grades.assessment_grade) AS dve
  FROM
    learn_grades
  WHERE
    assessment_id = 1
    AND student_id = NEW.student_id
)
UPDATE
  students
SET
  dve = grades.dve
FROM
  grades
WHERE
  student_id = NEW.student_id;

RETURN NEW;

END;

$ $ LANGUAGE 'plpgsql';

-- ---- TRIGGER: RUNS WHEN STUDENT'S GRADE IS ADDED OR UPDATED
CREATE TRIGGER dveGrade
AFTER
INSERT
  OR
UPDATE
  OF assessment_grade ON learn_grades FOR EACH ROW EXECUTE PROCEDURE calc_dveGrade();

-- --- (3) UPDATE STUDENT'S LOOPS GRADE WHEN NEW GRADE IS ADDED OR UPDATED.
-- ---- FUNCTION: UPDATE STUDENT'S LOOPS AVG SCORE
CREATE
OR REPLACE FUNCTION calc_loopsGrade() RETURNS trigger AS $ $ BEGIN WITH grades AS (
  SELECT
    (learn_grades.assessment_grade) loops
  FROM
    learn_grades
  WHERE
    assessment_id = 2
    AND student_id = NEW.student_id
)
UPDATE
  students
SET
  loops = grades.loops
FROM
  grades
WHERE
  student_id = NEW.student_id;

RETURN NEW;

END;

$ $ LANGUAGE 'plpgsql';

-- ---- TRIGGER: RUNS WHEN STUDENT'S GRADE IS ADDED OR UPDATED
CREATE TRIGGER loopsGrade
AFTER
INSERT
  OR
UPDATE
  OF assessment_grade ON learn_grades FOR EACH ROW EXECUTE PROCEDURE calc_loopsGrade();

--   -- --- (4) UPDATE STUDENT'S FUNCTIONS GRADE WHEN NEW GRADE IS ADDED OR UPDATED.
-- -- ---- FUNCTION: UPDATE STUDENT'S FUNCTIONS AVG SCORE
CREATE
OR REPLACE FUNCTION calc_functionsGrade() RETURNS trigger AS $ $ BEGIN WITH grades AS (
  SELECT
    (learn_grades.assessment_grade) AS functions
  FROM
    learn_grades
  WHERE
    assessment_id = 3
    AND student_id = NEW.student_id
)
UPDATE
  students
SET
  fun = grades.functions
FROM
  grades
WHERE
  student_id = NEW.student_id;

RETURN NEW;

END;

$ $ LANGUAGE 'plpgsql';

-- ---- TRIGGER: RUNS WHEN STUDENT'S GRADE IS ADDED OR UPDATED
CREATE TRIGGER functionsGrade
AFTER
INSERT
  OR
UPDATE
  OF assessment_grade ON learn_grades FOR EACH ROW EXECUTE PROCEDURE calc_functionsGrade();

--   -- --- (5) UPDATE STUDENT'S ARRAYS GRADE WHEN NEW GRADE IS ADDED OR UPDATED.
-- -- ---- FUNCTION: UPDATE STUDENT'S ARRAYS AVG SCORE
CREATE
OR REPLACE FUNCTION calc_arraysGrade() RETURNS trigger AS $ $ BEGIN WITH grades AS (
  SELECT
    (learn_grades.assessment_grade) AS arrays
  FROM
    learn_grades
  WHERE
    assessment_id = 4
    AND student_id = NEW.student_id
)
UPDATE
  students
SET
  arrays = grades.arrays
FROM
  grades
WHERE
  student_id = NEW.student_id;

RETURN NEW;

END;

$ $ LANGUAGE 'plpgsql';

-- ---- TRIGGER: RUNS WHEN STUDENT'S GRADE IS ADDED OR UPDATED
CREATE TRIGGER arraysGrade
AFTER
INSERT
  OR
UPDATE
  OF assessment_grade ON learn_grades FOR EACH ROW EXECUTE PROCEDURE calc_arraysGrade();

--   -- --- (6) UPDATE STUDENT'S OBJECTS grade WHEN NEW grade IS ADDED OR UPDATED.
-- -- ---- FUNCTION: UPDATE STUDENT'S OBJECTS AVG SCORE
CREATE
OR REPLACE FUNCTION calc_objGrade() RETURNS trigger AS $ $ BEGIN WITH grades AS (
  SELECT
    (learn_grades.assessment_grade) AS obj
  FROM
    learn_grades
  WHERE
    assessment_id = 5
    AND student_id = NEW.student_id
)
UPDATE
  students
SET
  obj = grades.obj
FROM
  grades
WHERE
  student_id = NEW.student_id;

RETURN NEW;

END;

$ $ LANGUAGE 'plpgsql';

-- ---- TRIGGER: RUNS WHEN STUDENT'S GRADE IS ADDED OR UPDATED
CREATE TRIGGER objGrade
AFTER
INSERT
  OR
UPDATE
  OF assessment_grade ON learn_grades FOR EACH ROW EXECUTE PROCEDURE calc_objGrade();

--   -- --- (7) UPDATE STUDENT'S DOM_API GRADE WHEN NEW GRADE IS ADDED OR UPDATED.
-- -- ---- FUNCTION: UPDATE STUDENT'S DOM_API AVG SCORE
CREATE
OR REPLACE FUNCTION calc_domApiGrade() RETURNS trigger AS $ $ BEGIN WITH grades AS (
  SELECT
    (learn_grades.assessment_grade) AS avg
  FROM
    learn_grades
  WHERE
    assessment_id = 6
    AND student_id = NEW.student_id
)
UPDATE
  students
SET
  dom_api = grades.avg
FROM
  grades
WHERE
  student_id = NEW.student_id;

RETURN NEW;

END;

$ $ LANGUAGE 'plpgsql';

-- ---- TRIGGER: RUNS WHEN STUDENT'S GRADE IS ADDED OR UPDATED
CREATE TRIGGER domApiGrade
AFTER
INSERT
  OR
UPDATE
  OF assessment_grade ON learn_grades FOR EACH ROW EXECUTE PROCEDURE calc_domApiGrade();

-- -- --- (8) UPDATE STUDENT'S SERVER GRADE WHEN NEW GRADE IS ADDED OR UPDATED.
-- -- ---- FUNCTION: UPDATE STUDENT'S SERVER AVG SCORE
CREATE
OR REPLACE FUNCTION calc_ssGrade() RETURNS trigger AS $ $ BEGIN WITH grades AS (
  SELECT
    (learn_grades.assessment_grade) AS ss
  FROM
    learn_grades
  WHERE
    assessment_id = 7
    AND student_id = NEW.student_id
)
UPDATE
  students
SET
  ss = grades.ss
FROM
  grades
WHERE
  student_id = NEW.student_id;

RETURN NEW;

END;

$ $ LANGUAGE 'plpgsql';

-- ---- TRIGGER: RUNS WHEN STUDENT'S GRADE IS ADDED OR UPDATED
CREATE TRIGGER serverGrade
AFTER
INSERT
  OR
UPDATE
  OF assessment_grade ON learn_grades FOR EACH ROW EXECUTE PROCEDURE calc_ssGrade();

--   -- --- (9) UPDATE STUDENT'S DATABASE GRADE WHEN NEW GRADE IS ADDED OR UPDATED.
-- -- ---- FUNCTION: UPDATE STUDENT'S DATABASE AVG SCORE
CREATE
OR REPLACE FUNCTION calc_sDbGrade() RETURNS trigger AS $ $ BEGIN WITH grades AS (
  SELECT
    (learn_grades.assessment_grade) AS sDb
  FROM
    learn_grades
  WHERE
    assessment_id = 8
    AND student_id = NEW.student_id
)
UPDATE
  students
SET
  s_db = grades.sDb
FROM
  grades
WHERE
  student_id = NEW.student_id;

RETURN NEW;

END;

$ $ LANGUAGE 'plpgsql';

-- ---- TRIGGER: RUNS WHEN STUDENT'S GRADE IS ADDED OR UPDATED
CREATE TRIGGER databaseGrade
AFTER
INSERT
  OR
UPDATE
  OF assessment_grade ON learn_grades FOR EACH ROW EXECUTE PROCEDURE calc_sDbGrade();

--   -- --- (10) UPDATE STUDENT'S REACT GRADE WHEN NEW GRADE IS ADDED OR UPDATED.
-- -- ---- FUNCTION: UPDATE STUDENT'S REACT AVG SCORE
CREATE
OR REPLACE FUNCTION calc_reactGrade() RETURNS trigger AS $ $ BEGIN WITH grades AS (
  SELECT
    (learn_grades.assessment_grade) AS react
  FROM
    learn_grades
  WHERE
    assessment_id = 9
    AND student_id = NEW.student_id
)
UPDATE
  students
SET
  react = grades.react
FROM
  grades
WHERE
  student_id = NEW.student_id;

RETURN NEW;

END;

$ $ LANGUAGE 'plpgsql';

-- ---- TRIGGER: RUNS WHEN STUDENT'S GRADE IS ADDED OR UPDATED
CREATE TRIGGER reactGrade
AFTER
INSERT
  OR
UPDATE
  OF assessment_grade ON learn_grades FOR EACH ROW EXECUTE PROCEDURE calc_reactGrade();