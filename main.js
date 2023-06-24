// class for each individual space on the game board
class Space {
    constructor (element) {
        this.space = element; // save the selected space to this object
        this.isFilled = false; // variable to check if the space has an X or O placed in it
        this.mark = ""; //initialize mark
    }
}

// class controlling the game board
class gameBoard {
    constructor () {
        this.spaces = []; // set up gameboard as an array of spaces

        console.log("setting up board...");

        const gridItems = document.getElementsByClassName("grid-item");
        for(let i = 0; i < gridItems.length; i++) {
            this.spaces.push(new Space(gridItems[i]));
        }

        console.log("board initialized");
        console.log(this.spaces.length);
    }

}

// class controlling the page's display
class displayController{
    markSpace (s, mark) {
        if (mark == "x") {
            s.space.style.backgroundColor = "red";
        }

        else if (mark == "o") {
            s.space.style.backgroundColor = "blue";
        }

        s.space.textContent = mark.toUpperCase();
    }

    // changes the color of 3 winning spaces
    markWin (s1, s2, s3) {
        s1.space.style.backgroundColor = "green";
        s2.space.style.backgroundColor = "green";
        s3.space.style.backgroundColor = "green";
    }

    // changes the message below the grid to show the turn
    turnMessage (currentTurn) {
        console.log("changing the turn message");
        const message = document.getElementById("statusMessage");
        message.textContent = currentTurn.toUpperCase() + "'s turn!";
    }

    winMessage (winner) {
        const message = document.getElementById("statusMessage");
        message.textContent = winner.toUpperCase() + " wins!";
        this.addRestartButton();
    }

    tieMessage () {
        const message = document.getElementById("statusMessage");
        message.textContent = "It's a tie!";
        this.addRestartButton();
    }

    addRestartButton () {
        // create the restart button & add event listener
        let restartButton = document.createElement("button");
        restartButton.textContent = "Play Again";
        restartButton.addEventListener("click", () => {
            document.location.reload();
        });

        // add it to the bottom of the page
        //const selection = document.getElementById("message-container");
        document.body.appendChild(restartButton);
    }
}

// controls the flow of the game
class gameController {
    // constructor sets up the game board and the first turn
    constructor () {
        this.board = new gameBoard;
        this.display = new displayController;
        this.turn = "x"; // x goes first, followed by o
        this.winFlag = false; // flag to check if the game is over
        this.turnCount = 1; // count the turns

        // bind clickSpace to prevent losing this instance on call
        this.clickSpace = this.clickSpace.bind(this);

        // add event listeners to the spaces
        for (let i = 0; i < 9; i++) {
            this.board.spaces[i].space.addEventListener("click", () => {
                this.clickSpace(i);
            });
        }

        // set the message below the grid to say "X's turn!";
        this.display.turnMessage(this.turn);
    }

    // function to set up the next turn, swaps x to o, or o to x
    nextTurn() {
        if (this.turn == "x") {
            this.turn = "o";
        }
        else if (this.turn == "o") {
            this.turn = "x";
        }
        this.turnCount++;

        // change the message below the grid
        if(this.turnCount < 10) {
            this.display.turnMessage(this.turn);
        }

        else {
            this.display.tieMessage();
        }

    }

    clickSpace(index) {
        const selection = this.board.spaces[index];

        console.log("space clicked!")
        console.log(selection.space);
        console.log("setting " + this.turn);

        // change the turn if the space is marked successfully
        if (!selection.isFilled && !this.winFlag) {
            this.display.markSpace(selection, this.turn); // mark the space

            selection.isFilled = true;
            selection.mark = this.turn;

            this.checkWin(); // check to see if this was a winning move before going to the next turn

            // change the turn if the game isn't won yet
            if(!this.winFlag){
                this.nextTurn();
            }

        }

        else if (selection.isFilled) {
            console.log("space already filled");
        }

        else if (this.winFlag) {
            console.log("the game's over!");
        }
    }

    checkWin() {
        const s = this.board.spaces;

        let match = this.turn + this.turn + this.turn; //will equal "xxx" or "ooo"

        // check all rows, columns, and diagonals for matches
        // spaces are indexed like so:
        /*
            0 1 2
            3 4 5
            6 7 8
        */
        // so the for loop will loop to 0, 3, and 6 as starting points
        for (let i = 0; i <= 6; i += 3) {
            // win detected if "xxx" == "xxx" or "ooo" == "ooo"
            if (s[i].mark + s[i+1].mark + s[i+2].mark == match) {
                this.display.markWin(s[i], s[i+1], s[i+2]);
                this.winFlag = true;
            }
        }

        // now check the columns
        for (let i = 0; i <= 2; i++) {
            if (s[i].mark + s[i+3].mark + s[i+6].mark == match) {
                this.display.markWin(s[i], s[i+3], s[i+6]);
                this.winFlag = true;
            }
        }

        // now check the diagonals
        if (s[0].mark + s[4].mark + s[8].mark == match) {
            this.display.markWin(s[0], s[4], s[8]);
            this.winFlag = true;
        }

        if (s[6].mark + s[4].mark + s[2].mark == match) {
            this.display.markWin(s[6], s[4], s[2]);
            this.winFlag = true;
        }

        // end the game if a win was found
        if (this.winFlag) {
            this.display.winMessage(this.turn);
        }
    }

    
}

// start the game by declaring a new game controller object
let gamecontroller = new gameController();
