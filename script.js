let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let c = canvas.getContext('2d')


class Ball {
    constructor(x, y) {
        this.baseR = 10;
        this.r = this.baseR;
        this.x = x || randomInFromInterval(0 + this.r, window.innerWidth - this.r)
        this.y = y || randomInFromInterval(0 + this.r, window.innerHeight - this.r)
        this.vx = (Math.random() - 0.5) * 4
        this.vy = (Math.random() - 0.5) * 4
        this.draw()
    }


    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        c.fillStyle = 'red'
        c.fill()
    }


    update() {
        if (this.x + this.r > window.innerWidth || this.x - this.r < 0) {
            this.vx = -this.vx
        }
        if (this.y - this.r < 0 || this.y + this.r > window.innerHeight) {
            this.vy = - this.vy
        }
        this.x += this.vx
        this.y += this.vy
        this.draw()
    }


}


let balls = []
for (let i = 0; i < 100; i++) {
    balls.push(new Ball())
}
function animate() {
    c.clearRect(0, 0, window.innerWidth, window.innerHeight)
    balls.forEach(ball => {
        ball.update()
    })
    requestAnimationFrame(animate);
}
window.addEventListener('click', function (e) {
    balls.push(new Ball(e.clientX, e.clientY))
})

window.addEventListener('mousemove', function (e) {
    balls.forEach(ball => {
        let distance = Math.sqrt(Math.pow(e.clientX - ball.x, 2) + Math.pow(e.clientY - ball.y, 2))
        if (distance < 100 && ball.r < ball.baseR * 4) {
            ball.r += 1
        } else if (ball.r > ball.baseR) {
            ball.r -= 1
        }
    })
})

window.addEventListener('resize', function () {
    canvas.width = this.window.innerWidth
    canvas.height = this.window.innerHeight
})
animate()



function randomInFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}