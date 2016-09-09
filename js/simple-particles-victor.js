// Based on http://www.playfuljs.com/particle-effects-are-easy/
const DAMPING = 0.999;

class VictorParticle {
  constructor(x, y) {
    this.position = new Victor(x, y)
    this.oldPosition = this.position.clone()
  }

  integrate() {
    let velocity = this.position
      .clone()
      .subtract(this.oldPosition)
      .multiplyScalar(DAMPING)

    this.oldPosition.copy(this.position)
    this.position.add(velocity)
  }

  attract(point) {
    let distance = point.distance(this.position)
    point.subtract(this.position)
    this.position.add(point.divideScalar(distance))
  }

  draw() {
    ctx.moveTo(this.oldPosition.x, this.oldPosition.y)
    ctx.lineTo(this.position.x, this.position.y)
  }
}


let el = document.getElementById('vis')
var ctx = el.getContext('2d'),
    width = el.offsetWidth,
    height = el.offsetHeight,
    mouse = new Victor(width * 0.5, height * 0.5),
    particles = [],
    i = 0,
    ticks = 0

el.setAttribute('width', width)
el.setAttribute('height', height)

ctx.globalCompositeOperation = 'lighter'


for (i; i < 10000; i++)
  particles[i] = new VictorParticle(Math.random() * width, Math.random() * height)

el.addEventListener('mousemove', move)

requestAnimationFrame(tick);

function move(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

function tick() {
  let i = 0, len = particles.length;
  requestAnimationFrame(tick);
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath()
  for(i; i < len; i++) {
    let particle = particles[i]
    particle.attract(mouse.clone());
    particle.integrate();
    particle.draw();
  }

    ctx.strokeStyle = "hsl(120, 100%, 30%)"
    ctx.strokeOpacity = 0.1
    ctx.stroke()
}
