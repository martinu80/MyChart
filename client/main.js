const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            data: [0, 0],
            label: 'Tag_Name1',
            fill: false,
            borderColor: 'rgb(0, 255, 90)',
            backgroundColor: 'rgb(0, 255, 90)',
            yAxisID: 'y',
            showLine: false, // overrides the `line` dataset default
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: 'rgb(0, 255, 90)',
                            position: 'top',
                            text: 'Tag_Name1'  
                        }
                    }
                }
            }
        }, 
        {
            data: [0, 1],
            label: 'Tag_Name2',
            fill: false,
            borderColor: 'rgb(255, 50, 115)',
            backgroundColor: 'rgb(255, 50, 115)',
            yAxisID: 'y1',
            showLine: false, // overrides the `line` dataset default
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: 'rgb(255, 50, 115)',
                            position: 'top',
                            text: 'Tag_Name2'
                        }
                    }
                }
            }

        }, 
        {
            data: [1, 0],
            label: 'Tag_Name3',
            fill: false,
            borderColor: 'rgb(0, 150, 190)',
            backgroundColor: 'rgb(0, 150, 190)',
            yAxisID: 'y2',
            showLine: false, // overrides the `line` dataset default
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: 'rgb(0, 150, 190)',
                            position: 'top',
                            text: 'Tag_Name3'
                        }
                    }
                }
            }

        }
    ]
  };
// const options= {
//     elements:{
//         line: borderWidth = 1,
//         point: radius = 1,
//         plugins: [{
//             legend: {
//                 display: true,
//                 labels: {
//                     color: 'rgb(255, 99, 132)'
//                 }
//             },
//             title: {
//                 display: false,
//                 text: 'Custom Chart Title',
//                 padding: {
//                     top: 10,
//                     bottom: 30
//                 }
//             }
//         }]
//     }
//}
// const plugins={
//     plugins: {
//         title: {
//             display: true,
//             text: 'Custom Chart Title'
//         }
//     }
// } 

  const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'rgb(0, 0, 255)',
                    position: 'top'
                }
            },
          title: {
            display: true,
            text: 'Custom Chart Title'
          },
        },
        interaction: {
          // mode: 'index',
          intersect: false,
        },
        radius: 2,
        spanGaps: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date and Time '
            },
            time: {
                displayFormats: {
                    quarter: 'MMM YYYY'
                }
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Value1'
            },
            suggestedMin: -10,
            suggestedMax: 200
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Value2'
            },
            suggestedMin: -10,
            suggestedMax: 200
          },
          y2: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Value3'
            },
            suggestedMin: -10,
            suggestedMax: 200
          }
        },
        line: {
            showLine: false
        }
      },
    //options: options,
    //plugins: plugins
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
    const TagName1 = document.getElementById("graphs1")[document.getElementById("graphs1").selectedIndex].text
    const TagName2 = document.getElementById("graphs2")[document.getElementById("graphs2").selectedIndex].text
    const TagName3 = document.getElementById("graphs3")[document.getElementById("graphs3").selectedIndex].text 

    const StartDate = document.getElementById("start_date").value
    const EndDate = document.getElementById("end_date").value
    const StartTime = document.getElementById("start_time").value
    const EndTime = document.getElementById("end_time").value
    console.log(TagName1);
    console.log(TagName2);
    console.log(TagName3);
    console.log(StartDate);
    console.log(EndDate);
    const response = await axios.post("http://localhost:5000/post-eric",{
        "TagName1":TagName1,
        "TagName2":TagName2,
        "TagName3":TagName3,
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
    //if(TagName1 != "---"){
        data.datasets[0].data=[...dataFromServer.datasets[0].data],
        data.datasets[0].options.plugins.legend.display=false,
        data.datasets[0].options.plugins.legend.title=TagName1,
        data.datasets[0].options.plugins.legend.labels.text=TagName1,//console.log(data.datasets[0].label)
        data.datasets[0].label=TagName1
        //data.datasets[0].options.plugins.legend.labels.text=TagName1,
        //data.datasets[0].options.plugins.legend.title.color= rgb(250, 50, 115),
        console.log(data.datasets[0].options.plugins.legend.labels.text),
        console.log(data.datasets[0].label),
        // Max(0)
        // AVG(0)
        // Min(0)
        // data.datasets[0].options.plugins.legend.title=TagName1.text
      //} 
      //if(TagName2 != "---"){
        data.datasets[1].data=[...dataFromServer.datasets[1].data],
        data.datasets[1].options.plugins.legend.display=true,
        data.datasets[1].options.plugins.legend.title=TagName2,
        data.datasets[1].options.plugins.legend.labels.text=TagName2,//console.log(data.datasets[1].label)
        data.datasets[1].label=TagName2
        // Max(1)
        // AVG(1)
        // Min(1)

        //data.datasets[1].options.plugins.legend.title.color= rgb(0, 255, 90),
        //console.log(data.datasets[1].options.plugins.legend.title)
      //}
      //if(TagName3 != "---"){
        data.datasets[2].data=[...dataFromServer.datasets[2].data],
        data.datasets[2].options.plugins.legend.display=true,
        data.datasets[2].options.plugins.legend.title=TagName3,
        data.datasets[2].options.plugins.legend.labels.text=TagName3,//console.log(data.datasets[2].label)
        data.datasets[2].label=TagName3
        // Max(2)
        // AVG(2)
        // Min(2)
        //data.datasets[2].options.plugins.legend.title.color= rgb(0, 150, 190),
        //console.log(data.datasets[2].options.plugins.legend.title)
      //}
      Max(0)
      AVG(0)
      Min(0)
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


  function RemoveData() {
    alert("vasia")
    myChart.destroy()
  }


