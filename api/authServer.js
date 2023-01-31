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
const PORT = 7000;

//Sets up the pool for the server
const pool = new Pool({
  connectionString: process.env.PG_CONNECT,
});
pool.connect();

app.use(cors());
app.use(express.json());

// =====================================================================
// -------------------------New Login Routes----------------------------
// =====================================================================

app.post("/api/login", (req, res) => {
  //Gets email and password from request body
  const email = req.body.email;
  const password = req.body.password;
  if (email === undefined || password === undefined) {
    res.send("No Email or password");
    //next({status:401, message:"No password or username"});
    return;
  }

  pool
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then((results) => {
      //If there are no emails that match send Incorrect Email message
      if (results.rows.length === 0) {
        res.send({ response: "Incorrect Email" });
      } else {
        //creates user
        if (results.rows[0].password === password) {
          const user = {
            email: email,
            password: password,
            user_id: results.rows[0].user_id,
          };
          const accessToken = jwt.sign(user, process.env.TOKEN_SECRET);
          res.json({ user: user, accessToken: accessToken });
        } else {
          res.send({ response: "Wrong password" });
        }
      }
    })
    .catch((err) => console.log(err));
});

app.post("/api/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (password === undefined || email === undefined) {
    res.send("No Email or Password");
    //next({status:401, message:"No password or username"});
    return;
  }

  pool
    .query(
      "INSERT INTO users (email, password) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING RETURNING *",
      [email, password]
    )
    .then((results) => {
      if (results.rows.length === 0) {
        //If email exists
        res.status(409).send({ response: "Email already exists" });
      } else {
        const user = {
          email: email,
          password: password,
          user_id: results.rows[0].user_id,
        };
        const accessToken = generateAccessToken(user);
        res.json({ user: user, accessToken: accessToken });
      }
    })
    .catch((error) => {
      res.send(`Error:${JSON.stringify(error)}`);
      //next({status:500, message:"Server Error 2"});
      return;
    });
});



//=====================================================================
//-----------------MiddleWare for Authorization------------------------
//=====================================================================

function generateAccessToken(user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, {expiresIn: '15s'});
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
