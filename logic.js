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
    if (IsAnimate()) {
        return;
    }
    switch (event.keyCode) {
        case 37: //left
            event.preventDefault();
            moveleft();
            break
        case 38: //up
            event.preventDefault();
            moveup();
            break
        case 39: //right
            event.preventDefault();
            moveright();
            break
        case 40: //down
            event.preventDefault();
            movedown();
            break
        case 65: //test left
            var MovableGrid = moveleftgrid();
            for (var i = 0; i < MovableGrid.length; i++) {
                var x = MovableGrid[i][0]
                var y = MovableGrid[i][1]
                $('#gridnumber-' + x + '-' + y).animate({
                    left: getleft(x, y - 1) + 'px'
                }, animate_span).animate({
                    left: getleft(x, y) + 'px'
                }, animate_span)
            }
            break
        case 68: //test right
            var MovableGrid = moverightgrid();
            for (var i = 0; i < MovableGrid.length; i++) {
                var x = MovableGrid[i][0]
                var y = MovableGrid[i][1]
                $('#gridnumber-' + x + '-' + y).animate({
                    left: getleft(x, y + 1) + 'px'
                }, animate_span).animate({
                    left: getleft(x, y) + 'px'
                }, animate_span)
            }
            break
        case 83: //test down
            var MovableGrid = movedowngrid();
            for (var i = 0; i < MovableGrid.length; i++) {
                var x = MovableGrid[i][0]
                var y = MovableGrid[i][1]
                $('#gridnumber-' + x + '-' + y).animate({
                    top: gettop(x + 1, y) + 'px'
                }, animate_span).animate({
                    top: gettop(x, y) + 'px'
                }, animate_span)
            }
            break
        case 87: //test up
            var MovableGrid = moveupgrid();
            for (var i = 0; i < MovableGrid.length; i++) {
                var x = MovableGrid[i][0]
                var y = MovableGrid[i][1]
                $('#gridnumber-' + x + '-' + y).animate({
                    top: gettop(x - 1, y) + 'px'
                }, animate_span).animate({
                    top: gettop(x, y) + 'px'
                }, animate_span)
            }
            break
        default:
            break
    }
})

document.addEventListener('touchstart', function(event) {
    startx = event.touches[0].pageX
    starty = event.touches[0].pageY
})

document.addEventListener('touchend', function(event) {
    touchdir = 0;
    endx = event.changedTouches[0].pageX
    endy = event.changedTouches[0].pageY
    var distance = Dis(startx, starty, endx, endy);
    if (distance < 20)
        return;
    if (Math.abs(startx - movex) > Math.abs(starty - movey)) {
        if (startx > movex) {
            //left
            moveleft();
        } else {
            //right
            moveright();
        }
    } else {
        if (starty > movey) {
            //up
            moveup();
        } else {
            //down
            movedown();
        }
    }
})


document.addEventListener('touchmove', function(event) {
    movex = event.touches[0].pageX
    movey = event.touches[0].pageY
    var distance = Dis(startx, starty, movex, movey);
    if (distance < 20) {
        //复原
        setAllPos()
        touchdir = 0;
    }
    if (Math.abs(startx - movex) > Math.abs(starty - movey)) {
        if (distance > gridwidth + gridmargin) {
            distance = gridwidth + gridmargin;
        }
        if (touchdir == -1) {
            return;
        } else {
            touchdir = 1
        }
        if (startx > movex) {
            //left
            var MovableGrid = moveleftgrid();
            for (var i = 0; i < MovableGrid.length; i++) {
                $('#gridnumber-' + MovableGrid[i][0] + '-' + MovableGrid[i][1]).css('left', getleft(MovableGrid[i][0], MovableGrid[i][1]) - distance + 'px')
            }
        } else {
            //right
            var MovableGrid = moverightgrid();
            for (var i = 0; i < MovableGrid.length; i++) {
                $('#gridnumber-' + MovableGrid[i][0] + '-' + MovableGrid[i][1]).css('left', getleft(MovableGrid[i][0], MovableGrid[i][1]) + distance + 'px')
            }
        }
    } else {
        if (touchdir == 1) {
            return;
        } else {
            touchdir = -1
        }
        if (starty > movey) {
            //up
            var MovableGrid = moveupgrid();
            for (var i = 0; i < MovableGrid.length; i++) {
                $('#gridnumber-' + MovableGrid[i][0] + '-' + MovableGrid[i][1]).css('top', gettop(MovableGrid[i][0], MovableGrid[i][1]) - distance + 'px')
            }
        } else {
            //down
            var MovableGrid = movedowngrid();
            for (var i = 0; i < MovableGrid.length; i++) {
                $('#gridnumber-' + MovableGrid[i][0] + '-' + MovableGrid[i][1]).css('top', gettop(MovableGrid[i][0], MovableGrid[i][1]) + distance + 'px')
            }
        }
    }

})

function isGameOver() {
    for (var i = 0; i < boardsize; i++) {
        for (var j = 0; j < boardsize; j++) {
            if (board[i][j] == 0)
                return 0;
        }
    }
    //can move left
    for (var i = 0; i < boardsize; i++) {
        for (var j = 1; j < boardsize; j++) {
            if (board[i][j - 1] == board[i][j] && board[i][j] >= 3) {
                return 0;
            } else if (board[i][j - 1] + board[i][j] == 3 && board[i][j - 1] != 0) {
                return 0;
            };
        };
    };
    //can move right
    for (var i = 0; i < boardsize; i++) {
        for (var j = boardsize - 2; j >= 0; j--) {
            if (board[i][j + 1] == board[i][j] && board[i][j] >= 3) {
                return 0;
            } else if (board[i][j + 1] + board[i][j] == 3 && board[i][j + 1] != 0) {
                return 0;
            };
        };
    };
    //can move up
    for (var j = 0; j < boardsize; j++) {
        for (var i = 1; i < boardsize; i++) {
            if (board[i - 1][j] == board[i][j] && board[i][j] >= 3) {
                return 0;
            } else if (board[i - 1][j] + board[i][j] == 3 && board[i - 1][j] != 0) {
                return 0;
            };
        };
    };
    //can move down
    for (var j = 0; j < boardsize; j++) {
        for (var i = boardsize - 2; i >= 0; i--) {
            if (board[i + 1][j] == board[i][j] && board[i][j] >= 3) {
                return 0;
            } else if (board[i + 1][j] + board[i][j] == 3 && board[i + 1][j] != 0) {
                return 0;
            };
        };
    };
    return 1;
}