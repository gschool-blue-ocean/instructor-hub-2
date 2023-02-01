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
  let gradedLoopAvg = [];
  let gradedFunAvg = [];
  let gradedArraysAvg = [];
  let gradedObjAvg = [];
  let gradedDomApiAvg = [];
  let gradedServerAvg = [];
  let gradedDatabaseAvg = [];
  let gradedReactAvg = [];
  for (let i = 0; i < students.length; i++) {
    console.log(students[i]);
    if (students[i].dve > 0) {
      gradedDveAvg.push(students[i]);
    }
    if (students[i].loops > 0) {
      gradedLoopAvg.push(students[i]);
    }
    if (students[i].functions > 0) {
      gradedFunAvg.push(students[i]);
    }
    if (students[i].arrays > 0) {
      gradedArraysAvg.push(students[i]);
    }
    if (students[i].objects > 0) {
      gradedObjAvg.push(students[i]);
    }
    if (students[i].dom_api > 0) {
      gradedDomApiAvg.push(students[i]);
    }
    if (students[i].server_side > 0) {
      gradedServerAvg.push(students[i]);
    }
    if (students[i].server_database > 0) {
      gradedDatabaseAvg.push(students[i]);
    }
    if (students[i].react > 0) {
      gradedReactAvg.push(students[i]);
    }
  }

  console.log(students);
  console.log(gradedLoopAvg);
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
          Math.floor(loopsAvg / gradedLoopAvg.length),
          Math.floor(functionsAvg / gradedFunAvg.length),
          Math.floor(arraysAvg / gradedArraysAvg.length),
          Math.floor(objectsAvg / gradedObjAvg.length),
          Math.floor(domApiAvg / gradedDomApiAvg.length),
          Math.floor(serverAvg / gradedServerAvg.length),
          Math.floor(databaseAvg / gradedDatabaseAvg.length),
          Math.floor(reactAvg / gradedReactAvg.length),
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
