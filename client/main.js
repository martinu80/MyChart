main()

async function getChartDataFromServer(){
    const response = await axios.get("http://localhost:3000/chart");
    return response.data;
}

async function generate(){
    const response = await axios.post("http://localhost:3000/post-data",{
        "min":12,
        "max":20
    });
    response.data.status === true ? alert("success") : alert("fail")
}

async function main(){
    const ctx = document.getElementById('myChart').getContext('2d');
    const dataFromServer = await getChartDataFromServer()
    const myChart = new Chart(ctx, {
    type: 'line',
    data: dataFromServer,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

}



