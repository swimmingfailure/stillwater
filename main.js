var stage = new createjs.Stage('game-canvas')
stage.canvas.width = window.innerWidth
stage.canvas.height = window.innerHeight
var player = {
  width: 48,
  height: 96,
  speed: 15
}
player.sprite = makePlayerSprite()
var keyStates = {}

$(function () {
  // stage.canvas.width = window.innerWidth
  // stage.canvas.height = window.innerHeight
  window.addEventListener('resize', windowResize)
  document.addEventListener('keydown', function (e) { keyStates[e.which || e.keyCode] = true })
  document.addEventListener('keyup', function (e) { keyStates[e.which || e.keyCode] = false })

  stage.addChild(makeBackground('grass.png'))
  // stage.addChild(makeCircle())
  // stage.addChild(makeJar())
  stage.addChild(player.sprite)

  createjs.Ticker.framerate = 60
  createjs.Ticker.addEventListener('tick', handleTick)
})

function handleTick (e) {
  if (keyStates[38] || keyStates[87]) {
    walkUp()
  }
  if (keyStates[40] || keyStates[83]) {
    walkDown()
  }
  if (keyStates[37] || keyStates[65]) {
    walkLeft()
  }
  if (keyStates[39] || keyStates[68]) {
    walkRight()
  }
  if (isAnyKeyPressed() === false) {
    player.sprite.stop()
  }
  stage.update(e)
}

function isAnyKeyPressed () {
  var pressed = false
  for (var code in keyStates) {
    if (keyStates[code] === true) {
      pressed = true
    }
  }
  return pressed
}

function makeJar () {
  var jar = new createjs.Bitmap('weedjar.png')
  jar.x = 300
  jar.y = 400
  return jar
}

function makeBackground (img) {
  var bg = new createjs.Bitmap(img)
  bg.scaleX = 2
  bg.scaleY = 2
  return bg
}

function makePlayerSprite () {
  var sprite = new createjs.Sprite(makeSpritesheet())
  sprite.gotoAndStop('front')
  sprite.x = stage.canvas.width / 2
  sprite.y = stage.canvas.height / 2
  sprite.framerate = player.speed - player.speed / 5
  sprite.addEventListener('click', function (e) { bloopClick(e, sprite) })
  return sprite
}

function makeSpritesheet () {
  return new createjs.SpriteSheet({
    images: ['spritesheet.png'],
    frames: { width: player.width, height: player.height, count: 16, regX: player.width / 2, regY: player.height / 2 },
    animations: {
      front: 0,
      downrun: {
        frames: [0, 1, 2, 3]
      },
      back: 4,
      uprun: {
        frames: [4, 5, 6, 7]
      },
      left: 8,
      leftrun: {
        frames: [8, 9, 10, 11]
      },
      right: 12,
      rightrun: {
        frames: [12, 13, 14, 15]
      }
    }
  })
}

function bloopClick (e, obj) {
  createjs.Sound.registerSound('bloop.mp3', 'bloop')
  createjs.Sound.play('bloop')
  createjs.Tween.get(obj, { loop: false })
    .to({ x: obj.x + 5 }, 50, createjs.Ease.linear)
    .to({ x: obj.x - 5 }, 50, createjs.Ease.linear)
    .to({ x: obj.x + 5 }, 50, createjs.Ease.linear)
    .to({ x: obj.x }, 50, createjs.Ease.linear)
}

function makeCircle () {
  var circle = new createjs.Shape()
  circle.graphics.beginFill('white').drawCircle(0, 0, 50)
  circle.x = 100
  circle.y = 100
  circle.addEventListener('click', function (e) { bloopClick(e, circle) })

  createjs.Tween.get(circle, { loop: true })
    .to({ x: 400 }, 3000, createjs.Ease.getPowInOut(4))
  // .to({ alpha: 0, y: 50 }, 500, createjs.Ease.getPowInOut(2))
  // .to({ alpha: 0, y: 150 }, 0)
  // .to({ alpha: 1, y: 100 }, 500, createjs.Ease.getPowInOut(2))
    .to({ x: 100 }, 3000, createjs.Ease.getPowInOut(4))

  return circle
}

function windowResize (e) {
  stage.canvas.width = window.innerWidth
  stage.canvas.height = window.innerHeight
}
