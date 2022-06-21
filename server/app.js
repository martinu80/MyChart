var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors())
const bodyParser = require('body-parser');
const Chart = require('chart.js');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.listen(5000, () => {
  console.log("Application started and Listening on port 5000");
});

app.get("/chart", (req, res) => {
  const data = {
    labels: [
      'stella',
      'February',
      'March',
      'April',
      'May',
      'June',
    ],
    datasets: [{
      label: 'My First dataset',
      // backgroundColor: 'rgb(255, 99, 132)',
      // borderColor: 'rgb(255, 99, 132)',
      data: [0, 40, 5, 2, 20, 30, 45],
    }]
  };
  res.json(data)
});

app.post("/post-data", (req, res) => {
  const dataFromClient = req.body;
  // await request to db 
  const status = dataFromClient.min > 10 ? true : false
  res.json({"status":status})
  console.log(dataFromClient)
});
