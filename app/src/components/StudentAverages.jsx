import { React, useState, useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js/auto";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement);

export const StudentAverages = (props) => {
  const {
    students,
    dveAvg,
    loopsAvg,
    functionsAvg,
    arraysAvg,
    objectsAvg,
    domApiAvg,
    serverAvg,
    databaseAvg,
    reactAvg,
  } = props;

  let gradedDveAvg = [];
  for (let i = 0; i < students.length; i++) {
    if (students[i].dve !== null) {
      gradedDveAvg.push(students[i]);
    }
  }

  let gradedLoopsAvg = [];
  for (let i = 0; i < students.length; i++) {
    if (students[i].loops !== null) {
      gradedLoopsAvg.push(students[i]);
    }
  }

  let gradedFunctionsAvg = [];
  for (let i = 0; i < students.length; i++) {
    if (students[i].fun !== null) {
      gradedFunctionsAvg.push(students[i]);
    }
  }

  let gradedArraysAvg = [];
  for (let i = 0; i < students.length; i++) {
    if (students[i].arrays !== null) {
      gradedArraysAvg.push(students[i]);
    }
  }

  let gradedObjectsAvg = [];
  for (let i = 0; i < students.length; i++) {
    if (students[i].obj !== null) {
      gradedObjectsAvg.push(students[i]);
    }
  }

  let gradedDomApiAvg = [];
  for (let i = 0; i < students.length; i++) {
    if (students[i].dom_api !== null) {
      gradedDomApiAvg.push(students[i]);
    }
  }

  let gradedServerAvg = [];
  for (let i = 0; i < students.length; i++) {
    if (students[i].ss !== null) {
      gradedServerAvg.push(students[i]);
    }
  }

  let gradedDatabaseAvg = [];
  for (let i = 0; i < students.length; i++) {
    if (students[i].s_db !== null) {
      gradedDatabaseAvg.push(students[i]);
    }
  }

  let gradedReact = [];
  for (let i = 0; i < students.length; i++) {
    if (students[i].react !== null) {
      gradedReact.push(students[i]);
    }
  }

  var data = {
    labels: [
      "DVE",
      "Loops",
      "Functions",
      "Arrays",
      "Objects",
      "DOM API",
      "Server Side",
      "Server and Database",
      "React",
    ],
    datasets: [
      {
        label: "Cohort Avg",
        data: [
          Math.floor(dveAvg / gradedDveAvg.length),
          Math.floor(loopsAvg / gradedLoopsAvg.length),
          Math.floor(functionsAvg / gradedFunctionsAvg.length),
          Math.floor(arraysAvg / gradedArraysAvg.length),
          Math.floor(objectsAvg / gradedObjectsAvg.length),
          Math.floor(domApiAvg / gradedDomApiAvg.length),
          Math.floor(serverAvg / gradedServerAvg.length),
          Math.floor(databaseAvg / gradedDatabaseAvg.length),
          Math.floor(reactAvg / gradedReact.length),
        ],
        backgroundColor: [
          "rgb(237, 119, 28, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 206, 86, 0.4)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(237, 119, 28, 3)",
          "rgba(54, 162, 235, 3)",
          "rgba(255, 206, 86, 3)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  var options = {
    scales: {
      y: {
        ticks: {
          min: 10,
          max: 100,
          stepSize: 10,
        },
      },
    },
  };
  //render
  return (
    <div id="student-avg-graph">
      <Bar id="bar" data={data} height={330} options={options} />
    </div>
  );
};
