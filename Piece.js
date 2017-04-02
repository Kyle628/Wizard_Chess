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

    colToNum(col) {
        col = parseInt(col.charCodeAt(0) - 96);
        return col;
    }

    movePawn(square) {
        var col = square.charAt(0);
        var row = square.charAt(1);
        var newSquare = col.concat(row);
        var startCol = colToNum(this.square.charAt(0));
        var startRow = this.square.charAt(1);
        var endCol = colToNum(square.charAt(0));
        var endRow = square.charAt(1);
        if (this.color == "white") {
            if (!this.hasMoved) {
                if (parseInt(endRow) - parseInt(startRow) > 0 && parseInt(endRow) - parseInt(startRow) <=2 &&
                    Math.abs(parseInt(startCol) - parseInt(endCol)) == 0) {
                        this.square = newSquare;
                    } else if (parseInt(endRow) - parseInt(startRow) == 1 &&
                        Math.abs(parseInt(startCol) - parseInt(endCol)) < 2) {
                            this.square = newSquare;
                        } else {
                            console.log("invalid pawn move");
                        }
                    return;
                return;
            } else {
                if (parseInt(endRow) - parseInt(startRow) == 1 &&
                    Math.abs(parseInt(startCol) - parseInt(endCol)) < 2) {
                        this.square = newSquare;
                    } else {
                        console.log("invalid pawn move");
                    }
                return;
            }
        } else { // black pawn
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

var piece = new Piece("black", "pawn", "b7", true);
piece.movePiece("b8");
