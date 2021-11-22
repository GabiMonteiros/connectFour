//console.log("halooo script, halloo Jq:", $)

(function game() {
    var currentPlayer = "playerMoon";
    var board = $("#board")
    var allslots = board.find(".slot");
    var column =$(".column")
    var winner = false;
    var round = 0;
    var playerMoon = 0;
    var playerSun = 0;
    var currentPlayerField = $(".field-player");
    var btnReload = $(".reset");
    var roundFiled = $(".field-counter");
    var playerMoonField = $(".field-playerMoon");
    var playerSunField = $(".field-playerSun");

    //listening to the click in the column
    $(".column").on("click", function (e) {
        var columnElement = $(e.currentTarget);
        var slotsInColumn = columnElement.children();

        //loop to find empty slot from the bottom // i= slotsInColumn.length - 1 = 5
        for (var i = 5; i >= 0; i--) {
            if (!slot.hasClass("playerMoon") &&
                !slot.hasClass("playerSun")
            ) {
                slot.addClass(currentPlayer);
                break;
                //break to stop the loop after find it
            }
        }

        //checking empty slot
        if (!foundEmpty) {
            console.log("no empty slot, try again!");
            return;
        }
        //so it ignores an element  if the hole is already filled
        if (i < 0) {
            return;
        }

        //checking for victory
        function checkForVictory(slots) {
            var count = 0;
            for (var i = 0; i < slots.lenght; i++){
                if (slots.eq(i).hasClass(currentPlayer)) {
                    count++;
                    if (count == 4) {
                        //victory
                        return true;
                    }

                } else {
                    count = 0;
                }
            }
        }

        //the game continues
        switchPlayers();
    });

    //track the current player
    function switchPlayers() {
        if (currentPlayer == "playerMoon") {
            currentPlayer = "playerSun";
        } else {
            currentPlayer = "player";
        }
    }
})();