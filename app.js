var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const Chart = require('chart.js');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];

const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45],
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {}
};




app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

app.get("/", (req, res) => {
  // const ctx = document.getElementById('myChart');
  //   const myChart = new Chart(ctx, config);
  // console.log(__dirname)
  // res.sendFile(__dirname + "/index.html");
  res.send("Vasia")
});
