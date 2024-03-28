function flocking(p) {
  
  //Dimensions of canvas
  let width = window.innerWidth / 5;
  let height = width;

  //Contains methods moving boids around the screen and calculating the
  //direction of each
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
    
    //Draws boid
    show() {
      p.strokeWeight(5);
      p.stroke(this.color);
      p.point(this.position);
    }

    //Moves the boid depending on its velocity, wraps to other side of screen
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

    //Calculates direction of boid depending on:
    //  moving towards center of mass of other boids nearby
    //  going the same direction as other boids nearby
    //  staying evenly spaced towards other boids nearby
    updateAcceleration(boids) {
      let avgPos = p.createVector();
      let alignment = p.createVector();
      let separation = p.createVector();

      let neighborCount = 0;

      //Finds nearby boids, calculates contribution to acceleration
      for (let other of boids) {
        let d = p.dist(this.position.x, this.position.y, 
	  other.position.x, other.position.y);
          
        if (d < 10 && d != 0) {
          let separationContribution = p.createVector(
            this.position.x - other.position.x,
            this.position.y - other.position.y);
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

      //Adds different contributions to the acceleration of each boid
      //and normalizes acceleration
      this.acceleration = p.createVector(0, 0);
      this.acceleration.add(alignment.normalize().mult(3.5));
      this.acceleration.add(separation.normalize().mult(5));
      this.acceleration.add(cohesion.normalize().mult(1));
      this.acceleration.normalize().mult(this.maxAcceleration);
    }
  }

  let flock;

  //Generates a bunch of boids and adds it to the flock
  function setupGame() {
    p.clear();
    flock = [];

    for (var i = 0; i < 100; i++) {
      flock.push(new Boid());
      flock[i].position = p.createVector(Math.random() * width, Math.random() * height);
      flock[i].velocity = p.createVector(Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
    }
  }

  //Sets up canvas, sets up flock, resets if mouse is clicked
  p.setup = function() {
    width = window.innerWidth / 5;
    height = width;

    let flockingCanvas = p.createCanvas(width, height);
    flockingCanvas.parent("flocking-parent");

    flockingCanvas.mouseClicked(setupGame);
    setupGame();
  }
  
  //Moves each boid and calculates its acceleration for each frame
  p.draw = function() {
    p.clear();

    for (let boid of flock) {
      boid.move();
      boid.show();
      boid.updateAcceleration(flock);
    }

  }

  //If window is resized
  p.windowResized = function() {
    p.clear();
    let width = window.innerWidth / 5;
    p.resizeCanvas(width, width);
  }
}

let flockingSketch = new p5(flocking);
