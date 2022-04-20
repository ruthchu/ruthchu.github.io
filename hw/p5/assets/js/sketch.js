let flowers= [];


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  for (let i=0; i<flowers.length; i++){
  sakura(flowers[i].x, flowers[i].y, flowers[i].dim);
  }
}

function mousePressed(){
    let size = random(25, 50);
    let newpetal={
    x: mouseX,
    y: mouseY,
    dim: size,
    }
    flowers.push (newpetal);
}

function sakura(x, y, size) {
  noStroke();
  let petalColor = color(255, 148, 207);
  petalColor.setAlpha(10);
  fill(petalColor);
  ellipse(x - 0.5 * size, y, size);
  ellipse(x + size * 0.6, y - 0.1 * size, size);
  ellipse(x - size * 0.3, y + size * 0.5, size);
  ellipse(x + size * 0.5, y + size * 0.5, size);
  ellipse(x, y - size * .5, size);
  fill(color(255, 230, 243));
  ellipse(x, y, size * .4);
}