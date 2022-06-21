main()

async function getChartDataFromServer(){
    const response = await axios.get("http://localhost:5000/chart");
    return response.data;
}

async function generate(){
    const response = await axios.post("http://localhost:5000/post-data",{
        "min":12,
        "max":20
    });
    response.data.status === true ? alert("success") : alert("fail")
}

// ============================================================================================
var commonOptions={
    scales:{
        xAxes:[{
            type:'time',
            time:{
            displayFormats: {
            milliseconds: 'mm:ss:SSS'
                            }
                }
            }],
        yAxes:[{
            ticks: {
                beginAtZero:true,
          min: 6,
          max:20
                    }
                }]
            },
            legend: {display:true},
            tooltips:{
                enabled:true
                    }
            };
            
            const data = {
                //labels: labels,
                datasets: [{
                  label: 'Line1 Dataset',
                  //data: dataFromServer,
                  fill: false,
                  backgroundColor: 'rgb(75, 192, 192)',
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.1
                      }, {
                          label: 'Line2 Dataset',
                          backgroundColor: 'rgb(255, 255, 132)',
                          borderColor: 'rgb(255, 255, 132)',
                          data: [{x:'2016-12-25', y:201},{x:'2016-12-25', y:20},{x:'2016-12-26', y:340},{x:'2016-12-27', y:120},{x:'2016-12-28', y:200}],
                      }, {
                          label: 'Line3 Dataset',
                          backgroundColor: 'rgb(255, 99, 132)',
                          borderColor: 'rgb(255, 99, 132)',
                          data: [200, 300, 100, 30],
                         // showLine: true // overrides the `line` dataset default
                      }, {
                          //type: 'scatter', // 'line' dataset default does not affect this dataset since it's a 'scatter'
                          backgroundColor: 'rgb(99, 99, 132)',
                          borderColor: 'rgb(99, 99, 132)',
                          data: [0, 10, 5, 2, 20, 30, 45],
                      }]
                  };
                         
async function main(){
    const ctx = document.getElementById('myChart').getContext('2d');
    const dataFromServer = await getChartDataFromServer()
    const myChart = new Chart(ctx, {
    type: 'line',
    data: dataFromServer,
    options: commonOptions 
        }
    );
    }
// ============================================================================================




