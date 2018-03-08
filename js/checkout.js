var compra = {};
let purchasesList = [];


if($(document).ready()){
    if(localStorage.getItem("purchasesList") != null){
        purchasesList = JSON.parse(localStorage.getItem("purchasesList"));
    }
    compra = JSON.parse(localStorage.getItem("compra"));
    $("#buy").click(function(){
        if($("#nameInput").val() != "" && $("#emailInput").val() != ""){
            compra.nombre = $("#nameInput").val();
            compra.email = $("#emailInput").val();
            compra.fechaCompra = new Date().toDateString();
            purchasesList.push(compra);
            localStorage.setItem("purchasesList", JSON.stringify(purchasesList));
            console.log(compra);
        }
        else{
            alert("Debe rellenar todos los campos");
        }
        
    });
}