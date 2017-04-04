var canvas;
var ctx;
var spaceOffsetLeft=100;
var spaceOffsetTop=10;
var spaceWidth=35;
var spaceHeight=35;
var columnCount=8;
var rowCount=8;
var numPieces=32;
var empty = 69;

var dragging=false;
var dragging07=false;

var whiteRook1 = 0;
var whiteRook2 = 7;
var whiteKnight1 = 1;
var whiteKnight2 = 6;
var whiteBishop1 = 2;
var whiteBishop2 = 5;
var whiteQueen = 3;
var whiteKing = 4;

var blackRook1 = 16;
var blackRook2 = 23;
var blackKnight1 = 17;
var blackKnight2 = 22;
var blackBishop1 = 18;
var blackBishop2 = 21;
var blackQueen = 19;
var blackKing = 20;


var pieces=[];

var board=[];

for(i=0; i<columnCount; i++){
	board[i]=[];
	for(j=0; j<rowCount; j++){
		board[i][j]={x:0, y:0, bOccupied:false, wOccupied:false,
		spaceName:i.toString().concat(j.toString()),
		pieceId:empty};
	}
}




function onmousedown(event){

	pieces.forEach(function(piece){
		if(event.clientX-canvas.offsetLeft>piece.xCoord&&event.clientX-canvas.offsetLeft<piece.xCoord+16){
			if(event.clientY-canvas.offsetTop>piece.yCoord&&event.clientY-canvas.offsetTop<piece.yCoord+16){
				piece.dragging=true;
				console.log(piece.dragging);
			}
		}
	})
}

function onmouseup(event){
	pieces.forEach(function(piece){
		if(piece.dragging){
			if(movePiece(piece, centerPiece(piece,false))){
				centerPiece(piece,true);
			}
			else{
				piece.xCoord=piece.square.x+10;
				piece.yCoord=piece.square.y+10;
				drawboard();
				pieces.forEach(function(piece){
					piece.drawPiece();
				})
			}
			piece.dragging=false;
		}
	})
}

function onmousemove(event){
	pieces.forEach(function(piece){
		if(piece.dragging){
			var dX = event.clientX-lastClientX;
			var dY = event.clientY-lastClientY;
			piece.xCoord+=dX;
			piece.yCoord+=dY;
			drawboard();
			pieces.forEach(function(piece){
				piece.drawPiece();
			})
		}
	})
	lastClientX=event.clientX;
	lastClientY=event.clientY;
}

/*
function centerPiece(piece, update){

	if(update){
		for(i=0; i<columnCount; i++){
			for(j=0; j<rowCount; j++){
				if(piece.xCoord+8>board[i][j].x && piece.xCoord+8<board[i][j].x+spaceWidth){
					if(piece.yCoord+8>board[i][j].y && piece.yCoord+8<board[i][j].y+spaceHeight){
						piece.xCoord=board[i][j].x+10;
						piece.yCoord=board[i][j].y+10;
					}

				}
			}
		}
		drawboard();
		pieces.forEach(function(piece){
			piece.drawPiece();
		})
	}
}
*/

function centerPiece(piece, update){

	var space;
	for(i=0; i<columnCount; i++){
		for(j=0; j<rowCount; j++){
			if(piece.xCoord+8>board[i][j].x && piece.xCoord+8<board[i][j].x+spaceWidth){
				if(piece.yCoord+8>board[i][j].y && piece.yCoord+8<board[i][j].y+spaceHeight){
					space = board[i][j];
				}
			}
		}
	}
	if(update){
		piece.xCoord=space.x+10;
		piece.yCoord=space.y+10;

		drawboard();
		pieces.forEach(function(piece){
			piece.drawPiece();
		})
	}
	return space;
}

