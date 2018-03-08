let compra = {};
let selectedHour = localStorage.getItem("selectedHour");

if ($(document).ready()) {
    switch(selectedHour){
        case "1":
            selectedHour = "15:00";
        break;
        case "2":
            selectedHour = "18:00";

        break;
        case "3":
            selectedHour = "21:00";
        break;
        default:  
            selectedHour = "00:00";
        break;
    }
    compra = JSON.parse(localStorage.getItem("compra"));
    for (let i = 0; i < compra.asientos.length; i++) {
        $("#moviesContainer").append("<div class='cardoWrap'> <div class='cardo cardoLeft'> <h1 class='title2'>Tolmo <span>Cines</span></h1> <div class='titleCard'> <h2>" + localStorage.getItem("movieName") + "</h2> <span>movie</span> </div> <div class='nameCard'> <h2>" + compra.nombre + "</h2> <span>Name</span> </div> <div class='seatCard'> <h2>F" + compra.asientos[i][0] + "A" + compra.asientos[i][1] + "</h2><span>seat</span> </div> <div class='time'> <h2>" + selectedHour + "</h2> <span>hour</span> </div> </div> <div class='cardo cardoRight'> <div class='eye'></div> <div class='number'> <h3>F" + compra.asientos[i][0] + "A" + compra.asientos[i][1] + "</h3> <span>seat</span> </div> <div class='barcode'></div> </div> </div>");
    }
}