function createNextList() {
    var origin_pos = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3];
    var newpos = randomOrder(origin_pos);
    newpos = newpos.concat(randomOrder(origin_pos));
    if (maxgrid >= 48) {
        var randomgrid = CreateRandomGrid(maxgrid);
        newpos.splice(Math.floor(Math.random() * newpos.length), 0, randomgrid);
    }
    return newpos
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

//Not Bigger than the 1/8 of max grid
function CreateRandomGrid(curmax) {
    var maxidx = Math.log(curmax / 24) / Math.log(2);
    var randomidx = Math.ceil(Math.random() * maxidx);
    return 3 * Math.pow(2, randomidx);
}

function GetNextNum() {
    var result = nextlist[nextcounter];
    nextcounter += 1;
    //if go to the end of nextlist,create a new one;
    if (nextcounter >= nextlist.length) {
        nextcounter = 0;
        maxgrid = board.max();
        nextlist = createNextList();
    }
    return result;
}

$(document).keydown(function(event) {
    switch (event.keyCode) {
        case 37: //left
            moveleft();
            break
        case 38: //up
            moveup();
            break
        case 39: //right
            moveright();
            break
        case 40: //down
            movedown();
            break
        default:
            break
    }
})

function moveleft() {
    var moveflag = 0;
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
                $('#gridnumber-' + i + '-' + j).animate({
                    left: getleft(i, j - 1) + 'px'
                }, animate_span);
                moveflag = 1;
                if (lineflag == 0) {
                    lineflag = 1;
                    moveline = moveline.concat([i]);
                }
            }
        };
    };
    if (moveflag == 1) {
        var idx = moveline[Math.ceil(moveline.length * Math.random()) - 1];
        board[idx][boardsize - 1] = nextnum;
        setTimeout("UpdateBoard()", animate_span * 1.5);
    }
}

function moveright() {
    var moveflag = 0;
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
                $('#gridnumber-' + i + '-' + j).animate({
                    left: getleft(i, j + 1) + 'px'
                }, animate_span);
                moveflag = 1;
                if (lineflag == 0) {
                    lineflag = 1;
                    moveline = moveline.concat([i]);
                }
            }
        };
    };
    if (moveflag == 1) {
        var idx = moveline[Math.ceil(moveline.length * Math.random()) - 1];
        board[idx][0] = nextnum;
        setTimeout("UpdateBoard()", animate_span * 1.5);
    }
}

function moveup() {
    var moveflag = 0;
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
                $('#gridnumber-' + i + '-' + j).animate({
                    top: gettop(i - 1, j) + 'px'
                }, animate_span);
                moveflag = 1;
                if (lineflag == 0) {
                    lineflag = 1;
                    moveline = moveline.concat([j]);
                }
            }
        };
    };
    if (moveflag == 1) {
        var idx = moveline[Math.ceil(moveline.length * Math.random()) - 1];
        board[boardsize - 1][idx] = nextnum;
        setTimeout("UpdateBoard()", animate_span * 1.5);
    }
}

function movedown() {
    var moveflag = 0;
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
                $('#gridnumber-' + i + '-' + j).animate({
                    top: gettop(i + 1, j) + 'px'
                }, animate_span);
                moveflag = 1;
                if (lineflag == 0) {
                    lineflag = 1;
                    moveline = moveline.concat([j]);
                }
            }
        };
    };
    if (moveflag == 1) {
        var idx = moveline[Math.ceil(moveline.length * Math.random()) - 1];
        board[0][idx] = nextnum;
        setTimeout("UpdateBoard()", animate_span * 1.5);
    }
}