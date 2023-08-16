
interface Options {

}

export default function(dom: HTMLElement, content: string, options: Options) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = dom.offsetWidth
    canvas.height = dom.offsetHeight

    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    const textWidth = ctx.measureText(content).width;

    for (let x = 0; x < canvas.width; x += textWidth + 200) {
        for (let y = 0; y < canvas.height; y += 200) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(Math.PI / 4)
            ctx.fillText(content, 0, 0);
            ctx.restore();
        }
    }
    const dataURL = canvas.toDataURL()

    let background = getComputedStyle(dom).background
    if (background) {
        dom.style.background = `url(${dataURL}), ${background}`
    }
}