//console.log("halooo script, halloo Jq:", $)

(function () {
    var currentPlayer = "playerMoon";

    //listening to the click in the column
    $(".column").on("click", function (e) {
        var columnElement = $(e.currentTarget);
        var slotsInColumn = columnElement.children();

        //loop to find empty slot from the bottom // i= slotsInColumn.length - 1 = 5
        for (var i = 5; i >= 0; i--) {
            if (!slot.hasClass("playerMoon") && !slot.hasClass("playerSun")) {
                slot.addClass(currentPlayer);
                break;
                //break to stop the loop after find it
            }
        }
    });

    //track the current player
    function switchPlayer() {
        if (currentPlayer == "playerMoon") {
            currentPlayer = "playerSun";
        } else {
            currentPlayer = "player";
        }
    }
})();