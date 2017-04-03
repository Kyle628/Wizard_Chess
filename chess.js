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

var pieces=[];

var letters=new Array('a','b','c','d','e','f','g','h');
var numbers=new Array('1','2','3','4','5','6','7','8');

var board=[];
for(i=0; i<columnCount; i++){
	board[i]=[];
	for(j=0; j<rowCount; j++){
		board[i][j]={x:0, y:0, bOcuupied:false, wOccupied:false,
		spaceName:parseInt(i.toString().concat(j.toString())),
		pieceId:empty};
	}
}

function onmousedown(event){
	dragging=true;
	console.log(dragging);
	if(event.clientX-55>0+spaceOffsetLeft&&event.clientX-55<spaceWidth+spaceOffsetLeft){
		if(event.clientY-10>7*spaceHeight+spaceOffsetTop&&event.clientY-10<8*spaceHeight+spaceOffsetTop){
			dragging07=true;
		}
	}

}

function onmouseup(event){
	dragging=false;
}

function onmousemove(event){
	if(dragging){
		if(dragging07){
			var dX = event.clientX-lastClientX;
			var dY = event.clientY-lastClientY;
			rook1.xCoord+=dX;
			rook1.yCoord+=dY;
			drawboard();

			//should use 'foreach'
			for(i=0; i<numPieces; i++){
				pieces[i].drawPiece();
			}
		}
	}

	lastClientX = event.clientX;
	lastClientY = event.clientY;
}

function init(){
	canvas=document.getElementById('myCanvas');
	ctx=canvas.getContext('2d');
	drawboard();
	//drawPieces();
	canvas.onmousedown=onmousedown;
	canvas.onmouseup=onmouseup;
	canvas.onmousemove=onmousemove;




	for(i=0; i<numPieces; i++){
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
	}
}

