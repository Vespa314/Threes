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