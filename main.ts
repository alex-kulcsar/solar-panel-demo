sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeScoreBy(1)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (day == 3) {
        if (placerSprite.image.equals(assets.image`smallPlacer`)) {
            placerSprite.setImage(assets.image`largePlacer`)
        } else {
            placerSprite.setImage(assets.image`smallPlacer`)
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (info.life() > 0 && placerSprite.image.equals(assets.image`smallPlacer`)) {
        projectile = sprites.createProjectileFromSprite(assets.image`smallPanel`, placerSprite, 0, 0)
        projectile.setKind(SpriteKind.Food)
        info.changeLifeBy(-1)
    } else if (info.life() > 1 && placerSprite.image.equals(assets.image`largePlacer`)) {
        projectile = sprites.createProjectileFromSprite(assets.image`largePanel`, placerSprite, 0, 0)
        projectile.setKind(SpriteKind.Food)
        info.changeLifeBy(-2)
    }
})
info.onCountdownEnd(function () {
    day += 1
    info.setLife(Math.idiv(info.score() - yesterdayScore, 10))
    yesterdayScore = info.score()
    if (day > 3) {
        game.setGameOverEffect(true, effects.confetti)
        game.gameOver(true)
    } else if (day == 3) {
        game.showLongText("Now, you can buy a larger solar panel for 2 credits!\\n \\nPress B to switch sizes.", DialogLayout.Full)
    }
    game.showLongText("Day " + day + "\\n \\nYou collected enough sunlight for " + info.life() + " more credits.", DialogLayout.Full)
    info.startCountdown(24)
})
info.onLifeZero(function () {
	
})
let sunlightSprite: Sprite = null
let projectile: Sprite = null
let yesterdayScore = 0
let day = 0
let placerSprite: Sprite = null
game.showLongText("Press A to place a solar panel to catch sunlight!\\n \\nYou have 5 credits to place 5 panels.\\n \\nHow much sunlight can you catch in 3 days?", DialogLayout.Full)
info.setScore(0)
info.setLife(5)
placerSprite = sprites.create(assets.image`smallPlacer`, SpriteKind.Player)
controller.moveSprite(placerSprite)
placerSprite.setStayInScreen(true)
info.startCountdown(24)
day = 1
yesterdayScore = 0
game.onUpdateInterval(100, function () {
    sunlightSprite = sprites.create(assets.image`sunlight`, SpriteKind.Projectile)
    if (Math.percentChance(50)) {
        sunlightSprite.setPosition(randint(40, 120), 0)
    } else {
        if (Math.percentChance(50)) {
            sunlightSprite.setPosition(randint(0, 40), 0)
        } else {
            sunlightSprite.setPosition(randint(120, 159), 0)
        }
    }
    sunlightSprite.setVelocity(0, 100)
    sunlightSprite.setFlag(SpriteFlag.AutoDestroy, true)
})
