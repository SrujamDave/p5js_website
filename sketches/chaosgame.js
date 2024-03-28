function chaosGame(p) {
	//Canvas dimensions
	let height;
	let width;

	//Global variables controlling the different parts of the chaos game:

	//The point that hops around the screen
	let movingPoint

	//Points that the moving point hops towards
	let attractorPointList;
	let pointNum;

	//The index of the point that movingPoint hops towards each frame
	let randomPointIndex;

	//Boolean, determines if movingPoint can move towards the same point
	//twice in a row - changes how the final sketch looks
	let doubleSelect;

	//The fraction of the total distance movingPoint moves towards
	let jumpProportion;

	//Sets up the different attributes of the chaos game, both when page
	//loads and when user clicks the sketch
	function setupGame() {
		p.clear();

		//Randomly picks 3-8 points evenly spaced in a circle and adds
		//them to the attractorPointList
		radius = width * 0.45;
		pointNum = Math.ceil(Math.random() * 6) + 2;
		attractorPointList = [];
		for (i = 0; i < pointNum; i++) {
			let angle = 3.1415 * 2 * i / pointNum - 3.1415 / 2;
			attractorPointList.push(p.createVector(Math.cos(angle)
				* radius, Math.sin(angle) * radius));
		}

		//Picks a random point in attractorPointList for the first point
		randomPointIndex = Math.floor(Math.random() 
			* attractorPointList.length);

		//Picks a random point anywhere on the sketch
		movingPoint = p.createVector(
			Math.floor((Math.random() - 0.5) * width),
			Math.floor((Math.random() - 0.5) * height));
		
		//If there's three points in attractorPointList, 
		//doubleSelect is true. If there's more, pick randomly
		doubleSelect = (pointNum == 3) ? true :
			[true, false][Math.floor(Math.random() * 2)];

		jumpProportion = (doubleSelect) ? (pointNum / (pointNum + 3)) : 0.6;
	}

	//Sets up the canvas
	p.setup = function() {
		width = window.innerWidth / 5;
		height = width;
		let chaosCanvas = p.createCanvas(width, height);
		chaosCanvas.parent("chaos-game");

		//sets up the game when page loads, resets when page clicked
		chaosCanvas.mouseClicked(setupGame);
		setupGame();
	}

	//Moves the movingPoint around the screen each frame
	p.draw = function() {
		//Set up canvas
		p.translate(width/2, height/2);
		for(let i=0; i < pointNum; i++) {
			p.strokeWeight(4);
			p.stroke(128, 128, 128);
			p.point(attractorPointList[i]);
		}
		p.strokeWeight(1);
		p.stroke(256, 256, 256);
		p.point(movingPoint);

		//Randomly picks a point for movingPoint to move towards
		//depending on value of doubleSelect
		if (doubleSelect) {
			randomPointIndex = Math.floor(Math.random() * 
				attractorPointList.length);
		} else {
			let newIndex = Math.floor(Math.random() * (attractorPointList.length-1));
			if (newIndex >= randomPointIndex) {
				randomPointIndex = newIndex + 1;
			} else {
				randomPointIndex = newIndex;
			}
		}

		//Moves movingPoint
		let randomPoint = attractorPointList[randomPointIndex];
		let jump = p.createVector(randomPoint.x - movingPoint.x, randomPoint.y - movingPoint.y);
		jump.mult(jumpProportion);
		movingPoint.add(jump);
	}

	//Resizes canvas when window is resized
	p.windowResized = function() {
		width = window.innerWidth / 5;
		p.resizeCanvas(width, width);
	}
}

let chaosGameSketch = new p5(chaosGame);
