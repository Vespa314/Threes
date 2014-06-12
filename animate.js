animate_span = 200; //ms

function IsAnimate() {
    for (var i = 0; i < boardsize; i++) {
        for (var j = 0; j < boardsize; j++) {
            if ($('#gridnumber-' + i + '-' + j).is(":animated"))
                return 1;
        }
    }
    if ($('#gameover').is(":animated"))
        return 1;
    return 0;
}

function upDownAnimate(i, j, dir) {
    $('#gridnumber-' + i + '-' + j).animate({
        top: gettop(i + dir, j) + 'px'
    }, animate_span);
}

function leftRightAnimate(i, j, dir) {
    $('#gridnumber-' + i + '-' + j).animate({
        left: getleft(i, j + dir) + 'px'
    }, animate_span);
}

function nextAnimateLeft(i, j) {
    $('#gridnumber-n-n').animate({
        left: getleft(i, j) + 'px'
    }, animate_span);
}

function nextAnimateUp(i, j) {
    $('#gridnumber-n-n').animate({
        top: gettop(i, j) + 'px'
    }, animate_span);
}

function ShowGameOver() {
    $('#gameover').css('visibility', 'visible');
    $('#gameover').animate({
        fontSize: '30px'
    }, 1500);
}

function moveleftgrid() {
    var boardtemp = new  Array();
    for (var i = 0; i < boardsize; i++) {
        boardtemp[i] = new Array();
        for (var j = 0; j < boardsize; j++) {
            boardtemp[i][j] = board[i][j]
        }
    }
    var result = new Array();
    for (var i = 0; i < boardsize; i++) {
        for (var j = 1; j < boardsize; j++) {
            if (boardtemp[i][j] == 0)
                continue;
            var moveflag = 0;
            if (boardtemp[i][j - 1] == 0) {
                boardtemp[i][j - 1] = boardtemp[i][j];
                boardtemp[i][j] = 0;
                result.push([i, j])
            } else if (boardtemp[i][j - 1] == boardtemp[i][j] && boardtemp[i][j] >= 3) {
                boardtemp[i][j - 1] *= 2;
                boardtemp[i][j] = 0;
                result.push([i, j])
            } else if (boardtemp[i][j - 1] + boardtemp[i][j] == 3 && boardtemp[i][j - 1] != 0) {
                boardtemp[i][j - 1] = 3;
                boardtemp[i][j] = 0;
                result.push([i, j])
            };
        };
    };
    return result;
}

function moverightgrid() {
    var boardtemp = new  Array();
    for (var i = 0; i < boardsize; i++) {
        boardtemp[i] = new Array();
        for (var j = 0; j < boardsize; j++) {
            boardtemp[i][j] = board[i][j]
        }
    }
    var result = new Array();
    for (var i = 0; i < boardsize; i++) {
        for (var j = boardsize - 2; j >= 0; j--) {
            if (boardtemp[i][j] == 0)
                continue;
            if (boardtemp[i][j + 1] == 0) {
                boardtemp[i][j + 1] = boardtemp[i][j];
                boardtemp[i][j] = 0;
                result.push([i, j])
            } else if (boardtemp[i][j + 1] == boardtemp[i][j] && boardtemp[i][j] >= 3) {
                boardtemp[i][j + 1] *= 2;
                boardtemp[i][j] = 0;
                result.push([i, j])
            } else if (boardtemp[i][j + 1] + boardtemp[i][j] == 3 && boardtemp[i][j + 1] != 0) {
                boardtemp[i][j + 1] = 3;
                boardtemp[i][j] = 0;
                result.push([i, j])
            };
        };
    };
    return result;
}

