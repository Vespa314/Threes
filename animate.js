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