const G = 6.67e-11
const SCALE = 0.0025
const fontSize = 256
const msg = 'Hi'
let font


let particles = []

function preload() {
    font = loadFont('./SourceCodePro-Black.ttf')
}

function setup () {
  createCanvas(800, 400)

  textFont(font)
  textSize(fontSize)

  let xOff = 0
  let yOff = height / 2 + fontSize / 2

  for (const letter of msg) {
    const points = font.textToPoints(letter, xOff, yOff, fontSize)

    for (let i = 0; i < points.length; i += msg.length) {
      const point = points[i]
      let x = point.x
      let y = point.y
      let mass = 4e6

      particles.push(new Particle(x, y, mass))
    }

    xOff += textWidth(letter)
  }
}

function draw () {
  background(51, 51, 51)

  for (const particleA of particles)
    for (const particleB of particles)
      if (particleA !== particleB) particleA.physics(particleB)

  for (const particle of particles) {
    particle.update()
    particle.draw()
  }
}