function moveupgrid() {
    var boardtemp = new  Array();
    for (var i = 0; i < boardsize; i++) {
        boardtemp[i] = new Array();
        for (var j = 0; j < boardsize; j++) {
            boardtemp[i][j] = board[i][j]
        }
    }
    var result = new Array();
    for (var j = 0; j < boardsize; j++) {
        for (var i = 1; i < boardsize; i++) {
            if (boardtemp[i][j] == 0)
                continue;
            if (boardtemp[i - 1][j] == 0) {
                boardtemp[i - 1][j] = boardtemp[i][j];
                boardtemp[i][j] = 0;
                result.push([i, j])
            } else if (boardtemp[i - 1][j] == boardtemp[i][j] && boardtemp[i][j] >= 3) {
                boardtemp[i - 1][j] *= 2;
                boardtemp[i][j] = 0;
                result.push([i, j])
            } else if (boardtemp[i - 1][j] + boardtemp[i][j] == 3 && boardtemp[i - 1][j] != 0) {
                boardtemp[i - 1][j] = 3;
                boardtemp[i][j] = 0;
                result.push([i, j])
            };
        };
    };
    return result;
}

function movedowngrid() {
    var boardtemp = new  Array();
    for (var i = 0; i < boardsize; i++) {
        boardtemp[i] = new Array();
        for (var j = 0; j < boardsize; j++) {
            boardtemp[i][j] = board[i][j]
        }
    }
    var result = new Array();
    for (var j = 0; j < boardsize; j++) {
        for (var i = boardsize - 2; i >= 0; i--) {
            if (boardtemp[i][j] == 0)
                continue;
            if (boardtemp[i + 1][j] == 0) {
                boardtemp[i + 1][j] = boardtemp[i][j];
                boardtemp[i][j] = 0;
                result.push([i, j])
            } else if (boardtemp[i + 1][j] == boardtemp[i][j] && boardtemp[i][j] >= 3) {
                boardtemp[i + 1][j] *= 2;
                boardtemp[i][j] = 0;
                result.push([i, j])
            } else if (boardtemp[i + 1][j] + boardtemp[i][j] == 3 && boardtemp[i + 1][j] != 0) {
                boardtemp[i + 1][j] = 3;
                boardtemp[i][j] = 0;
                result.push([i, j])
            };
        };
    };
    return result;
}


function moveleft() {
    var canmove = 0;
    var moveline = [];
    for (var i = 0; i < boardsize; i++) {
        var lineflag = 0;
        for (var j = 1; j < boardsize; j++) {
            if (board[i][j] == 0)
                continue;
            var moveflag = 0;
            if (board[i][j - 1] == 0) {
                board[i][j - 1] = board[i][j];
                board[i][j] = 0;
                moveflag = 1;
            } else if (board[i][j - 1] == board[i][j] && board[i][j] >= 3) {
                board[i][j - 1] *= 2;
                board[i][j] = 0;
                moveflag = 1;
            } else if (board[i][j - 1] + board[i][j] == 3 && board[i][j - 1] != 0) {
                board[i][j - 1] = 3;
                board[i][j] = 0;
                moveflag = 1;
            };
            if (moveflag == 1) {
                leftRightAnimate(i, j, -1)
                canmove = 1;
                if (lineflag == 0) {
                    lineflag = 1;
                    moveline = moveline.concat([i]);
                }
            }
        };
    };
    if (canmove == 1) {
        var idx = moveline[GetRandom(moveline.length) - 1];
        board[idx][boardsize - 1] = nextnum;
        //next number
        setgrid('n', 'n', nextnum);
        setgridpos('n', 'n', getleft(idx, boardsize - 1) + gridwidth, gettop(idx, boardsize - 1));
        nextAnimateLeft(idx, boardsize - 1)
        setTimeout("UpdateBoard()", animate_span);
    }
}

