class Board {
    // create a chess board with columns a-h and rows 1-8
    constructor() {
        this.squares = {"a": {"1":new Piece("white","rook", "a1"), "2":new Piece("white","pawn", "a2"), "3":null, "4":null, "5":null, "6":null, "7":null, "8":null},
                    "b": {"1":null, "2":null, "3":null, "4":null, "5":null, "6":null, "7":null, "8":null},
                    "c": {"1":null, "2":null, "3":null, "4":null, "5":null, "6":null, "7":null, "8":null},
                    "d": {"1":null, "2":null, "3":null, "4":null, "5":null, "6":null, "7":null, "8":null},
                    "e": {"1":null, "2":null, "3":null, "4":null, "5":null, "6":null, "7":null, "8":null},
                    "f": {"1":null, "2":null, "3":null, "4":null, "5":null, "6":null, "7":null, "8":null},
                    "g": {"1":null, "2":null, "3":null, "4":null, "5":null, "6":null, "7":null, "8":null},
                    "h": {"1":null, "2":null, "3":null, "4":null, "5":null, "6":null, "7":null, "8":null},
                }
    }

    // get the piece that is on any square
    getPiece(square) {
        if (square === null) {
            return null;
        }
        var col = square.charAt(0);
        var row = square.charAt(1);
        return this.squares[col][row];
    }

    // move a piece to a new square
    updateSquare(endSquare, piece) {
        var startingSquare = piece.getSquare();
        var startCol = startingSquare.charAt(0);
        var startRow = startingSquare.charAt(1);
        var endCol = endSquare.charAt(0);
        var endRow = endSquare.charAt(1);
        // move piece to end square
        this.squares[endCol][endRow] = piece;
        // update the old square
        this.squares[startCol][startRow] = null;
        return
    }

    //scan board for pieces that may have moved, and update accordingly
    updateBoard() {
        var currSquare = null;
        var currCol = null;
        var currRow = null;
        for (var col in this.squares) {
            currCol = col;
            for (var row in this.squares[col]) {
                currRow = row;
                currSquare = currCol.concat(currRow);
                // check if space is empty
                if (this.squares[col][row] == null) {
                    continue;
                }
                //has the piece moved?
                else if (this.squares[col][row].getSquare() != currSquare) {
                    // Move the piece
                    this.updateSquare(this.squares[col][row].getSquare(), this.squares[col][row]);
                }
            }
        }
    }
}

var board = new Board();
board.updateSquare("e5", board.squares["a"]["1"]);

board.updateBoard();

console.log(board.squares["e"]["5"]);
