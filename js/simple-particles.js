// Based on http://www.playfuljs.com/particle-effects-are-easy/
const DAMPING = 0.999;

class Particle {
  constructor(x, y) {
    this.x = this.oldX = x;
    this.y = this.oldY = y;
  }

  integrate() {
    let velocityX = (this.x - this.oldX) * DAMPING;
    let velocityY = (this.y - this.oldY)  * DAMPING;
    this.oldX = this.x;
    this.oldY = this.y;
    this.x += velocityX;
    this.y += velocityY;
  }

  attract(x, y) {
    let dx = x - this.x;
    let dy = y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    this.x += dx / distance;
    this.y += dy / distance;
  }

  draw() {
    ctx.moveTo(this.oldX, this.oldY);
    ctx.lineTo(this.x, this.y);
  }
}

let el = document.getElementById('vis')
var ctx = el.getContext('2d'),
    width = el.offsetWidth,
    height = el.offsetHeight,
    mouse = { x: width * 0.5, y: height * 0.5 },
    particles = [],
    i = 0

el.setAttribute('width', width)
el.setAttribute('height', height)

ctx.globalCompositeOperation = 'color-dodge'

for (i; i < 200; i++)
  particles[i] = new Particle(Math.random() * width, Math.random() * height)

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
    particle.attract(mouse.x, mouse.y);
    particle.integrate();
    particle.draw();
  }

    ctx.strokeStyle = "hsl(" + Math.random() * 30 + ", 100%, 50%)"
    ctx.stroke()
}
