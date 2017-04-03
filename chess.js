var canvas;
var ctx;
var spaceOffsetLeft=100;
var spaceOffsetTop=10;
var spaceWidth=35;
var spaceHeight=35;
var columnCount=8;
var rowCount=8;
var numPieces=32;

var pieces=[];

var board=[];
for(i=0; i<columnCount; i++){
	board[i]=[];
	for(j=0; j<rowCount; j++){
		board[i][j]={x:0, y:0, bOcuupied:false, wOccupied:false, spaceName:null};
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
			centerPiece(piece);
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

function centerPiece(piece){
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

function init(){
	canvas=document.getElementById('myCanvas');
	ctx=canvas.getContext('2d');
	drawboard();
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
	this.dragging=false;
	this.color=color;
	this.piece=piece;
	this.square=square;
	this.xCoord=square.x+(spaceWidth/2-8);
	this.yCoord=square.y+(spaceHeight/2-8);
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
}
