function walkUp () {
 player.sprite.gotoAndPlay('uprun')
  if (player.sprite.y > 0 + player.height / 2 + 16) {
    createjs.Tween.get(player.sprite, { loop: false })
      .to({ y: player.sprite.y - player.speed }, 50, createjs.Ease.linear)
  }
}

function walkDown () {
  if (player.sprite.paused) player.sprite.gotoAndPlay('downrun')
  if (player.sprite.y < stage.canvas.height - player.height / 2 - 16) {
    createjs.Tween.get(player.sprite, { loop: false })
      .to({ y: player.sprite.y + player.speed }, 50, createjs.Ease.linear)
  }
}

function walkLeft () {
  if (player.sprite.paused) player.sprite.gotoAndPlay('leftrun')
  if (player.sprite.x > 0 + player.width / 2 + 16) {
    createjs.Tween.get(player.sprite, { loop: false })
      .to({ x: player.sprite.x - player.speed }, 50, createjs.Ease.linear)
  }
}

function walkRight () {
  if (player.sprite.paused) player.sprite.gotoAndPlay('rightrun')
  if (player.sprite.x < stage.canvas.width - player.width / 2 - 16) {
    createjs.Tween.get(player.sprite, { loop: false })
      .to({ x: player.sprite.x + player.speed }, 50, createjs.Ease.linear)
  }
}