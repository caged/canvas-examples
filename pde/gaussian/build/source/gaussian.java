import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class gaussian extends PApplet {

//
// void setup() {
//   size(640,360);
//   background(0);
// }
//
// void draw() {
//   float num = randomGaussian();
//   float sd = 60;
//   float mean = 320;
//
//   float x = sd * num + mean;
//
//   noStroke();
//   fill(255, 10);
//   ellipse(x, 180, 16, 16);
// }
float[] distribution = new float[360];

public void setup() {
  
  for (int i = 0; i < distribution.length; i++) {
    distribution[i] = PApplet.parseInt(randomGaussian() * 15);
  }
}

public void draw() {
  background(204);

  translate(width/2, width/2);

  for (int i = 0; i < distribution.length; i++) {
    rotate(TWO_PI/distribution.length);
    stroke(0);
    float dist = abs(distribution[i]);
    line(0, 0, dist, 0);
  }
}
  public void settings() {  size(100, 100); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "gaussian" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
