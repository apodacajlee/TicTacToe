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

}

// controls the flow of the game
class gameController {
    // constructor sets up the game board and the first turn
    constructor () {
        this.board = new gameBoard;
        this.turn = "x"; // x goes first, followed by o

        // bind clickSpace to prevent losing this instance on call
        this.clickSpace = this.clickSpace.bind(this);

        // add event listeners to the spaces
        for (let i = 0; i < 9; i++) {
            this.board.spaces[i].space.addEventListener("click", () => {
                this.clickSpace(i);
            });
        }
    }

    // function to set up the next turn
    nextTurn() {
        // first, change the turn
        if (this.turn == "x") {
            this.turn = "o";
        }
        else if (this.turn == "o") {
            this.turn = "x";
        }

    }

    clickSpace(index) {
        const selection = this.board.spaces[index];

        console.log("space clicked!")
        console.log(selection.space);
        console.log("setting " + this.turn);

        // change the turn if the space is marked successfully
        if (!selection.isFilled) {
            if (this.turn == "x") {
                selection.space.style.backgroundColor = "red";
            }

            else if (this.turn == "o") {
                selection.space.style.backgroundColor = "blue";
            }

            selection.isFilled = true;
            selection.mark = this.turn;

            this.checkWin(); // check to see if this was a winning move before going to the next turn
            this.nextTurn();
        }

        else {
            console.log("space already filled");
        }
    }

    checkWin() {
        const s = this.board.spaces;

        let match = this.turn + this.turn + this.turn; //will equal "xxx" or "ooo"

        // check all rows for matches
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
                alert(this.turn + " wins!");
            }
        }

        // now check the columns
        for (let i = 0; i <= 2; i++) {
            if (s[i].mark + s[i+3].mark + s[i+6].mark == match) {
                alert(this.turn + " wins!");
            }
        }

        // now check the diagonals
        if (s[0].mark + s[4].mark + s[8].mark == match) {
            alert(this.turn + " wins!");
        }

        if (s[6].mark + s[4].mark + s[2].mark == match) {
            alert(this.turn + " wins!");
        }

    }

    
}

// start the game by declaring a new game controller object
let gamecontroller = new gameController();
