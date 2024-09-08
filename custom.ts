namespace SpriteKind {
    export const Scenery = SpriteKind.create()
    export const Shadow = SpriteKind.create()
}

//% weight=100 color=#0fbc11 icon=""
namespace Solar {
    let initCredits = 0
    let ticks = 0
    let sunX = 0
    let sunY = 0
    let yesterdayScore = 0
    let runtimeStart = 0

    //% block
    export function setInitialCredits(num: number) {
        initCredits = num
    }

    //% block
    export function moveSun(theSun: Sprite) {
        ticks = (game.runtime() - runtimeStart) / 100
        sunX = 160 - 2 * ticks / 3
        sunY = 7 * (sunX * sunX) / 640 - 7 * sunX / 4 + 70
        theSun.setPosition(sunX, sunY)
    }

    //% block
    export function attachShadowToPlayer(shadow: Sprite, player: Sprite) {
        game.onUpdate(function () {
            shadow.x = player.right
            shadow.y = player.top
        })
    }

    //% block
    export function isSunlightMade() {
        let deltaX: number = Math.abs(sunX - 80)
        let chance: number = 90 * (80 - deltaX) / 80 + 10
        if (Math.percentChance(chance)) {
            return true
        } else {
            return false
        }
    }

    //% block
    export function setupDay(theDay: number) {
        if (theDay == 1) {
            info.setLife(initCredits)
        } else {
            info.setLife(Math.idiv(info.score() - yesterdayScore, 10))
        }
        yesterdayScore = info.score()
    }

    //% block
    export function startDay() {
        runtimeStart = game.runtime()
        info.startCountdown(24)
    }
}
