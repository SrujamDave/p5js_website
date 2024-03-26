function flocking(p) {
  let width = window.innerWidth / 5;
  let height = width;


  class Boid {
    constructor() {
      this.position = p.createVector();
      this.velocity = p.createVector();
      this.acceleration = p.createVector();
      this.color = [0, 0, 256]
      this.maxAcceleration = 0.2;
      this.maxSpeed = 1;
      this.community = [];
    }

    show() {
      p.strokeWeight(5);
      p.stroke(this.color);
      p.point(this.position);
    }

    move() {
      if (this.position.x > width) {
        this.position.x = 0;
      } else if (this.position.x < 0) {
        this.position.x = width;
      }

      if (this.position.y > height) {
        this.position.y = 0;
      } else if (this.position.y < 0) {
        this.position.y = height;
      }

      this.position.add(this.velocity);
      this.velocity.add(this.acceleration).normalize() * 10;
    }

    updateAcceleration(boids) {
      let avgPos = p.createVector();
      let alignment = p.createVector();
      let separation = p.createVector();

      let neighborCount = 0;

      for (let other of boids) {
        let d = p.dist(this.position.x, this.position.y, other.position.x, other.position.y);
          
        if (d < 10 && d != 0) {
          let separationContribution = p.createVector(this.position.x - other.position.x, this.position.y - other.position.y);
          separation.add(separationContribution);
        } else if (d < 100 && d != 0) {
          avgPos.add(other.position);
          alignment.add(other.velocity);
          neighborCount++;
        }
      }
      if (neighborCount != 0) {
        avgPos.div(neighborCount); 
      }
      let cohesion = avgPos.sub(this.position);

      this.acceleration = p.createVector(0, 0);
      this.acceleration.add(alignment.normalize().mult(3.5));
      this.acceleration.add(separation.normalize().mult(5));
      this.acceleration.add(cohesion.normalize().mult(1));



      this.acceleration.normalize().mult(this.maxAcceleration);
    }
  }

  let flock = [];


  p.setup = function() {
    width = window.innerWidth / 5;
    height = width;

    let flockingCanvas = p.createCanvas(width, height);
    flockingCanvas.parent("flocking-parent");

    for (var i = 0; i < 100; i++) {
      flock.push(new Boid());
      flock[i].position = p.createVector(Math.random() * width, Math.random() * height);
      flock[i].velocity = p.createVector(Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
    }
  }

  p.draw = function() {
    p.clear();

    for (let boid of flock) {
      boid.move();
      boid.show();
      boid.updateAcceleration(flock);
    }

  }

  p.windowResized = function() {
    p.clear();
    let width = window.innerWidth / 5;
    p.resizeCanvas(width, width);
  }
}

let flockingSketch = new p5(flocking);