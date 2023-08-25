function getTextDimensions(ctx, text) {
    var width = ctx.measureText(text).width;
    var metrics = ctx.measureText('M'); // 使用大写字母M作为参考
    var height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    return {
        width: width,
        height: height
    };
}
function getRotatedTextHeight(ctx, text, fontSize, angle) {
    // 测量文本宽度
    var width = getTextDimensions(ctx, text).width;
    // 计算旋转后的文本高度
    var radianAngle = angle * Math.PI / 180;
    var rotatedHeight = Math.abs(Math.sin(radianAngle) * width) + Math.abs(Math.cos(radianAngle) * fontSize);
    return rotatedHeight;
}
function createElement() {
    var target = document.createElement('div');
    target.style.height = '100%';
    target.style.position = 'absolute';
    target.style.pointerEvents = 'none';
    target.style.top = '0';
    target.style.bottom = '0';
    target.style.left = '0';
    target.style.right = '0';
    target.style.zIndex = '9999';
    return target;
}
function genOptions(options) {
    return Object.assign({
        fontSize: 16,
        fontFamily: 'Arial',
        color: 'rgba(0, 0, 0, 0.2)',
        opacity: 0.8,
        padding: 100,
        rotation: -30,
    }, options);
}
function index (dom, content, config) {
    if (config === void 0) { config = {}; }
    var options = genOptions(config);
    var target = createElement();
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    if (!ctx) {
        return {};
    }
    ctx.font = "".concat(options.fontSize, "px ").concat(options.fontFamily);
    // 设置画布尺寸
    var padding = typeof options.padding === 'number' ? options.padding : 10;
    var textWidth = getTextDimensions(ctx, content).width;
    var canvasWidth = options.width || Math.ceil(textWidth + padding * 2);
    var canvasHeight = options.height || Math.ceil(textWidth + padding * 2);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // 设置文本样式
    ctx.font = "".concat(options.fontSize, "px ").concat(options.fontFamily);
    ctx.fillStyle = options.color || 'rgba(0, 0, 0, 0.2)';
    ctx.globalAlpha = options.opacity || 1;
    // 绘制文本
    var textHeight = getRotatedTextHeight(ctx, content, options.fontSize, options.rotation);
    ctx.translate(padding, (canvasHeight / 2) + (Math.ceil(textHeight) / 2));
    if (options.rotation) {
        ctx.rotate((options.rotation * Math.PI) / 180);
    }
    ctx.fillText(content, 0, 0);
    // 将canvas转换成图片URL
    var imageURL = canvas.toDataURL();
    // 设置指定DOM元素的背景图像
    target.style.backgroundImage = "url(".concat(imageURL, ")");
    target.style.backgroundRepeat = 'repeat';
    dom.appendChild(target);
    return {
        removeWatermark: function () {
            // 移除背景图像
            target.style.backgroundImage = '';
        },
    };
}

export { index as default };
