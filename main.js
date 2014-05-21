var boardsize = 5; //格子尺寸
var InitGridNum = 4; //初始化时出现的格子数
var board = new Array();
var gridwidth = 70; //px
var gridheight = 100; //px
var gridmargin = 5; //px
var boardpadding = 20; //棋盘内边距

$(document).ready(function() {
    CreateBackground();
    init();
})

function CreateBackground() {
    $('.grid').remove();
    for (var i = 0; i < boardsize; i++) {
        for (var j = 0; j < boardsize; j++) {
            $('#container').append('<div class="grid" id="grid' + i + '' + j + '">');
        };
    };
}

function init() {
    //Init board
    for (var i = 0; i < boardsize; i++) {
        board[i] = new Array();
        for (var j = 0; j < boardsize; j++) {
            board[i][j] = 0;
        };
    };
    //Init grid background
    MakeBoard();
    //Random Init Board
    RandomInitBoard();
    //UpdateBoard
    UpdateBoard();
}

function MakeBoard() {
    $('.grid').css('width', gridwidth + 'px');
    $('.grid').css('height', gridheight + 'px');
    $('#container').css('width', boardsize * (gridwidth + 2 * gridmargin) + 'px');
    $('#container').css('height', boardsize * (gridheight + 2 * gridmargin) + 'px');
    $('#container').css('padding', boardpadding + 'px');

    for (var i = 0; i < boardsize; i++) {
        for (var j = 0; j < boardsize; j++) {
            $('#grid' + i + '' + j).css('left', getleft(i, j) + 'px');
            $('#grid' + i + '' + j).css('top', gettop(i, j) + 'px');
        };
    };
}

function RandomInitBoard() {
    var posx = 0;
    var posx = 0;
    for (var i = 0; i < InitGridNum; i++) {
        posx = Math.ceil(Math.random() * boardsize) - 1;
        posy = Math.ceil(Math.random() * boardsize) - 1;
        while (board[posx][posy] != 0) {
            posx = Math.ceil(Math.random() * boardsize) - 1;
            posy = Math.ceil(Math.random() * boardsize) - 1;
        }
        board[posx][posy] = Math.ceil(Math.random() * 3); //随机赋予1,2,3
    };
}

function UpdateBoard() {
    //create gridnum
    $('.gridnum').remove();
    for (var i = 0; i < boardsize; i++) {
        for (var j = 0; j < boardsize; j++) {
            $('#container').append('<div class="gridnum" id="gridnumber-' + i + '-' + j + '">');
        };
    };
    for (var i = 0; i < boardsize; i++) {
        for (var j = 0; j < boardsize; j++) {
            setgrid(i, j, board[i][j]);
        }
    }
}