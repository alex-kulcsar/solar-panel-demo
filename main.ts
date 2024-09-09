namespace SpriteKind {
    export const Scenery = SpriteKind.create()
    export const Shadow = SpriteKind.create()
    export const SolarPanel = SpriteKind.create()
    export const Sunlight = SpriteKind.create()
    export const Cloud = SpriteKind.create()
    export const ReducedSunlight = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Sunlight, SpriteKind.SolarPanel, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeScoreBy(1)
})
function startNewDay () {
    day += 1
    if (day > 3) {
        game.setGameOverEffect(true, effects.confetti)
        game.gameOver(true)
    } else if (day == 3) {
        game.showLongText("Now, you can buy a larger solar panel for 2 credits!\\n \\nPress B to switch sizes.", DialogLayout.Full)
    }
    Solar.setupDay(day)
    if (day == 1) {
        game.showLongText("Press A to place a solar panel to catch sunlight!\\n \\nYou have 5 credits to place 5 panels.\\n \\nHow much sunlight can you catch in 3 days?", DialogLayout.Full)
    } else {
        game.showLongText("Day " + day + "\\n \\nYou collected enough sunlight to have " + info.life() + " credits.", DialogLayout.Full)
    }
    Solar.startDay()
    for (let index = 0; index < day; index++) {
        Solar.addCloud()
    }
}
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
        projectile.setKind(SpriteKind.SolarPanel)
        info.changeLifeBy(-1)
    } else if (info.life() > 1 && placerSprite.image.equals(assets.image`largePlacer`)) {
        projectile = sprites.createProjectileFromSprite(assets.image`largePanel`, placerSprite, 0, 0)
        projectile.setKind(SpriteKind.SolarPanel)
        info.changeLifeBy(-2)
    }
})
info.onCountdownEnd(function () {
    startNewDay()
})
sprites.onOverlap(SpriteKind.ReducedSunlight, SpriteKind.SolarPanel, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Sunlight, SpriteKind.Cloud, function (sprite, otherSprite) {
    if (Math.percentChance(50)) {
        sprites.destroy(sprite)
    } else {
        sprite.setKind(SpriteKind.ReducedSunlight)
        sprite.setImage(assets.image`reducedSunlight`)
    }
})
let sunlightSprite: Sprite = null
let projectile: Sprite = null
let day = 0
let placerSprite: Sprite = null
info.setScore(0)
info.setLife(5)
Solar.setInitialCredits(5)
let heroSprite = sprites.create(assets.image`monkeyRight`, SpriteKind.Player)
controller.moveSprite(heroSprite)
heroSprite.setStayInScreen(true)
placerSprite = sprites.create(assets.image`smallPlacer`, SpriteKind.Shadow)
Solar.attachShadowToPlayer(placerSprite, heroSprite)
let lawnSprite = sprites.create(assets.image`lawn`, SpriteKind.Scenery)
lawnSprite.x = 80
lawnSprite.top = 60
lawnSprite.z = -1
let sunSprite = sprites.create(assets.image`sun`, SpriteKind.Scenery)
sunSprite.setPosition(80, 150)
sunSprite.z = -2
scene.setBackgroundColor(9)
day = 0
startNewDay()
game.onUpdateInterval(100, function () {
    Solar.moveSun(sunSprite)
    if (Solar.isSunlightMade()) {
        sunlightSprite = sprites.createProjectileFromSprite(assets.image`sunlight`, sunSprite, 0, 100)
        sunlightSprite.x += 8 - randint(0, 16)
        sunlightSprite.setKind(SpriteKind.Sunlight)
    }
})
