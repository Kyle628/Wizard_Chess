var canvas;
var ctx;
var spaceOffsetLeft=100;
var spaceOffsetTop=10;
var spaceWidth=35;
var spaceHeight=35;
var columnCount=8;
var rowCount=8;
var numPieces=32;

var dragging=false;
var dragging07=false;

var pieces=[];

var letters=new Array('a','b','c','d','e','f','g','h');
var numbers=new Array('1','2','3','4','5','6','7','8');

var board=[];
for(i=0; i<columnCount; i++){
	board[i]=[];
	for(j=0; j<rowCount; j++){
		board[i][j]={x:0, y:0, bOcuupied:false, wOccupied:false, spaceName:null};
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
	if(event.clientX-55>pieces[0].x && event.clientx-55<pieces[0].)

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
			pieces[i]=new piece('b','r',board[i][0]);
		}
		else if(i<16){
			pieces[i]=new piece('b','r',board[i-8][1]);
		}
		else if(i<24){
			pieces[i]=new piece('w','r',board[i-16][6]);
		}
		else{
			pieces[i]=new piece('w','r',board[i-24][7]);
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

function piece(color, piece, square){
	this.color=color;
	this.piece=piece;
	this.square=square;
	this.xCoord=square.x+(spaceWidth/2-8);
	this.yCoord=square.y+(spaceHeight/2-8);
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
