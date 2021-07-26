scene.setBackgroundColor(8)
let spacePlane = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    f f f f f f . . . . . . . . . .
    a a a a f f 1 . . . 2 2 2 . . .
    a 9 9 9 9 9 9 9 9 9 9 9 2 9 9 .
    a 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
    a 9 9 9 9 a a a a a a a a a 6 6
    a 9 9 9 a a 6 6 6 6 6 6 6 6 6 .
    a a a a f f 1 . . . . . . . . .
    f f f f f f . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
info.setLife(3)
spacePlane.setStayInScreen(true)
controller.moveSprite(spacePlane, 200, 200)
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    let missile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, spacePlane, 200, 0)
})
game.onUpdateInterval(500, function on_update() {
    let bogy = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . 2 2 2 2 2 2 2 . . . . .
        . . . 2 . . . . . . . 2 . . . .
        . . 2 . 6 6 6 6 6 6 6 . 2 . . .
        . . f f 6 . . c . . 6 . 2 . . .
        . . 2 f 6 . c f c . 6 . 2 . . .
        . . 2 . 6 c f f f c 6 . 2 . . .
        . . 2 . 6 . c f c . 6 . 2 . . .
        . . 2 . 6 . . c . . 6 . 2 . . .
        . . 2 . 6 6 6 6 6 6 6 . 2 . . .
        . . . 2 . . . . . . . 2 . . . .
        . . . . 2 2 2 2 2 2 2 . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Enemy)
    bogy.setVelocity(-100, randint(-30, 30))
    bogy.y = randint(0, scene.screenHeight())
    bogy.left = scene.screenWidth()
    bogy.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_hit(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy(effects.fire, 100)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_crash(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy()
    info.changeLifeBy(-1)
})
