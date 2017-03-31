var canvas;
var ctx;
var spaceOffsetLeft=100;
var spaceOffsetTop=10;
var spaceWidth=35;
var spaceHeight=35;
var columnCount=8;
var rowCount=8;


var grid = [];
for(i=0; i<columnCount; i++){
	grid[i]=[];
	for(j=0; j<rowCount; j++){
		grid[i][j]={x:0, y:0, bOcuupied:false, wOccupied:false};
	}
}

function init(){
	canvas=document.getElementById("myCanvas");
	ctx=canvas.getContext("2d");
	drawGrid();
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

