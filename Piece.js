function colToNum(col) {
    col = parseInt(col.charCodeAt(0) - 96);
    return col;
}

class Piece {
    constructor(color, chessman, square, hasMoved) {
        this.color = color;
        this.chessman = chessman;
        this.square = square;
        this.hasMoved = hasMoved;
        }

    getColor() {
        return this.color;
    }

    getChessman() {
        return this.chessman;
    }

    getSquare() {
        return this.square;
    }

    // turns a-h to 1-8
    colToNum(col) {
        col = parseInt(col.charCodeAt(0) - 96);
        return col;
    }

    movePawn(square) {
        // remember what the new square is in its string form
        var newSquare = square.charAt(0).concat(square.charAt(1));
        // a-h --> 1-8
        var startCol = colToNum(this.square.charAt(0));
        // 1-8
        var startRow = this.square.charAt(1);
        var endCol = colToNum(square.charAt(0));
        var endRow = square.charAt(1);
        // is the piece white?
        if (this.color == "white") {
            // has the piece moved?
            if (!this.hasMoved) {
                // check if this move is the special two space fisrt move
                if (parseInt(endRow) - parseInt(startRow) > 0 && parseInt(endRow) - parseInt(startRow) <=2 && // not backward or too far
                    Math.abs(parseInt(startCol) - parseInt(endCol)) == 0) { // has to stay on original column
                        this.square = newSquare;
                    } else if (parseInt(endRow) - parseInt(startRow) == 1 && // not double move so make sure only one space forward
                        Math.abs(parseInt(startCol) - parseInt(endCol)) < 2) { // can move left or right one column (gonna have to check if occupied)
                            this.square = newSquare;
                        } else {
                            console.log("invalid pawn move");
                        }
                    return;
                return;
            } else { // pawn has moved before so double move not available
                if (parseInt(endRow) - parseInt(startRow) == 1 &&
                    Math.abs(parseInt(startCol) - parseInt(endCol)) < 2) {
                        this.square = newSquare;
                    } else {
                        console.log("invalid pawn move");
                    }
                return;
            }
        } else { // black pawn do everything again
            if (!this.hasMoved) {
                if (parseInt(startRow) - parseInt(endRow) > 0 && parseInt(startRow) - parseInt(endRow) <=2 &&
                    Math.abs(parseInt(startCol) - parseInt(endCol)) == 0) {
                        this.square = newSquare;
                    } else if (parseInt(startRow) - parseInt(endRow) == 1 &&
                        Math.abs(parseInt(startCol) - parseInt(endCol)) < 2) {
                            this.square = newSquare;
                        } else {
                            console.log("invalid pawn move");
                        }
                    return;
                return;
            } else {
                if (parseInt(startRow) - parseInt(endRow) == 1 &&
                    Math.abs(parseInt(startCol) - parseInt(endCol)) < 2) {
                        this.square = newSquare;
                    } else {
                        console.log("invalid pawn move");
                    }
                return;
            }

        }

    }

    movePiece(square) {
        if (this.chessman == "pawn") {
            this.movePawn(square);
            return;
        }
        var col = square.charAt(0);
        var row = square.charAt(1);
        var newSquare = col.concat(row);
        this.square = newSquare;
        return;
    }


}
