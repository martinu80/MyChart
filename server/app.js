var express = require('express');
var cors = require('cors');
const sql = require('mssql/msnodesqlv8');
//import {config} from './sql_config.js';
const { config } = require('./sql_config.js') 

const data = {
  labels: [
    //jsonObj.recordset[i].TagTimeStamp,
    'Junuary',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July'
  ],
  datasets: [{
    label: 'My First dataset',
    //backgroundColor: 'rgb(255, 99, 132)',
    //borderColor: 'rgb(255, 99, 132)',
    data: [5,5,5,5,5,5,5],
  }]
};

var app = express();
app.use(cors())
const bodyParser = require('body-parser');
const Chart = require('chart.js');
const { Char } = require('mssql/msnodesqlv8');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.listen(5000, () => {
  console.log("Application started and Listening on port 5000");
});

//--------------------------------------------------
app.get('/', (req, res) => {



  // connect to your database
  sql.connect(config, function (err) {
    // app.post("/post-data", (req, res) => {
       const dataFromClient = req.body;
    
      if (err) console.log(err);
      else console.log("connected!!!!")
      // create Request object
      var request = new sql.Request();
      var query='select TagTimeStamp,Tag_1 from DATA_table';
      value1="select TagTimeStamp, Tag_1 from DATA_table where TagTimeStamp BETWEEN '2022-07-20 00:30:23.000' and '2022-07-22 04:30:23.000'";
      value2="";
      //var query=value1;
/*       value1=dataFromClient.Start_date & dataFromClient.Start_time;
      console.log(value1);
      value2=dataFromClient.End_date & dataFromClient.End_time;
      console.log(value2); */
      //var query= 'DATA_table WHERE TagTimeStamp BETWEEN' & value1 & 'AND' & value2 & '"';
      //var query= 'SELECT * FROM [TEST_db].[dbo].[DATA_table] WHERE [TagTimeStamp] BETWEEN value1 AND value2'
      // query to the database and get the records
      //request.query('select TOP (2) TagTimeStamp from DATA_table', function (err, recordset) {
      //  request.query('select TOP (5)  Tag_1,Tag_2,Tag_3 from TEST_table', function (err, recordset) {
        request.query(query, function (err, recordset) {

          if (err) console.log(err)
          // console.log("query result", recordset)
          // send records as a response
          var jsonObj = JSON.parse(JSON.stringify(recordset));
           //console.log(jsonObj.recordset[2].TagTimeStamp);
           //console.log(recordset);
           // res.send(recordset);
           res.json(jsonObj)
           // res.send(jsonObj.recordset[2].TagTimeStamp);
           // res.json
        });
      });
  });
//});
/* let arrayList = jsonObj.recordset[i].TagTimeStamp;
for (let i = 1; i < arrayList.length; ++i) {
  if (arrayList[i] > max) {
    max = arrayList[i];
  }
} */
//--------------------------------------------------
app.get("/chart", (req, res) => { 
/*   const data = {
    labels: [
      //jsonObj.recordset[i].TagTimeStamp,
      'Junuary',
      'February',
      'March',
      'April',
      'May',
      'June',
    ],
    datasets: [{
      label: 'My First dataset',
      //backgroundColor: 'rgb(255, 99, 132)',
      //borderColor: 'rgb(255, 99, 132)',
      data: [0, 40, 5, 2, 20, 30, 45],
    }]
  }; */
  
  res.json(data)
});

app.post("/post-data", (req, res) => {
  const dataFromClient = req.body;
  // await request to db 
  const status = dataFromClient.min > 10 ? true : false
  res.json({"status":status})
  console.log(dataFromClient)
});

app.post("/post-eric", (req, res) => {
  const dataFromClient = req.body;
  // await request to db 
  const TagName = dataFromClient.TagName
  const StartDate = dataFromClient.StartDate
  const StartTime = dataFromClient.StartTime
  const EndDate = dataFromClient.EndDate
  const EndTime = dataFromClient.EndTime
  const TagTimeStampStart =  StartDate + ' ' + StartTime
  const TagTimeStampEnd =  EndDate + ' ' + EndTime
  console.log(dataFromClient)
  console.log(StartDate)
  console.log(StartTime)
  console.log(EndDate)
  console.log(EndTime)
  console.log(TagTimeStampStart)
  console.log(TagTimeStampEnd)
  //====================================
  // connect to your database
  sql.connect(config, function (err) {
    
      if (err) console.log(err);
      else console.log("connected!!!!")
      // create Request object
      var request = new sql.Request();
      var query='select TagTimeStamp, ' + TagName + ' from DATA_table WHERE TagTimeStamp BETWEEN ' +  '\''  +  TagTimeStampStart +  '\'' + ' and ' + '\'' + TagTimeStampEnd +  '\'';
      //var query='select TagTimeStamp, ' + TagName + ' from DATA_table where TagTimeStamp = ' + '\'' + StartDate + ' ' + StartTime  + '\'';
//select TagTimeStamp from DATA_table where TagTimeStamp BETWEEN '2022-07-20 00:30:23.000' and '2022-07-20 04:30:23.000'
console.log(query);
        request.query(query, function (err, recordset) {

          if (err) console.log(err)
          // console.log("query result", recordset)
          // send records as a response
          var jsonObj = JSON.parse(JSON.stringify(recordset));
          
          data.datasets[0].label=TagName
          console.log(jsonObj.recordsets.length)
          //if(){}
          for(i=0;i<100;i++){
            data.labels[i]=jsonObj.recordset[i].TagTimeStamp
            if(TagName=="Tag_1"){
              data.datasets[0].data[i]=jsonObj.recordset[i].Tag_1
            //console.log(data.datasets[0].data[i])
            }
            if(TagName=="Tag_2"){
              data.datasets[0].data[i]=jsonObj.recordset[i].Tag_2
            }
            if(TagName=="Tag_3"){
              data.datasets[0].data[i]=jsonObj.recordset[i].Tag_3
            }
        }
        
          // console.log(jsonObj.recordset[2].TagTimeStamp);
           //console.log(jsonObj);
           //res.json(jsonObj)

        });
      });
  
  //====================================


  //res.json({"data":data.datasets[0].data})
  setTimeout(function(){
    res.json({"data":data.datasets[0].data})
}, 1000);
  //console.log(data.datasets[0].data)
});