function init(){
	canvas=document.getElementById('myCanvas');
	ctx=canvas.getContext('2d');
	drawboard();
	canvas.onmousedown=onmousedown;
	canvas.onmouseup=onmouseup;
	canvas.onmousemove=onmousemove;


	pieces=[
		new piece('w','r',board[0][0], 0),
		new piece('w','kn',board[1][0], 1),
		new piece('w','b',board[2][0], 2),
		new piece('w','q',board[3][0], 3),
		new piece('w','k',board[4][0], 4),
		new piece('w','b',board[5][0], 5),
		new piece('w','kn',board[6][0], 6),
		new piece('w','r',board[7][0], 7),
		new piece('w','p',board[0][1], 8),
		new piece('w','p',board[1][1], 9),
		new piece('w','p',board[2][1], 10),
		new piece('w','p',board[3][1], 11),
		new piece('w','p',board[4][1], 12),
		new piece('w','p',board[5][1], 13),
		new piece('w','p',board[6][1], 14),
		new piece('w','p',board[7][1], 15),
		new piece('b','r',board[0][7], 16),
		new piece('b','kn',board[1][7], 17),
		new piece('b','b',board[2][7], 18),
		new piece('b','q',board[3][7], 19),
		new piece('b','k',board[4][7], 20),
		new piece('b','b',board[5][7], 21),
		new piece('b','kn',board[6][7], 22),
		new piece('b','r',board[7][7], 23),
		new piece('b','p',board[0][6], 24),
		new piece('b','p',board[1][6], 25),
		new piece('b','p',board[2][6], 26),
		new piece('b','p',board[3][6], 27),
		new piece('b','p',board[4][6], 28),
		new piece('b','p',board[5][6], 29),
		new piece('b','p',board[6][6], 30),
		new piece('b','p',board[7][6], 31)
	];



	for (var i=0; i < 32; i++) {
		var col = parseInt(pieces[i].square.spaceName[0]);
		var row = parseInt(pieces[i].square.spaceName[1]);
		board[col][row].pieceId = pieces[i].pieceId;
		if (pieces[i].color == 'w') {
			board[col][row].wOccupied = true;
		} else { // piece is black
			board[col][row].bOccupied = true;
		}
		pieces[i].drawPiece();
	}



	drawboard();
	for (var i=0; i < 32; i++) {
		pieces[i].drawPiece();
	}

	movePiece(pieces[8], board[0][2]);


	/*for(i=0; i<numPieces; i++){
=======
	for(i=0; i<numPieces; i++){
>>>>>>> origin/Luke_Branch
		if(i<8){
			pieces[i]=new piece('b','r',board[i][0], i);
		}
		else if(i<16){
			pieces[i]=new piece('b','r',board[i-8][1], i);
		}
		else if(i<24){
			pieces[i]=new piece('w','r',board[i-16][6], i);
		}
		else{
			pieces[i]=new piece('w','r',board[i-24][7], i);
		}
		pieces[i].drawPiece();
	}*/

}

function drawboard(){
	for(i=0; i<columnCount; i++){
		for(j=0; j<rowCount; j++){
			var spaceX = (i*(spaceWidth))+spaceOffsetLeft;
			var spaceY = (j*(spaceHeight))+spaceOffsetTop;

			board[i][j].x=spaceX;
			board[i][j].y=spaceY;


			ctx.beginPath();
			ctx.rect(spaceX,spaceY,spaceWidth, spaceHeight);
			if((i+j)%2==0){
				ctx.fillStyle='#000000';
			}
			else{
				ctx.fillStyle='#afd6f7';
			}
			ctx.fill();
			ctx.closePath();
		}
	}
	return;
}


function piece(color, piece, square, pieceId){
	this.dragging=false;
	this.color=color;
	this.piece=piece;
	this.square=square;
	this.hasMoved=false;
	this.pieceId = pieceId;
	this.captured = false;
	this.xCoord=square.x+(spaceWidth/2-8);
	this.yCoord=square.y+(spaceHeight/2-8);
		this.drawPiece = function(){
			if (!this.captured) {
				ctx.beginPath();

				ctx.rect(this.xCoord,this.yCoord,16,16);
				if (this.color == 'w') {
					ctx.fillStyle="#ffffff";
				} else {
					ctx.fillStyle="#b00b33";
				}

				ctx.fill();


				/*
				ctx.fillStyle = 'rgba(0,0,0,1)';
				ctx.strokeStyle = "#F00";
				ctx.font = "bold 15pt Arial";
				ctx.globalCompositeOperation = 'destination-out';
				ctx.fillText('R', this.xCoord, this.yCoord);
				*/
				ctx.closePath();
			}
		}
}

// takes a piece object, and a square id as a string, returns true if move was made
function movePiece(pieceToMove, endSquare) {
	var pieceType = pieceToMove.piece;
	var wasMoveMade = false;
	if (pieceType == "p") {
		wasMoveMade = movePawn(pieceToMove, endSquare);
		return wasMoveMade;
	} else {
		//some other piece type
		return false;
	}

}

