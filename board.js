class Board {
    // create a chess board with columns a-h and rows 1-8
    constructor() {
        this.squares = {"a":
         {"1":new Piece("white","rook", "a1", "false"),
         "2":new Piece("white","pawn", "a2", "false"),
          "3":null,
           "4":null,
            "5":null,
             "6":null,
              "7":new Piece("black","pawn", "a7", "false"),
               "8":new Piece("black","rook", "a8", "false")},
                    "b":
                    {"1":new Piece("white","knight", "b2", "false"),
                     "2":new Piece("white","pawn", "b2", "false"),
                      "3":null,
                       "4":null,
                        "5":null,
                         "6":null,
                          "7":new Piece("black","pawn", "b7", "false"),
                           "8":new Piece("black","knight", "b8", "false")},
                    "c":
                     {"1":new Piece("white","bishop", "c1", "false"),
                     "2":new Piece("white","pawn", "c2", "false"),
                      "3":null,
                       "4":null,
                        "5":null,
                         "6":null,
                          "7":new Piece("black","pawn", "c7", "false"),
                           "8":new Piece("black","bishop", "c8", "false")},
                    "d":
                     {"1":new Piece("white","queen", "d1", "false"),
                     "2":new Piece("white","pawn", "d2", "false"),
                      "3":null,
                       "4":null,
                        "5":null,
                         "6":null,
                       "7":new Piece("black","pawn", "d7", "false"),
                        "8":new Piece("black","queen", "d8", "false")},
                    "e":
                     {"1":new Piece("white","king", "e1", "false"),
                      "2":new Piece("white","pawn", "e2", "false"),
                       "3":null,
                        "4":null,
                         "5":null,
                          "6":null,
                           "7":new Piece("black","pawn", "e7", "false"),
                            "8":new Piece("black","king", "e8", "false")},
                    "f":
                     {"1":new Piece("white","bishop", "f1", "false"),
                      "2":new Piece("white","pawn", "f2", "false"),
                       "3":null,
                        "4":null,
                         "5":null,
                          "6":null,
                           "7":new Piece("black","pawn", "f7", "false"),
                            "8":new Piece("black","bishop", "f8", "false")},
                    "g":
                     {"1":new Piece("white","knight", "g1", "false"),
                      "2":new Piece("white","pawn", "g2", "false"),
                       "3":null,
                        "4":null,
                         "5":null,
                          "6":null,
                           "7":new Piece("black","pawn", "g7", "false"),
                            "8":new Piece("black","knight", "g8", "false")},
                    "h":
                     {"1":new Piece("white","rook", "h1", "false"),
                      "2":new Piece("white","pawn", "h2", "false"),
                       "3":null,
                        "4":null,
                         "5":null,
                          "6":null,
                           "7":new Piece("black","pawn", "h7", "false"),
                            "8":new Piece("black","rook", "h8", "false")},
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
