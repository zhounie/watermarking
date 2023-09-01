/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

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
function createImage(src) {
    var img = new Image();
    img.src = src;
    return img;
}
function genOptions(options) {
    return Object.assign({
        fontSize: 16,
        fontFamily: 'Arial',
        color: 'rgba(0, 0, 0, 0.2)',
        opacity: 0.8,
        padding: 100,
        rotation: -30,
        type: 'text'
    }, options);
}
function index (dom, content, config) {
    if (config === void 0) { config = {}; }
    return __awaiter(this, void 0, void 0, function () {
        function setCanvasSize(width, height) {
            canvas.width = width;
            canvas.height = height;
        }
        function renderText() {
            ctx.font = "".concat(options.fontSize, "px ").concat(options.fontFamily);
            // 设置画布尺寸
            var textWidth = getTextDimensions(ctx, content).width;
            var canvasWidth = options.width || Math.ceil(textWidth + padding * 2);
            var canvasHeight = options.height || Math.ceil(textWidth + padding * 2);
            setCanvasSize(canvasWidth, canvasHeight);
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
        }
        function renderImage() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var canvasWidth = Math.ceil(options.width + padding * 2);
                            var canvasHeight = Math.ceil(options.height + padding * 2);
                            setCanvasSize(canvasWidth, canvasHeight);
                            var img = createImage(content);
                            img.addEventListener('load', function () {
                                ctx.globalAlpha = options.opacity || 1;
                                if (options.rotation) {
                                    ctx.rotate((options.rotation * Math.PI) / 180);
                                }
                                ctx.drawImage(img, (options.width / 2 - options.padding), (options.height / 2 + options.padding), options.width, options.height);
                                resolve(true);
                            });
                        })];
                });
            });
        }
        var options, target, canvas, ctx, padding, imageURL;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = genOptions(config);
                    target = createElement();
                    canvas = document.createElement('canvas');
                    ctx = canvas.getContext('2d');
                    if (!ctx) {
                        return [2 /*return*/, {}];
                    }
                    padding = typeof options.padding === 'number' ? options.padding : 10;
                    if (!(options.type === 'text')) return [3 /*break*/, 1];
                    renderText();
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, renderImage()];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    imageURL = canvas.toDataURL();
                    // 设置指定DOM元素的背景图像
                    target.style.backgroundImage = "url(".concat(imageURL, ")");
                    target.style.backgroundRepeat = 'repeat';
                    dom.appendChild(target);
                    return [2 /*return*/, {
                            removeWatermark: function () {
                                // 移除背景图像
                                target.style.backgroundImage = '';
                            },
                        }];
            }
        });
    });
}

export { index as default };
