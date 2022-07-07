///altered stated of america 2022

// concept and software by Marlon Barrios Solano
//MIT License
// Copyright (c) 2020 Marlon Barrios Solano
//  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//  @license MIT
//  @author Marlon Barrios Solano
//  @website https://marlonbarrios.github.io  
//  @email marlon@dance-tech.net


let flag = "usa.jpg";
let group = [];
let grid = 30;
let img;
let frameW = 250;
let frameH = 120;
let res = 0.01;
let damping = 0.8;
let lifeSpan = 500;
let thikness = 5;
let transparency = 20;

function preload() {
  img = loadImage(flag);
}
  
// Create a new canvas to match the browser size
function setup() {
  createCanvas(windowWidth, windowHeight);
   background(0);
}


// On window resize, update the canvas size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
   background(0);
}


function draw() {
 
  strokeWeight(5);

 
  for (let i=0; i < 100; i++) group.push(createAgent());

  
  for (let agent of group) {
    let x = agent.position.x;
    let y = agent.position.y;

    let v = new p5.Vector();

    v.x = map(noise(x * res, y * res, 1), 0, 1, -1, 1);
    v.y = map(noise(x * res, y * res, 10), 0, 1, -1, 1);
  
    agent.velocity.add(v);
    agent.velocity.mult(damping);
    
    move(agent);

    stroke(agent.color);
    if (agent.lifespan % 1 == 0) point(x, y);
  }
  
  cleanUp(group);
  
  //drawNoiseField();
}

function cleanUp(group) { 
  for (let i=group.length-1; i >= 0; i--) {
    // splice removes objects from an array 
    if (group[i].lifespan <= 0) group.splice(i, 1);  
  } 
}


function createAgent() {
  let temp = {
    position: new p5.Vector(random(frameW, width-frameW), random(frameH, height-frameH)),
    velocity: new p5.Vector(),
    lifespan: 512, 
    color: 0,
  };

  let sx = map(temp.position.x, 0, width, 0, img.width);
  let sy = map(temp.position.y, 0, height, 0, img.height); 
  temp.color = color(img.get(sx, sy)); 
  temp.color.setAlpha(transparency);
  
  return temp;
}

function move(agent) {
  agent.position.add(agent.velocity);
  agent.lifespan--; 
}

function drawNoiseField() {
  strokeWeight(1);
  rectMode(CENTER);
  for (let x = 0; x < width; x += grid) {
    for (let y = 0; y < height; y += grid) {
      push();
      translate(x + grid / 2, y + grid / 2);

      let v = new p5.Vector();

      v.x = map(noise(x * res, y * res, 1), 0, 1, -1, 1);
      v.y = map(noise(x * res, y * res, 10), 0, 1, -1, 1);

      v.mult(grid * 2);

      stroke(255);
      line(0, 0, v.x, v.y);

      pop();
    }
  }
}
