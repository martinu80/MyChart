const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Looping tension',
      data: [56, 59, 80, 81, 26, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgb(75, 192, 192)',
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };

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
    //const temp=document.getElementById("start_date").value
    const StartDate = document.getElementById("start_date").value
    const EndDate = document.getElementById("end_date").value
    const StartTime = document.getElementById("start_time").value
    const EndTime = document.getElementById("end_time").value
    console.log(TagName)
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
    data.datasets[0].data=[...dataFromServer.datasets[0].data]
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




