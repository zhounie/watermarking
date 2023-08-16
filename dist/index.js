function index (dom, content, options) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = dom.offsetWidth;
    canvas.height = dom.offsetHeight;
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    var textWidth = ctx.measureText(content).width;
    for (var x = 0; x < canvas.width; x += textWidth + 200) {
        for (var y = 0; y < canvas.height; y += 200) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(Math.PI / 4);
            ctx.fillText(content, 0, 0);
            ctx.restore();
        }
    }
    var dataURL = canvas.toDataURL();
    var background = getComputedStyle(dom).background;
    if (background) {
        dom.style.background = "url(".concat(dataURL, "), ").concat(background);
    }
}

export { index as default };
