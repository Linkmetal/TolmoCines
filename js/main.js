let movies;
let data = [];
let moved = false;
let moving = false;
let selectedMovie;

function load() {
    $.getJSON("json/moviesData.json", function (json) {
        movies = $(".movie");
        data = json;
        for (let i = 0; i < data.length; i++) {
            movies[i].style.backgroundImage = "url('/img/" + data[i].image + "')";
            $(movies[i]).find("a").text(data[i].name);
            $(movies[i]).find("a").attr("aria-label", data[i].name)
        }
        showInfo();
    });
}

$(document).ready(function () {
    load();
    $("#submitForm").click(function (e) {
        e.preventDefault();
        submitForm();
        return false;
    });
    $("#cancelForm").click(function () {
        $("#formDiv").hide();
    });
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
            "<p tabindex='0' class='subtitle'>" + movieData.name + "<p class='sinopsis' tabindex='0'><span class='subtitle2'>Sinopsis:</span></br></br>" + movieData.sinopsis + "</p><button tabindex='0'> Comprar entradas</button>"
        );
        if (window.innerWidth > 1023) {
            $(movies[i]).next().find("button").position({
                my: "center center",
                at: "center-5% bottom-12%",
                of: $(movies[i]).next(),
            });
        }
        $(movies[i]).next().find("button").click(function () {
            selectedMovie = id[1] - 1;
            $(location).attr('href', 'selectSeats.html');
        });
    }
}

function submitForm() {
    let votes_ = [];
    if (localStorage.getItem("votes") == null) {
        votes_ = [];
    } else {
        votes_ = JSON.parse(localStorage.getItem("votes"));
    }
    let vote = {
        name: $("#nameInput").val(),
        email: $("#emailInput").val(),
        movie: data[selectedMovie].name
    };
    votes_.push(vote);
    localStorage.setItem("votes", JSON.stringify(votes_));
    $(location).attr('href', 'results.html');
}