class Piece {
    constructor(color, chessman, square) {
        this.color = color;
        this.chessman = chessman;
        this.square = square;
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

    movePiece(square) {
        var col = square.charAt(0);
        var row = square.charAt(1);
        var newSquare = col.concat(row);
        this.square = newSquare;
        return;
    }


}
