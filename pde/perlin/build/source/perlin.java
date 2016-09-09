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

public class perlin extends PApplet {

float tx = 0;
float ty = 1;

public void setup() {
  
  background(0);
}

public void draw() {
  background(0);

  float x = map(noise(tx), 0, 1, 0, width);
  float y = map(noise(ty), 0, 1, 0, height);

  noStroke();
  fill(175);

  ellipse(x,y,16,16);


  tx += 0.01f;
  ty -= 0.01f;

}
  public void settings() {  size(600, 400); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "perlin" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