function moveright() {
    var canmove = 0;
    var moveline = [];
    for (var i = 0; i < boardsize; i++) {
        var lineflag = 0;
        for (var j = boardsize - 2; j >= 0; j--) {
            if (board[i][j] == 0)
                continue;
            var moveflag = 0;
            if (board[i][j + 1] == 0) {
                board[i][j + 1] = board[i][j];
                board[i][j] = 0;
                moveflag = 1
            } else if (board[i][j + 1] == board[i][j] && board[i][j] >= 3) {
                board[i][j + 1] *= 2;
                board[i][j] = 0;
                moveflag = 1
            } else if (board[i][j + 1] + board[i][j] == 3 && board[i][j + 1] != 0) {
                board[i][j + 1] = 3;
                board[i][j] = 0;
                moveflag = 1
            };
            if (moveflag == 1) {
                leftRightAnimate(i, j, 1)
                canmove = 1;
                if (lineflag == 0) {
                    lineflag = 1;
                    moveline = moveline.concat([i]);
                }
            }
        };
    };
    if (canmove == 1) {
        var idx = moveline[GetRandom(moveline.length) - 1];
        board[idx][0] = nextnum;
        //next number
        setgrid('n', 'n', nextnum);
        setgridpos('n', 'n', getleft(idx, 0) - gridwidth, gettop(idx, 0));
        nextAnimateLeft(idx, 0)
        setTimeout("UpdateBoard()", animate_span);
    }
}

function moveup() {
    var canmove = 0;
    var moveline = [];
    for (var j = 0; j < boardsize; j++) {
        var lineflag = 0;
        for (var i = 1; i < boardsize; i++) {
            if (board[i][j] == 0)
                continue;
            var moveflag = 0;
            if (board[i - 1][j] == 0) {
                board[i - 1][j] = board[i][j];
                board[i][j] = 0;
                moveflag = 1
            } else if (board[i - 1][j] == board[i][j] && board[i][j] >= 3) {
                board[i - 1][j] *= 2;
                board[i][j] = 0;
                moveflag = 1
            } else if (board[i - 1][j] + board[i][j] == 3 && board[i - 1][j] != 0) {
                board[i - 1][j] = 3;
                board[i][j] = 0;
                moveflag = 1
            };
            if (moveflag == 1) {
                upDownAnimate(i, j, -1);
                canmove = 1;
                if (lineflag == 0) {
                    lineflag = 1;
                    moveline = moveline.concat([j]);
                }
            }
        };
    };
    if (canmove == 1) {
        var idx = moveline[GetRandom(moveline.length) - 1];
        board[boardsize - 1][idx] = nextnum;
        //next number
        setgrid('n', 'n', nextnum);
        setgridpos('n', 'n', getleft(boardsize - 1, idx), gettop(boardsize - 1, idx) + gridheight);
        nextAnimateUp(boardsize - 1, idx)
        setTimeout("UpdateBoard()", animate_span);
    }
}

function movedown() {
    var canmove = 0;
    var moveline = [];
    for (var j = 0; j < boardsize; j++) {
        var lineflag = 0;
        for (var i = boardsize - 2; i >= 0; i--) {
            if (board[i][j] == 0)
                continue;
            var moveflag = 0;
            if (board[i + 1][j] == 0) {
                board[i + 1][j] = board[i][j];
                board[i][j] = 0;
                moveflag = 1
            } else if (board[i + 1][j] == board[i][j] && board[i][j] >= 3) {
                board[i + 1][j] *= 2;
                board[i][j] = 0;
                moveflag = 1
            } else if (board[i + 1][j] + board[i][j] == 3 && board[i + 1][j] != 0) {
                board[i + 1][j] = 3;
                board[i][j] = 0;
                moveflag = 1
            };
            if (moveflag == 1) {
                upDownAnimate(i, j, 1);
                canmove = 1;
                if (lineflag == 0) {
                    lineflag = 1;
                    moveline = moveline.concat([j]);
                }
            }
        };
    };
    if (canmove == 1) {
        var idx = moveline[GetRandom(moveline.length) - 1];
        board[0][idx] = nextnum;
        //next number
        setgrid('n', 'n', nextnum);
        setgridpos('n', 'n', getleft(0, idx), gettop(0, idx) - gridheight);
        nextAnimateUp(0, idx)
        setTimeout("UpdateBoard()", animate_span);
    }
}