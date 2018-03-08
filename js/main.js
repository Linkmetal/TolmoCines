let movies;
let data = [];
let moved = false;
let moving = false;
let selectedMovie;
let selectedHour;

function load() {
    $.getJSON("json/moviesData.json", function (json) {
        movies = $(".movie");
        data = json;
        for (let i = 0; i < data.length; i++) {
            movies[i].style.backgroundImage = "url('img/" + data[i].image + "')";
            $(movies[i]).find("a").text(data[i].name);
            $(movies[i]).find("a").attr("aria-label", data[i].name)
        }
        showInfo();
    });
}

$(document).ready(function () {
    load();
    $("#formDiv").hide();
    $(".details").hide();
    $(".movie").click(function (e) {
        if (moving == false) {
            moving = true;
            if (moved == true) {
                resetPositions(this);
                moved = false;
                $(this).css('z-index', 2);
                $(this).next().css('z-index', 1);
                $(".movie").find("a").attr('tabindex', 1);
                $(this).next().toggle("fold", 1000);
                $(this).find("a").attr("aria-label", $(this).next().find("p").text());
            } else {
                $("p:visible").focus();
                $(this).css('position', "inherit");
                $(".movie").find("a").attr('tabindex', -1);
                $(".movie, .details").css('z-index', 0);
                $(this).css('z-index', 2);
                $(this).next().css('z-index', 1);
                $(this).find("a").attr('tabindex', 1);
                $(this).next().toggle("fold", 1000);
                $(this).find("a").attr("aria-label", "Pulse enter para seleccionar otra pelicula");
                if (window.innerWidth > 1023) {
                    $(this).position({
                        my: "left top",
                        at: "left+8% top+8%",
                        of: $(this).next(),
                        using: function (pos) {
                            $(this).animate(pos, "slow");
                        }
                    });
                }
                else{
                    if (window.innerWidth >= 375 && window.innerWidth < 1000) {
                        $(this).position({
                            my: "center botom",
                            at: "center botom",
                            of: $(this).next(),
                            using: function (pos) {
                                $(this).animate(pos, "slow");
                            }
                        });
                    }
                }
                moved = true;
            }
            moving = false;
        }
    });
});

function resetPositions(e) {
    $(e).css({
        "position": "flex",
        "top": "auto",
        "left": "auto"
    });
    $(e).next().find("button").position({
        my: "center center",
        at: "center-5% bottom-12%",
        of: $(e).next(),
    });
}




function showInfo() {
    let movies = $(".movie");
    for (let i = 0; i < movies.length; i++) {
        let id = movies[i].id;
        id = id.split("m");
        let movieData = data[id[1] - 1];
        $(movies[i]).next().append(
            "<p tabindex='0' class='subtitle'>" + movieData.name + "<p class='sinopsis' tabindex='0'><span class='subtitle2'>Sinopsis:</span></br></br>" + movieData.sinopsis + "</p><div class='movieControls'><span class='subtitle2'>Sesión: <select class='hour'><option value='1'>15:00</option><option value='2'>18:00</option><option value='3'>21:00</option></select></span><button tabindex='0'>Comprar</button></div>"
        );
        $(movies[i]).next().find("button").click(function () {
            localStorage.setItem("selectedMovie", selectedMovie = id[1] - 1);
            localStorage.setItem("movieName", movieData.name);
            localStorage.setItem("selectedHour", $(movies[i]).next().find("select").val());
            $(location).attr('href', 'selectSeats.html');
        });
    }
}