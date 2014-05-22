var boardsize = 4; //格子尺寸
var InitGridNum = 7; //初始化时出现的格子数
var board = new Array();
var gridwidth = 70; //px
var gridheight = 100; //px
var gridmargin = 5; //px
var boardpadding = 20; //棋盘内边距

var score = 0;
var nextlist = new Array();
var nextcounter = 0;
var maxgrid = 0;
var nextnum = 1;

$(document).ready(function() {
    CreateBackground();
    init();
})

//create grid of background
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
    //Init Next List
    score = 0;
    nextcounter = 0;
    maxgrid = board.max();
    nextlist = createNextList();
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
    updateNextNum();
}

function updateNextNum() {
    nextnum = GetNextNum();
    var nextIcon = $('#nexticon');
    var plusicon = $('#plusicon');
    if (nextnum == 1) {
        nextIcon.css('background', '#6CF');
        nextIcon.css('border-bottom', '3px solid #60aaf1');
        plusicon.css('visibility', 'hidden');
    } else if (nextnum == 2) {
        nextIcon.css('background', '#FF6881');
        nextIcon.css('border-bottom', '3px solid #cc547c');
        plusicon.css('visibility', 'hidden');
    } else {
        nextIcon.css('background', '#FEFFFF');
        nextIcon.css('border-bottom', '3px solid #fc6');
        if (nextnum == 3) {
            plusicon.css('visibility', 'hidden');
        } else {
            plusicon.css('visibility', 'visible');
        }
    }
}

function setgrid(i, j, value) {
    var grid = $('#gridnumber-' + i + "-" + j);
    if (value == 0) return;
    grid.css('width', gridwidth + 'px');
    grid.css('height', gridheight + 'px');
    if (value == 1) {
        grid.css('background', '#6CF');
        grid.css('left', getleft(i, j) + 'px');
        grid.css('top', gettop(i, j) + 'px');
        grid.css('color', '#FFF');
        grid.css('borderRa', '#FFF');
        grid.css('borderBottom', '5px solid #60aaf1');
        grid.text(1);
    } else if (value == 2) {
        grid.css('background', '#FF6881');
        grid.css('left', getleft(i, j) + 'px');
        grid.css('top', gettop(i, j) + 'px');
        grid.css('color', '#FFF');
        grid.css('borderBottom', '5px solid #cc547c');
        grid.text(2);
    } else if (value >= 3) {
        grid.css('background', '#FEFFFF');
        grid.css('left', getleft(i, j) + 'px');
        grid.css('top', gettop(i, j) + 'px');
        grid.css('color', '#000');
        grid.css('borderBottom', '5px solid #fc6');
        grid.text(value);

    }
}