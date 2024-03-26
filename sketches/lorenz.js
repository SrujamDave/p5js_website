var lorenz = function(p) {
  let width;
  let height;

  let dt = 0.005;
  let sigma = 10;
  let rho = 28;
  let beta = 8.0 / 3.0;

  let x1;
  let y1; 
  let z1;

  let x2; 
  let y2;
  let z2;

  function resetAttractor() {
    p.clear();

    x1 = Math.floor(Math.random() * width/10.0) - width/20.0;
    y1 = Math.floor(Math.random() * height/10.0) - height/20.0;
    z1 = 3;

    x2 = x1;
    y2 = y1;
    z2 = 5;
  }

  p.setup = function() {
    width = window.innerWidth / 5;
    height = width;

    let circleCanvas = p.createCanvas(width, height);
    circleCanvas.parent("lorenz-parent");
    circleCanvas.mouseClicked(resetAttractor);

    resetAttractor();
  }

  p.draw = function() {
    p.noStroke();
    p.translate(width/2, height/2);

    x1 += (sigma * (y1-x1)) * dt;
    y1 += (x1 * (rho - z1) - y1) * dt;
    z1 += (x1 * y1 - beta * z1) * dt;

    p.fill(0, 0, 256);
    p.ellipse(x1*5, y1*5, 2, 2);

    x2 += (sigma * (y2-x2)) * dt;
    y2 += (x2 * (rho - z2) - y2) * dt;
    z2 += (x2 * y2 - beta * z2) * dt;

    p.fill(256, 0, 256);
    p.ellipse(x2*5, y2*5, 2, 2);
  }

  p.windowResized = function() {
    p.clear();
    let width = window.innerWidth / 5;
    p.resizeCanvas(width, width);
  }
}

let lorenzSketch = new p5(lorenz);