function movePawn(pieceToMove, endSquare) {
	startCol = parseInt(pieceToMove.square.spaceName[0]);
	startRow = parseInt(pieceToMove.square.spaceName[1]);
	endCol = parseInt(endSquare.spaceName[0]);
	endRow = parseInt(endSquare.spaceName[1]);
	var wasMoveMade = false;
	var isDoubleMove = checkIfDoubleMove(pieceToMove, endSquare)
	var isSingleMove = checkIfSingleMove(pieceToMove, endSquare);
	var isCapture = checkIfPawnCapture(pieceToMove, endSquare);
	if (isDoubleMove) {
		console.log("double");
		wasMoveMade = makeDoubleMove(pieceToMove, endSquare);
		return wasMoveMade;
	} else if (isSingleMove) {
		console.log("single");
		wasMoveMade = makeSingleMove(pieceToMove, endSquare);
		return wasMoveMade;
	} else if (isCapture) {
		var isCaptureLegal = checkIfLegalPawnCapture(pieceToMove, endSquare);
		if (isCaptureLegal) { //make capture
			console.log("legal capture");
			capturedPiece = pieces[board[endCol][endRow].pieceId];
			capturedPiece.captured = true;
			pieceToMove.square = board[endCol][endRow];
			board[endCol][endRow].pieceId = pieceToMove.pieceId;
			board[startCol][startRow].pieceId = empty;
			board[startCol][startRow].wOccupied = false;
			board[startCol][startRow].bOccupied = false;
			if (pieceToMove.color == 'w') {
				board[endCol][endRow].wOccupied = true;
				board[endCol][endRow].bOccupied = false;
			} else {
				board[endCol][endRow].bOccupied = true;
				board[endCol][endRow].wOccupied = false;
			}
			return true; // move and capture was made


		} else {
			return false; // move was not made
		}
	}
	else {
		// this cannot be a pawn move by process of elimination
		return false;
	}
}


function checkIfLegalPawnCapture(pieceToMove, endSquare) {
	console.log("checking if legal capture");
	startCol = parseInt(pieceToMove.square.spaceName[0]);
	startRow = parseInt(pieceToMove.square.spaceName[1]);
	endCol = parseInt(endSquare.spaceName[0]);
	endRow = parseInt(endSquare.spaceName[1]);
	if (pieceToMove.color == 'w') {
		if (Math.abs(endCol - startCol) == 1) { // capture is one column over
			if (endRow - startRow == 1) { // move is one space forward, diagonal, legal capture!!
				return true;
			}

		}
	} else { // black pawn making the capture
		if (Math.abs(endCol - startCol) == 1) { // capture is one column over
			if (startRow - endRow == 1) { // move is one space forward, diagonal, legal capture!!
				return true;
			}
		}
	}
	return false;

}
function checkIfPawnCapture(pieceToMove, endSquare) {
	console.log("checking if pawn capture");
	startCol = parseInt(pieceToMove.square.spaceName[0]);
	startRow = parseInt(pieceToMove.square.spaceName[1]);
	endCol = parseInt(endSquare.spaceName[0]);
	endRow = parseInt(endSquare.spaceName[1]);

	if (pieceToMove.color == 'w') {
		if (board[endCol][endRow].bOccupied) {
			return true;
		}
	} else { // black pawn
		console.log("black piece");
		if (board[endCol][endRow].wOccupied) {
			return true;
		}
	}

	return false;

}

function makeSingleMove(pieceToMove, endSquare) {
	startCol = parseInt(pieceToMove.square.spaceName[0]);
	startRow = parseInt(pieceToMove.square.spaceName[1]);
	endCol = parseInt(endSquare.spaceName[0]);
	endRow = parseInt(endSquare.spaceName[1]);
	if (pieceToMove.color == "w") {
		// check for obstruction
		if (board[endCol][endRow].wOccupied || board[endCol][endRow].bOccupied) {
			return false;
		} else { // unoccupied, legal move
			pieceToMove.square = board[endCol][endRow];
			board[endCol][endRow].wOccupied = true;
			board[endCol][endRow].pieceId = pieceToMove.pieceId;
			board[startCol][startRow].pieceId = empty;
			return true; // move was made successfully
		}
	} else { // black pawn
		// check for obstruction
		if (board[endCol][endRow].wOccupied || board[endCol][endRow].bOccupied) {
			return false;
		} else { // unoccupied, legal move
			pieceToMove.square = board[endCol][endRow];
			board[endCol][endRow].bOccupied = true;
			board[endCol][endRow].pieceId = pieceToMove.pieceId;
			board[startCol][startRow].pieceId = empty;
			return true; // move was made successfully
		}
	}
}

