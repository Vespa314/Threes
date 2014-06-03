animate_span = 200; //ms

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