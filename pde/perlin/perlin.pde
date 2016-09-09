float tx = 0;
float ty = 1;

void setup() {
  size(600, 400);
  background(0);
}

void draw() {
  background(0);

  float x = map(noise(tx), 0, 1, 0, width);
  float y = map(noise(ty), 0, 1, 0, height);

  noStroke();
  fill(175);

  ellipse(x,y,16,16);


  tx += 0.01;
  ty -= 0.01;

}
