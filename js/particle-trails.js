// Based on http://www.playfuljs.com/particle-effects-are-easy/
// and http://www.macwright.org/2015/08/14/canvas-animation-methods.html
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
    this.x += dx / (distance * 10);
    this.y += dy / (distance * 10);
  }

  draw() {
    // begin a new path: arc is a line instruction like lineTo
    ctx.beginPath();
    // define the circle: position according to time, 50px radius
    ctx.arc(this.oldX, this.oldY, 2, this.y, this.x * Math.PI);

    ctx.fill();
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


for (i; i < 100; i++)
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
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  // clear what was drawn in the previous frame
  ctx.fillRect(0, 0, width, height);
  // now draw an opaque circle
  ctx.fillStyle = '#fff';

  for(i; i < len; i++) {
    let particle = particles[i]
    particle.attract(mouse.x, mouse.y);
    particle.integrate();
    particle.draw();
  }

}
