//console.log("halooo script, halloo Jq:", $)

(function game() {
    var currentPlayer = "Moon";
    var board = $("#board");
    var allSlots = board.find(".slot");
    var column = $(".column");
    var winner = false;
    var round = 0;
    var Moon = 0;
    var Sun = 0;
    var currentPlayerField = $(".field-player");
    var playerMoonField = $(".field-Moon");
    var playerSunField = $(".field-Sun");
    var reload = $(".reset");
    var btnNewGame = $(".btn-newGame");
    var roundFiled = $(".field-counter");
    var winnerMsg = $(".winner-field");
    var animationBox = $(".animation");
    var overlapping = $(".overlapping");

    //listening to the click in the column to run the function
    column.on("click", function (e) {
        //currentTarget sempre se refere ao elemento associado ao event handler, q nesse caso è o click na coluna. slot */
        var slotsInColumn = $(e.currentTarget).children();
        //console.log('slotsInColumn: ', 'slotsInColumn');

        //loop to find empty slot from the bottom // i= slotsInColumn.length - 1 = 5
        for (var i = 5; i >= 0; i--) {
            //eq(i) == equals ao index, igual a  i ,  igual a um dos slots na coluna

            if (
                //se o islotsInColumn nao tem o index igual(equal)preenchido pelo Moon e nao é igual ao Sun
                !slotsInColumn.eq(i).hasClass("Moon") &&
                !slotsInColumn.eq(i).hasClass("Sun")
            ) {
                slotsInColumn.eq(i).addClass(currentPlayer);
                //add a class um deles(moon / sun)  como current player
                break;
                //break to stop the loop after find it
            }
        }

        //checking empty slot on column
        if (i == -1) {
            console.log("no empty slot, try again!");
            return;
        }

        //checking for victory
        if (checkVictory(slotsInColumn)) {
            //some player won in column
            winner = true;
            victoryAnimation();
            return;
        } else {
            var slotsInRow = $(".row" + i);
            //para achar a row q o player ta , usa jquery a partir do loop backwards, com jq passo o index para row ??
            if (checkVictory(slotsInRow)) {
                //player won in column
                winner = true;
                victoryAnimation();
                return;
            } else { //won in diagonal
                checkDiagonalVictory();
            }
        }

        //img for the currentPlayer ???
        if (currentPlayer == "Moon") {
            currentPlayerField.css(
                "background",
                'url("sun.png") no-repeat'
            );
            // backgroundImage: 'url(' + imageUrl + ')'
            //,backgroundRepeat: 'repeat-x'
        } else {
            currentPlayerField.css(
                "background",
                'url("moon.png")repeat-y'
            );

            //$("myObject").css("background", "transparent url('"+imageURL+"') no-repeat right top");
        }
        //the game continues
        switchPlayers();
    });

    function checkVictory(slots) {
        var count = 0;
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                //hasClass atribui a class currentplayer ao elemento
                //count mais 1
                count++;
                if (count == 4) {
                    // winner!!!
                    return true;
                }
            } else {
                count = 0;
            }
        }
    }
 //fazer funcionar DIAGONAL 
    function checkDiagonalVictory() {
        var arrayDiagonal = [
            //24 combinations
            [2, 9, 16, 23],
            [1, 8, 15, 22],
            [8, 15, 22, 29],
            [0, 7, 14, 21],
            [7, 14, 21, 28],
            [14, 21, 28, 35],
            [6, 13, 20, 27],
            [13, 20, 27, 34],
            [20, 27, 34, 41],
            [12, 19, 26, 33],
            [19, 26, 33, 40],
            [18, 25, 32, 39],
            [38, 33, 28, 23],
            [37, 32, 27, 22],
            [32, 27, 22, 17],
            [36, 31, 26, 21],
            [31, 26, 21, 16],
            [26, 21, 16, 11],
            [30, 25, 20, 15],
            [25, 20, 15, 10],
            [20, 15, 10, 5],
            [24, 19, 14, 9],
            [19, 14, 9, 4],
            [18, 13, 8, 3],
        ];
        for (var i = 0; i < arrayDiagonal.length; i++) {
            if (
                //se um dos slots tem o index N igual(equal) a um dos conjutos de numeros da  arrayDiagonal , add a class um deles  como current player
                allSlots.eq(arrayDiagonal[i][0]).hasClass(currentPlayer) &&
                allSlots.eq(arrayDiagonal[i][1]).hasClass(currentPlayer) &&
                allSlots.eq(arrayDiagonal[i][2]).hasClass(currentPlayer) &&
                allSlots.eq(arrayDiagonal[i][3]).hasClass(currentPlayer)
            ) {
                winner = true;
                victoryAnimation();
                return true;
            }
        }
    }

    // tracking current player
    function switchPlayers() {
        if (currentPlayer == "Moon") {
            currentPlayer = "Sun";
        } else {
            currentPlayer = "Moon";
        }
    }

    function victoryAnimation() {
        var message = "<p>" + currentPlayer.toLocaleUpperCase() + " WON!! </p>";
        if (winner) {
            winnerMsg.html(message);
            animationBox.addClass("on");
            overlapping.addClass("on");
        }
        //the score
        if (currentPlayer == "Moon") {
            Moon++;
        } else {
            Sun++;
        }
    }

    //reset the game
    reload.on("click", function () {
        location.reload();
    });

    //button new game
    btnNewGame.on("click", function () {
        round++;
        allSlots.removeClass("Moon");
        allSlots.removeClass("Sun");
        animationBox.removeClass("on");
        overlapping.removeClass("on");
        roundFiled.html("<p> Round " + round + "</p>");
        playerMoonField.html("<p> " + Moon + "</p>");
        playerSunField.html("<p> " + Sun + "</p>");
    })

})();