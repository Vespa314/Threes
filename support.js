function getleft(i, j) {
    return boardpadding + j * (gridmargin + gridwidth);
}

function gettop(i, j) {
    return boardpadding + i * (gridmargin + gridheight);
}

//返回二维数组的最大值
Array.prototype.max = function() {
    return Math.max.apply(null, this.join(",").split(","))
}

function randomOrder(targetArray) {
    var arrayLength = targetArray.length
    var tempArray1 = new Array();
    for (var i = 0; i < arrayLength; i++) {
        tempArray1[i] = i
    }

    var tempArray2 = new Array();

    for (var i = 0; i < arrayLength; i++) {
        tempArray2[i] = tempArray1.splice(Math.floor(Math.random() * tempArray1.length), 1)
    }
    var tempArray3 = new Array();

    for (var i = 0; i < arrayLength; i++) {
        tempArray3[i] = targetArray[tempArray2[i]]
    }

    return tempArray3
}

function Dis(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
}

function setAllPos() {
    for (var i = 0; i < boardsize; i++) {
        for (var j = 0; j < boardsize; j++) {
            setgrid(i, j, board[i][j]);
            setgridpos(i, j, getleft(i, j), gettop(i, j));
        }
    }
}

function GetRandom(Upper) {
    var num = Math.ceil(Math.random() * Upper);
    while (num == 0)
        num = Math.ceil(Math.random() * Upper);
    return num
}

function ClearBoard() {
    for (var i = 0; i < boardsize; i++) {
        board[i] = new Array();
        for (var j = 0; j < boardsize; j++) {
            board[i][j] = 0;
        };
    };
}

function CountBoard(target) {
    var counter = 0;
    for (var i = 0; i < boardsize; i++) {
        for (var j = 0; j < boardsize; j++) {
            if (board[i][j] == target)
                counter++;
        };
    };
    return counter;
}