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
    data: [5,5,5,5,5,5,5],
  },
  {
    label: 'My Second dataset',
    data: [5,5,5,5,5,5,5],
  },
  {
    label: 'My Third dataset',
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
      //var query='select TagTimeStamp,Tag_1 AS ERIC,Tag_2 AS VASIA from DATA_table';
      value1="select TagTimeStamp, Tag_1 from DATA_table where TagTimeStamp BETWEEN '2022-07-20 00:30:23.000' and '2022-07-22 04:30:23.000'";
      value2="select TagTimeStamp, Tag_3 AS Tag_1,Tag_2 AS Tag_2,Tag_1 AS Tag_3 from DATA_table WHERE TagTimeStamp BETWEEN '2022-03-16 10:00:00' and '2022-06-25 10:00:00'";
      value3="select count(*) as COUNT_ROWS from DATA_table WHERE TagTimeStamp BETWEEN '2022-07-23 00:00:23.000' and '2022-07-23 04:30:23.000'";
      WhereCondition="WHERE TagTimeStamp BETWEEN '2022-07-23 00:00:23.000' and '2022-07-23 04:30:23.000'"
      value4="SELECT (SELECT COUNT(*) from DATA_table  " + WhereCondition + ") AS COUNT_ROWS,TagTimeStamp, Tag_3 AS Tag_1,Tag_2 AS Tag_2,Tag_1 AS Tag_3 FROM DATA_table " +  WhereCondition ;
      
      
      var query=value4;
      console.log(query)
        request.query(query, function (err, recordset) {

          if (err) console.log(err)
          // console.log("query result", recordset)
          // send records as a response
          var jsonObj = JSON.parse(JSON.stringify(recordset));
           //console.log(jsonObj.recordset[2].TagTimeStamp);
           console.log(recordset.recordset[0].COUNT_ROWS);
           // res.send(recordset);
           res.json(jsonObj)
           // res.send(jsonObj.recordset[2].TagTimeStamp);
           // res.json
        });
      });
  });

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
  const TagName1 = dataFromClient.TagName1
  const TagName2 = dataFromClient.TagName2
  const TagName3 = dataFromClient.TagName3
  const TagNames = buildTagNames(TagName1,TagName2,TagName3)
  const StartDate = dataFromClient.StartDate
  const StartTime = dataFromClient.StartTime
  const EndDate = dataFromClient.EndDate
  const EndTime = dataFromClient.EndTime
  const TagTimeStampStart =  StartDate + ' ' + StartTime
  const TagTimeStampEnd =  EndDate + ' ' + EndTime
  const WhereCondition='WHERE TagTimeStamp BETWEEN ' +  '\''  +  TagTimeStampStart +  '\'' + ' and ' + '\'' + TagTimeStampEnd +  '\''

  console.log(TagNames)

  //====================================
  // connect to your database
  sql.connect(config, function (err) {
    
      if (err) console.log(err);
      else console.log("connected!!!!")
      // create Request object
      var request = new sql.Request();
      let countRows = -1
      
      query= 'SELECT(SELECT COUNT(*) from DATA_table ' + WhereCondition + ') AS COUNT_ROWS , TagTimeStamp, ' + TagNames + ' from DATA_table ' + WhereCondition ;
      console.log(query);      
      request.query(query, function (err, recordset) {

        if (err) console.log(err)

        // send records as a response
        var jsonObj = JSON.parse(JSON.stringify(recordset));
                
        FillSQLData(TagName1,TagName2,TagName3,jsonObj)

        // console.log(jsonObj.recordset[2].TagTimeStamp);
         //console.log(jsonObj);
         //res.json(jsonObj)

      });
      });
    
  
  //res.json({"data":data.datasets[0].data})
  setTimeout(function(){
    res.json({"data":data.datasets})
}, 1000);
  //console.log(data.datasets[0].data)
});

//=====================================================================================
function FillSQLData(TagName1,TagName2,TagName3,jsonObj){
  let countRows = jsonObj.recordset[0].COUNT_ROWS
  let step = Math.floor(countRows/200);
  console.log(step)
  for(let i=0;i<countRows;i+=step){
    data.labels[i]=jsonObj.recordset[i].TagTimeStamp
    if(TagName1 != "---"){
      data.datasets[0].data[i]=jsonObj.recordset[i].Tag_1
    //console.log(data.datasets[0].data[i])
    }
    if(TagName2 != "---"){
      data.datasets[1].data[i]=jsonObj.recordset[i].Tag_2
    }
    if(TagName3 != "---"){
      data.datasets[2].data[i]=jsonObj.recordset[i].Tag_3
    }
 } 
 if(TagName1 == "---"){
  data.datasets[0].data.length=0;
 }
 if(TagName2 == "---"){
  data.datasets[1].data.length=0;
 }
 if(TagName3 == "---"){
  data.datasets[2].data.length=0;
 }
}
//=====================================================================================

function buildTagNames(){
  let TagNames = ""
  for (let i = 0; i < arguments.length; i++) {
    if(arguments[i] != "---"){
      if(TagNames==""){
        TagNames = arguments[i] + " AS Tag_" + (i+1)
      }else{
        TagNames = TagNames + "," + arguments[i] + " AS Tag_" + (i+1)
      }
    }
  }
  return TagNames
};
//=====================================================================================

