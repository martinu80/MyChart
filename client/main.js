// Do not show lines for all datasets by default
//Chart.defaults.datasets.line.showLine = false;

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
    data: [0, 0],
    label: 'Tag_Name1',
    fill: false,
    borderColor: 'rgb(0, 255, 90)',
    backgroundColor: 'rgb(0, 255, 90)',
    showLine: true // overrides the `line` dataset default
  }, 
   {
      data: [0, 1],
      label: 'Tag_Name2',
      fill: false,
      borderColor: 'rgb(50, 255, 255)',
      backgroundColor: 'rgb(50, 255, 255)',
      showLine: false // overrides the `line` dataset default
  }]/*, {
      data: [1, 0],
      label: 'Tag_Name3',
      fill: false,
      borderColor: 'rgb(0, 150, 192)',
      backgroundColor: 'rgb(0, 150, 192)',
      showLine: false // overrides the `line` dataset default
  }, {
      //type: 'scatter', // 'line' dataset default does not affect this dataset since it's a 'scatter'
      label: 'Tag_Name',
      data: [1, 1],
      fill: false,
      borderColor: 'rgb(0, 0, 192)',
      backgroundColor: 'rgb(0, 0, 192)',
      showLine: false // overrides the `line` dataset default
    }] */
  /*   datasets: [{
      label: 'Tag_Name',
      data: [0, 0, 0, 0, 0, 0, 0],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgb(75, 192, 192)',
    }] */
  };

  const config = {
    type: 'line',
    data: data,
    options: {},
    plugins: []
  };


 // Chart.defaults.interaction.mode = 'nearest';
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );


//main()

async function getChartDataFromServer(){
    const response = await axios.get("http://localhost:5000/chart");
    //console.log(response.data)
    return response.data;
}

async function generate(){
    const response = await axios.post("http://localhost:5000/post-data",{
        "min":12,
        "max":20
    });
    response.data.status === true ? alert("success") : alert("fail")
    
}

async function sendParametersToServer(){
const TagName = document.getElementById("graphs")[document.getElementById("graphs").selectedIndex].text
    const TagName1 = document.getElementsByClassName("tablinks").value
    const StartDate = document.getElementById("start_date").value
    const EndDate = document.getElementById("end_date").value
    const StartTime = document.getElementById("start_time").value
    const EndTime = document.getElementById("end_time").value
    console.log(TagName);
    console.log(TagName1);
    console.log(StartDate);
    console.log(EndDate);
    const response = await axios.post("http://localhost:5000/post-eric",{
        "TagName":TagName,
        //"function":20
        "StartDate" : StartDate,
        "EndDate" : EndDate,
        "StartTime" : StartTime,
        "EndTime" : EndTime        
    });
    //response.data.status === true ? alert("success") : alert("fail")
    
    const dataFromServer = await getChartDataFromServer()

    
    //console.log(dataFromServer.datasets[0].data)
    data.labels=[...dataFromServer.labels]
    data.datasets[0].data=[...dataFromServer.datasets[0].data]
    //data.datasets[1].data=[...dataFromServer.datasets[1].data]
    //data.datasets[2].data=[...dataFromServer.datasets[2].data]
    myChart.update()
    //alert(response.data.TagName)    
    
}




                         
async function main(){
    // const ctx = document.getElementById('myChart').getContext('2d');
    //const dataFromServer = await getChartDataFromServer()
    // const myChart = new Chart(ctx, {
    // type: 'line',
    // data: dataFromServer,
    // options: commonOptions 
    //     }
    // );
    //data.datasets[0].data=[...dataFromServer.data]
    //console(dataFromServer)
    //myChart.update();
    }
// ============================================================================================




