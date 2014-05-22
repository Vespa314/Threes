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

// $(document).keydown(function(event) {
//     switch (event.keyCode) {
//         case 37: //left
//             break
//         case 38: //up
//             break
//         case 39: //right
//             break
//         case 40: //down
//             break
//         default:
//             break
//     }
// })