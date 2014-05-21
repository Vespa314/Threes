var boardsize = 4;//格子尺寸
var InitGridNum = 4;//初始化时出现的格子数
var board = new Array();

$(document).ready(function(){
	init();
})

function init()
{
	//Init board
	for (var i = 0; i < boardsize; i++) {
		board[i] = new Array();
		for (var j = 0; j < boardsize; j++) {
			board[i][j] = 0;
		};
	};
	//Random Init Board
	RandomInitBoard();
	//UpdateBoard
	UpdateBoard();
}

function RandomInitBoard()
{
	var posx = 0;
	var posx = 0;
	for (var i = 0; i < InitGridNum; i++) {
		posx = Math.ceil(Math.random()*boardsize)-1;
		posy = Math.ceil(Math.random()*boardsize)-1;
		while(board[posx][posy] != 0)
		{
			posx = Math.ceil(Math.random()*boardsize);
			posy = Math.ceil(Math.random()*boardsize);
		}
		board[posx][posy] = Math.ceil(Math.random()*3);//随机赋予1,2,3
	};
}

function UpdateBoard()
{
	
}