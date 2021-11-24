//console.log("halooo script, halloo Jq:", $)

(function game() {
    var currentPlayer = "playerMoon";
    var board = $("#board");
    var allslots = board.find(".slot");
    var column = $(".column");
    var winner = false;
    var round = 0;
    var playerMoon = 0;
    var playerSun = 0;
    var currentPlayerField = $(".field-player");
    var btnReload = $(".reset");
    var roundFiled = $(".field-counter");
    var playerMoonField = $(".field-playerMoon");
    var playerSunField = $(".field-playerSun");

    //listening to the click in the column to run the function
    column.on("click", function (e) {
        //currentTarget sempre se refere ao elemento associado ao event handler, q nesse caso è o click na coluna. slot */
        var slotsInColumn = $(e.currentTarget).children();
        //console.log('slotsInColumn: ', 'slotsInColumn');

        //loop to find empty slot from the bottom // i= slotsInColumn.length - 1 = 5
        for (var i = 5; i >= 0; i--) {
            //eq(i) == equals ao index, igual a  i ,  igual a um dos slots na coluna

            if (
                //se o islotsInColumn nao tem igual ao index preenchido pelo Moon e nao é igual ao Sun
                !slotsInColumn.eq(i).hasClass("playerMoon") &&
                !slotsInColumn.eq(i).hasClass("playerSun")
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
            VictoryAnimation();
            return;
        } else {
            var slotsInRow = $(".row" + i);
            //para achar a row q o player ta , usa jquery a partir do loop backwards, com jq passo o index para row ??
            if (checkVictory(slotsInRow)) {
                //player won in column
                winner = true;
                VictoryAnimation();
                return;
            } //else {
            //     checkDiagonalVictory();
            // }
        }

        //color for the currentPlayer
        if (currentPlayer == "playerMoon") {
            currentPlayerField.css({
                backgroundcolor: "lightblue;",
            });
        } else {
            currentPlayerField.css({
                backgroundcolor: "orange;",
            });
        }
        // //the game continues
        switchPlayers();
    });

    function checkVictory(slots) {
        var count = 0;
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
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

    // tracking urrent player
    function switchPlayers() {
        if (currentPlayer == "playerMoon") {
            currentPlayer = "playerSun";
        } else {
            currentPlayer = "playerMoon";
        }
    }
})();