function getleft(i, j) {
    return boardpadding + (2 * j + 1) * gridmargin + j * gridwidth;
}

function gettop(i, j) {
    return boardpadding + (2 * i + 1) * gridmargin + i * gridheight;
}