function drawboard(){
	for(i=0; i<columnCount; i++){
		for(j=0; j<rowCount; j++){
			var spaceX = (i*(spaceWidth))+spaceOffsetLeft;
			var spaceY = (j*(spaceHeight))+spaceOffsetTop;

			board[i][j].x=spaceX;
			board[i][j].y=spaceY;
			board[i][j].spaceName=letters[i]+numbers[j];

			//console.log(board[i][j].spaceName);



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
}

function piece(color, piece, square, pieceId){
	this.color=color;
	this.piece=piece;
	this.square=square;
	this.hasMoved=false;
	this.pieceId = pieceId;
	this.captured = false;
	this.xCoord=square.x+(spaceWidth/2-8);
	this.yCoord=square.y+(spaceHeight/2-8);
	if (!this.captured) {
		this.drawPiece = function(){
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
	}
}

// takes a piece object, and a two digit integer square id, returns true if move was made
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
	var wasMoveMade = false;
	var isDoubleMove = checkIfDoubleMove(pieceToMove, endSquare)
	var isSingleMove = checkIfSingleMove(pieceToMove, endSquare);
	var isCapture = checkIfPawnCapture(pieceToMove, endSquare);
	if (isDoubleMove) {
		wasMoveMade = makeDoubleMove(pieceToMove, endSquare);
		return wasMoveMade;
	} else if (isSingleMove) {
		wasMoveMade = makeSingleMove(pieceToMove, endSquare);
		return wasMoveMade;
	} else if (isCapture) {
		var isCaptureLegal = checkIfLegalPawnCapture(pieceToMove, endSquare);
		if (isCaptureLegal) { //make capture
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
	startCol = parseInt(pieceToMove.square.spaceName.toString()[0]);
	startRow = parseInt(pieceToMove.square.spaceName.toString()[1]);
	endCol = parseInt(endSquare.spaceName.toString()[0]);
	endRow = parseInt(endSquare.spaceName.toString()[1]);
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
	startCol = parseInt(pieceToMove.square.spaceName.toString()[0]);
	startRow = parseInt(pieceToMove.square.spaceName.toString()[1]);
	endCol = parseInt(endSquare.spaceName.toString()[0]);
	endRow = parseInt(endSquare.spaceName.toString()[1]);

	if (pieceToMove.color == 'w') {
		if (board[endCol][endRow] == 'bOccupied') {
			return true;
		}
	} else { // black pawn
		if (board[endCol][endRow] == 'wOccupied') {
			return true;
		}
	}

	return false;

}

function makeSingleMove(pieceToMove, endSquare) {
	endCol = parseInt(endSquare.spaceName.toString()[0]);
	endRow = parseInt(endSquare.spaceName.toString()[1]);
	if (pieceToMove.color == "w") {
		// check for obstruction
		if (board[endCol][endRow+1].wOccupied || board[endCol][endRow+1].bOccupied) {
			return false;
		} else { // unoccupied, legal move
			pieceToMove.square = board[endCol][endRow];
			board[endCol][endRow].wOccupied = true;
			return true; // move was made successfully
		}
	} else { // black pawn
		// check for obstruction
		if (board[endCol][endRow+1].wOccupied || board[endCol][endRow+1].bOccupied) {
			return false;
		} else { // unoccupied, legal move
			pieceToMove.square = board[endCol][endRow];
			board[endCol][endRow].bOccupied = true;
			return true; // move was made successfully
		}
	}
}

// takes piece object, and square id. Mutates piece object to make move.
// returns true if move was made
function makeDoubleMove(pieceToMove, endSquare) {
	endCol = parseInt(endSquare.spaceName.toString()[0]);
	endRow = parseInt(endSquare.spaceName.toString()[1]);
	if (!pieceToMove.hasMoved) { // piece has not moved
		var isObstructed = isPawnDoubleMoveObstructed(pieceToMove, endSquare);
		if (!isObstructed) {
			pieceToMove.square = board[endCol][endRow];
			if (pieceToMove.color = "w") {
				board[endCol][endRow].wOccupied = true;
				return true; // move was made successfully
			} else { // piece was black
				board[endCol][endRow].bOccupied = true;
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
	startCol = parseInt(pieceToMove.square.spaceName.toString()[0]);
	startRow = parseInt(pieceToMove.square.spaceName.toString()[1]);
	endCol = parseInt(endSquare.spaceName.toString()[0]);
	endRow = parseInt(endSquare.spaceName.toString()[1]);
	if (pieceToMove.color = 'w') {
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
	startCol = parseInt(pieceToMove.square.spaceName.toString()[0]);
	startRow = parseInt(pieceToMove.square.spaceName.toString()[1]);
	endCol = parseInt(endSquare.spaceName.toString()[0]);
	endRow = parseInt(endSquare.spaceName.toString()[1]);
	if (pieceToMove.color == 'w') {
		if (endRow - startRow == 2) { // moves two squares forward
			if (endRow == startRow) { // stays in original column
				return true;
			}
		}
	} else if (pieceToMove.color == 'b') {
		if (startRow - endRow == 2) { // moves two squares forward
			if (startRow == endRow) { // stays in original column
				return true;
			}
		}
	} else {
		return false;
	}
}

function checkIfSingleMove(pieceToMove, endSquare) {
	startCol = parseInt(pieceToMove.square.spaceName.toString()[0]);
	startRow = parseInt(pieceToMove.square.spaceName.toString()[1]);
	endCol = parseInt(endSquare.spaceName.toString()[0]);
	endRow = parseInt(endSquare.spaceName.toString()[1]);
	if (pieceToMove.color == 'w') {
		if (endRow - startRow == 1) { // moves two squares forward
			if (endRow == startRow) { // stays in original column
				return true;
			}
		}
	} else if (pieceToMove.color == 'b') {
		if (startRow - endRow == 1) { // moves two squares forward
			if (startRow == endRow) { // stays in original column
				return true;
			}
		}
	} else {
		return false;
	}
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
