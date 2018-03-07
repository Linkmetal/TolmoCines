let data_;
let seats = [];


if($(document).ready()){
    if(localStorage.getItem("seats") == null){
        init_();
    }
    else{
        data_ = JSON.parse(localStorage.getItem("seats"));
        Data(); 
    }
}

function init_(){
    readTextFile("/json/seats.json", function(text){
        data_ = JSON.parse(text);
        //seats = document.getElementsByTagName("use");
        for(let i = 0; i < seats.length; i++){
            seats[i].addEventListener("click", function(e){
                if(e.target.className.baseVal == "free"){
                    e.target.className.baseVal = "selected";
                }
            }, false);
        }
        localStorage.setItem("seats", JSON.stringify(data_));
        Data();
    }); 
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    };
    rawFile.send(null);
}

function Data(){
    for(let i = 1; i <= 45; i++){
        document.getElementById("svgSala").innerHTML += ("<use id='butaca" + i + "' href='#butaca_' x='" + data_[i].x + "'y='" + data_[i].y + "' width='250' height='125'/>");
        console.log(i);
    }
    seats = document.getElementsByTagName("use");
    for(let i = 0; i < seats.length; i++){
        if(data_[i+1].reserved == true){
            seats[i].classList.add("busy");
        }
        else{
            seats[i].classList.add("free");
        }
        seats[i].addEventListener("click", function(e){
            var ind = e.target.id;
            ind = ind.split("butaca");
            ind = ind[1];
            if(e.target.className.baseVal == "free"){
                e.target.className.baseVal = "selected";
                data_[ind].reserved = true;
            }
            else{
                if(e.target.className.baseVal == "selected"){
                    e.target.className.baseVal = "free";
                    data_[ind].reserved = false;
                }
            }
        }, false);
    }
}

function submitReserve(){
    localStorage.setItem("seats", JSON.stringify(data_));
    let msg = "";
    for(let i = 0; i < seats.length; i++){
        if(seats[i].className.baseVal == "selected"){
            data_[i+1].reserved = true;
            msg += "Has reservado el asiento número " + data_[i+1].seat + " de la fila " + data_[i+1].row + ".\n";
        }
    }
    alert(msg);
    Data();
}

