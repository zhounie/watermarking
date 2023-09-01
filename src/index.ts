interface Options {
    fontSize?: number
    fontFamily?: string
    color?: string
    opacity?: number
    padding?: number
    rotation?: number
    width?: number
    height?: number,
    type?: 'image' | 'text'
}


function getTextDimensions(ctx, text) {
  const { width } = ctx.measureText(text);
  const metrics = ctx.measureText('M'); // 使用大写字母M作为参考
  const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
  return {
    width, height
  }
}

function getRotatedTextHeight(ctx, text, fontSize, angle) {

  // 测量文本宽度
  const { width } = getTextDimensions(ctx, text)

  // 计算旋转后的文本高度
  const radianAngle = angle * Math.PI / 180;
  const rotatedHeight = Math.abs(Math.sin(radianAngle) * width) + Math.abs(Math.cos(radianAngle) * fontSize);

  return rotatedHeight;
}

function createElement() {
  const target = document.createElement('div')
  target.style.height = '100%'
  target.style.position = 'absolute'
  target.style.pointerEvents = 'none'
  target.style.top = '0'
  target.style.bottom = '0'
  target.style.left = '0'
  target.style.right = '0'
  target.style.zIndex = '9999'
  return target
}
function createImage (src) {
  const img = new Image()
  img.src = src
  return img
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
  }, options)
}

export default async function(
    dom: HTMLElement,
    content: string,
    config: Options = {}
) {
  const options = genOptions(config)
  const target = createElement()
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return {}
  }

  const padding = typeof options.padding === 'number' ? options.padding : 10

  function setCanvasSize(width, height) {
    canvas.width = width
    canvas.height = height
  }

  function renderText() {
    ctx.font = `${options.fontSize}px ${options.fontFamily}`

    // 设置画布尺寸
  
    const textWidth = getTextDimensions(ctx, content).width
    
    const canvasWidth = options.width || Math.ceil(textWidth + padding * 2)
    
    const canvasHeight = options.height || Math.ceil(textWidth + padding * 2)

    setCanvasSize(canvasWidth, canvasHeight)
  
  
    // 设置文本样式
    ctx.font = `${options.fontSize}px ${options.fontFamily}`
    ctx.fillStyle = options.color || 'rgba(0, 0, 0, 0.2)'
    ctx.globalAlpha = options.opacity || 1
  
    // 绘制文本
    const textHeight = getRotatedTextHeight(ctx, content, options.fontSize, options.rotation)
    ctx.translate(padding, (canvasHeight / 2) + (Math.ceil(textHeight) / 2))
    
    if (options.rotation) {
      ctx.rotate((options.rotation * Math.PI) / 180)
    }
    ctx.fillText(content, 0, 0)
  }

  async function renderImage() {
    return new Promise((resolve, reject) => {

      const canvasWidth = Math.ceil(options.width + padding * 2)
      const canvasHeight = Math.ceil(options.height + padding * 2)
      setCanvasSize(canvasWidth, canvasHeight)
      
      const img = createImage(content)
      img.addEventListener('load',() => {
        ctx.globalAlpha = options.opacity || 1
        if (options.rotation) {
          ctx.rotate((options.rotation * Math.PI) / 180)
        }
        ctx.drawImage(img, (options.width / 2 - options.padding),  (options.height / 2 + options.padding), options.width, options.height)
        
        resolve(true)
      })
    })
  }
  
  if (options.type === 'text') {
    renderText()
  } else {
    await renderImage()
  }
  
    // 将canvas转换成图片URL
    const imageURL = canvas.toDataURL()
  
    // 设置指定DOM元素的背景图像
    target.style.backgroundImage = `url(${imageURL})`
    target.style.backgroundRepeat = 'repeat'
  
    dom.appendChild(target)
  
    return {
      removeWatermark: () => {
        // 移除背景图像
        target.style.backgroundImage = ''
      },
    }
}
  