// takes piece object, and square id. Mutates piece object to make move.
// returns true if move was made
function makeDoubleMove(pieceToMove, endSquare) {
	endCol = parseInt(endSquare.spaceName[0]);
	endRow = parseInt(endSquare.spaceName[1]);
	if (!pieceToMove.hasMoved) { // piece has not moved
		var isObstructed = isPawnDoubleMoveObstructed(pieceToMove, endSquare);
		if (!isObstructed) {
			pieceToMove.square = board[endCol][endRow];
			if (pieceToMove.color == "w") {
				board[endCol][endRow].wOccupied = true;
				board[endCol][endRow].pieceId = pieceToMove.pieceId;
				board[startCol][startRow].pieceId = empty;
				return true; // move was made successfully
			} else { // piece was black
				board[endCol][endRow].bOccupied = true;
				board[endCol][endRow].pieceId = pieceToMove.pieceId;
				board[startCol][startRow].pieceId = empty;
				return true; // move was made successfully
			}
		} else { // can't make move if there are pieces in the way
			return false;
		}
	} else { // can't make double move if pawn has previously moved
		return false;
	}

}




function isPawnDoubleMoveObstructed(pieceToMove, endSquare) {
	startCol = parseInt(pieceToMove.square.spaceName[0]);
	startRow = parseInt(pieceToMove.square.spaceName[1]);
	endCol = parseInt(endSquare.spaceName[0]);
	endRow = parseInt(endSquare.spaceName[1]);
	if (pieceToMove.color == 'w') {
		var isObstructed = false;
		for (var i = startCol; i <= endCol; i++) {
			if (board[i][endRow].wOccupied || board[i][endRow].bOccupied) {
				isObstructed = true;
			}
		}
		return isObstructed;

	} else { // pawn is black
		var isObstructed = false;
		for (var i = startCol; i >= endCol; i--) {
			if (board[i][endRow].wOccupied || board[i][endRow].bOccupied) {
				isObstructed = true;
			}
		}
		return isObstructed;
	}
}

function checkIfDoubleMove(pieceToMove, endSquare) {
	startCol = parseInt(pieceToMove.square.spaceName[0]);
	startRow = parseInt(pieceToMove.square.spaceName[1]);
	endCol = parseInt(endSquare.spaceName[0]);
	endRow = parseInt(endSquare.spaceName[1]);
	if (pieceToMove.color == 'w') {
		if (endRow - startRow == 2) { // moves two squares forward
			if (endCol == startCol) { // stays in original column
				return true;
			}
		}
	} else if (pieceToMove.color == 'b') {
		if (startRow - endRow == 2) { // moves two squares forward
			if (startCol== endCol) { // stays in original column
				return true;
			}
		}
	} else {
		return false;
	}
	return false;
}

function checkIfSingleMove(pieceToMove, endSquare) {
	startCol = parseInt(pieceToMove.square.spaceName[0]);
	startRow = parseInt(pieceToMove.square.spaceName[1]);
	endCol = parseInt(endSquare.spaceName[0]);
	endRow = parseInt(endSquare.spaceName[1]);
	if (pieceToMove.color == 'w') {
		if (endRow - startRow == 1) { // moves one square forward
			if (endCol == startCol) { // stays in original column
				return true;
			}
		}
	} else if (pieceToMove.color == 'b') {
		if (startRow - endRow == 1) { // moves one square forward
			if (startCol == endCol) { // stays in original column
				return true;
			}
		}
	} else {
		return false;
	}
	return false;
}
/*
function drawPieces(pieces){
	for(i=0;i<8;i++){
		for(j=0;j<2;j++){
			ctx.beginPath();
			ctx.arc((i*spaceWidth)+spaceOffsetLeft+(spaceWidth/2),(j*spaceHeight)+spaceOffsetTop+(spaceHeight/2),15,0,2*Math.PI,false);
			ctx.fillStyle='#ffffff';
			ctx.fill();
			ctx.closePath();
		}
	}

}
*/
	this.drawPiece=function(){
		ctx.beginPath();

		ctx.rect(this.xCoord,this.yCoord,16,16);
		ctx.fillStyle="#ffffff";
		ctx.fill();

		/*
		ctx.fillStyle = 'rgba(0,0,0,1)';
		ctx.strokeStyle = "#F00";
		ctx.font = "bold 15pt Arial";
		ctx.globalCompositeOperation = 'destination-out';
		ctx.fillText('R', this.xCoord, this.yCoord);
		*/
		ctx.closePath();
	}
