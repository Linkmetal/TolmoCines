google.charts.load('current', {
    'packages': ['corechart']
});
google.charts.setOnLoadCallback(drawChart);

let votes_ = JSON.parse(localStorage.getItem("votes"));
let movies = [];
let times = [];

function calculate() {
    for (let i = 0; i < votes_.length; i++) {
        if (movies.indexOf(votes_[i].movie) == -1) {
            movies.push(votes_[i].movie);
            times.push(1);
        } else {
            times[movies.indexOf(votes_[i].movie)]++;
        }
    }
    console.log(movies);
    console.log(times);

}


function drawChart() {
    var tts = "Resultados de la votación: ";
    calculate();
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Movie');
    data.addColumn('number', 'Votes');
    for(let i = 0; i < times.length; i++){
        data.addRow([movies[i], times[i]]);
        tts += movies[i] + ", " + times[i] + " votos. "
    }
    $("#chartDiv1, #chartDiv2, #chartDiv3").attr("aria-label", tts);
    $("#chartDiv1, #chartDiv2, #chartDiv3").attr("tabindex", 0);


    // Set chart options
    var options = {
        'title': 'Votos a la mejor película',
        'width': 0.7*window.innerWidth,
        'height':0.5*window.innerHeight,
        is3D: true
    };
    
    // Instantiate and draw our chart, passing in some options.
    $( "#tabs" ).tabs();
    var chart1 = new google.visualization.PieChart(document.getElementById('chartDiv1'));
    var chart2 = new google.visualization.AreaChart(document.getElementById("chartDiv2"));
    var chart3 = new google.visualization.ColumnChart(document.getElementById("chartDiv3"));
    chart1.draw(data, options);
    chart2.draw(data, options);
    chart3.draw(data, options);
}