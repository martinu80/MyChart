

function pushValue2Chat(){
	const push = document.getElementById('push');
push.addEventListener('click',pushValue2Chat );
const pushValue = document.getElementById('pushValue');
	myChart.data.datasets[0].data.push(pushValue.value);
	myChart.data.labels.push('test');
	myChart.update();
};
// ==========================================================================
// Filter dates  From...To	 script

function filterDate(){
const Start_date=new Date(document.getElementById('from-date').value);
console.log(Start_date);
const Start_time=Start_date.setHours(0,0,0,0);
const End_date=new Date(document.getElementById('to-date').value);
console.log(End_date);
const End_time=End_date.setHours(0,0,0,0);

const filterDates=convertedDates.filter(date => date >= Start_date && date <= End_date)
console.log(filterDates);
myChart.config.data.labels=filterDates;
const startArray=convertedDates.indexOf(filterDates[0]);
console.log(startArray);
const endArray=convertedDates.indexOf(filterDates[filterDates.length -1]);
console.log(endArray);
myChart.update();
};

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

function updateConfigByMutating(chart) {
    chart.options.plugins.title.text = 'new title';
    chart.update();
}

function updateConfigAsNewObject(chart) {
    chart.options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Chart.js'
            }
        },
        scales: {
            x: {
                display: true
            },
            y: {
                display: true
            }
        }
    };
    chart.update();
}

function updateScale(chart) {
   chart.options.scales.y = {
       type: 'logarithmic'
   };
   chart.update();
}

function updateScales(chart) {
    let xScale = chart.scales.x;
    let yScale = chart.scales.y;
    chart.options.scales = {
        newId: {
            display: true
        },
        y: {
            display: true,
            type: 'logarithmic'
        }
    };
    chart.update();
    // need to update the reference
    xScale = chart.scales.newId;
    yScale = chart.scales.y;
}

function UpdateChart() {
const pushValue=(document.getElementById('pushValue'));
myChart.data.datasets[0].data[7] = pushValue.value;
console.log(myChart.data.datasets[0].data[7]);
myChart.update()
}

function resetDate(){

}


function pushValueChart(){
  const pushValue=(document.getElementById('pushValue'));
  const push=(document.getElementById('push'));
  push.addEventListener('click', pushValueChart);
  chart.data.labels.push(label);

  //console.log(myChart.data.datasets[0].data);
  myChart.data.datasets[0].data.push(pushValue.value);
  console.log(myChart.data.datasets[0].data.push(pushValue.value));

  myChart.update();
}

//============================================================================

function startTime() {
 const today = new Date();
 //let x = new Date().toLocaleString("en-US", {timeZone: "Israel/Jerusalem"});
 //let x1 = x.getMonth() + 1 + "/" + x.getDate() + "/" + x.getYear();
 //x1 = x1 + " - " + x.getHours( ) + ":" + x.getMinutes() + ":" + x.getSeconds();
 
 let h = today.getHours();
 let m = today.getMinutes();
 let s = today.getSeconds();
 m = checkTime(m);
 s = checkTime(s);
 document.getElementById('txt').innerHTML = today; //+ ";"  h + ":" + m + ":" + s;
 setTimeout(startTime, 1000);
}

function checkTime(i) {
 if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
 return i;
}

//============================================================================


function drop_options(value){
  Console.log(document.getElementById(value).value);
}

function Min(){
  var nums = datapoints;
  let arrayList = nums;
  let min = arrayList[0];
  for (let i = 1; i < arrayList.length; ++i) {
    if (arrayList[i] < min) {
      min = arrayList[i];
    }
  }
  //console.log(min);
document.getElementById("Value_1").innerHTML = (min);
}

function Max(){
  var nums = datapoints;
  let arrayList = nums;
  let max = arrayList[0];
  for (let i = 1; i < arrayList.length; ++i) {
    if (arrayList[i] > max) {
      max = arrayList[i];
    }
  }
//  console.log(max);
document.getElementById("Value_1").innerHTML = (max);
}

function AVG(){
//   //An array of numbers that we want to get the average of.
 var nums = datapoints;//[0, 150, 30, 20, -8, -200];
//
// //Work out the sum of the numbers in our array
// var totalSum = 0;
// for(var i in nums) {
//   totalSum += nums[i];
// }
// //Work out how many numbers are in our array.
// var numsCnt = nums.length;
//
// //Finally, get the average.
// var average = totalSum / numsCnt;
let totalSum = 0;
let average = 0;

for(const num of nums) {
  totalSum += num;
  average = totalSum/nums.length;
}
console.log(average);
//Print the average .
document.getElementById("Value_1").innerHTML = (average);
}

//============================================================================

function openTab(evt, TabName) {
var i, tabcontent, tablinks;
tabcontent = document.getElementsByClassName("tabcontent");
for (i = 0; i < tabcontent.length; i++) {
  tabcontent[i].style.display = "none";
}
tablinks = document.getElementsByClassName("tablinks");
for (i = 0; i < tablinks.length; i++) {
  tablinks[i].className = tablinks[i].className.replace(" active", "");
}
document.getElementById(TabName).style.display = "block";
evt.currentTarget.className += " active";
}

//==============================================================================
function Group_datapoints(Group){
    console.log(Group);
if (Group="G1") {
  datapoints=[17, 186, 155, 134, 111, 167, 187];//dataFromServer;
  labels=['a1','a2','a3','a4','a5','a6','G1'];  //console.log(Group);
    console.log(data[0]);
    console.log(datapoints);
    console.log(labels);
    
    myChart.update();
}
if (Group='G2'){
datapoints=[27, 286, 255, 234, 211, 267, 287];
labels=['b1','b2','b3','b4','b5','b6','G2'];
console.log(datapoints);
console.log(labels);
console.log(data[0]);
//console.log(myChart.data.datasets[0].data);
//console.log(myChart.data.datasets[0].data.push(pushValue.value));
myChart.update();
}
if (Group='G3'){
datapoints=[41, 26, 35, 123, 61, 156, 133];
labels=['d1','d2','d3','d4','d5','d6','G3'];
console.log(datapoints);
myChart.update();
}
}



function getPersons() {
  var xmlHttpRequest = new XMLHttpRequest();
  
  xmlHttpRequest.onreadystatechange = function() {
  if ( xmlHttpRequest.readyState == XMLHttpRequest.DONE && xmlHttpRequest.status == 200 ) {
    document.getElementById("myChart").innerHTML = xmlHttpRequest.responseText;
  }
  };
  xmlHttpRequest.open('GET', 'http://localhost:5000/chart', true);
  xmlHttpRequest.send();
  }


  function progresbar(){
  var socket = io('http://localhost:5000/chart');
  socket.on('connect', function(){});
  socket.on('message', function(data){
    $('#progressbar').progressbar({
    maximum: 100,
    step: JSON.parse(data).percent
    });
  });
  socket.on('disconnect', function(){});
}