var canvas;
var ctx;
var spaceOffsetLeft=100;
var spaceOffsetTop=10;
var spaceWidth=35;
var spaceHeight=35;
var columnCount=8;
var rowCount=8;

var board = new Board();

function init(){
	canvas=document.getElementById("myCanvas");
	ctx=canvas.getContext("2d");
	drawBoard();
}

function drawGrid(){
	for(i=0; i<columnCount; i++){
		for(j=0; j<rowCount; j++){
			var spaceX = (i*(spaceWidth))+spaceOffsetLeft;
			var spaceY = (j*(spaceHeight))+spaceOffsetTop;

			grid[i][j].x=spaceX;
			grid[i][j].y=spaceY;

			ctx.beginPath();
			ctx.rect(spaceX,spaceY,spaceWidth, spaceHeight);
			if((i+j)%2==0){
				ctx.fillStyle="#000000";
			}
			else{
				ctx.fillStyle="#afd6f7";
			}
			ctx.fill();
			ctx.closePath();
		}
	}
}


function drawBoard(){
	for(var col in board.squares){
		for(var row in board.squares[col]){
			// column 1 becomes 0, etc
			var i = parseInt(row) - 1
			// ascii value for a is 97 so row a becomes 0, b becomes 1, etc
			var j = parseInt(col.charCodeAt(0) - 96) - 1
			var spaceX = (i*(spaceWidth))+spaceOffsetLeft;
			var spaceY = (j*(spaceHeight))+spaceOffsetTop;

			ctx.beginPath();
			ctx.rect(spaceX,spaceY,spaceWidth, spaceHeight);
			if ((i + j) % 2 == 0) {
				ctx.fillStyle="#000000";
			}
			else{
				ctx.fillStyle="#afd6f7";
			}
			ctx.fill();
			ctx.closePath();
		}
	}
}
