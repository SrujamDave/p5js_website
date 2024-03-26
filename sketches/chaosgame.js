function chaosGame(p) {
	let height;
	let width;

	let attractorPointList;
	let pointNum;
	let movingPoint;
	let randomPointIndex;
	let doubleSelect;
	let jumpProportion;


	function setupGame() {
		p.clear();

		radius = width * 0.45;
		pointNum = Math.ceil(Math.random() * 6) + 2;
		attractorPointList = [];

		for (i = 0; i < pointNum; i++) {
			let angle = 3.1415 * 2 * i / pointNum - 3.1415 / 2;
			attractorPointList.push(p.createVector(Math.cos(angle) * radius, Math.sin(angle) * radius));
		}

		randomPointIndex = Math.floor(Math.random() * attractorPointList.length)
		movingPoint = p.createVector(Math.floor((Math.random() - 0.5) * width), Math.floor((Math.random() - 0.5) * height));
		
		doubleSelect = (pointNum == 3) ? true :[true, false][Math.floor(Math.random() * 2)];
		jumpProportion = (doubleSelect) ? (pointNum / (pointNum + 3)) : 0.6;
	}

	p.setup = function() {
		width = window.innerWidth / 5;
		height = width;
		let chaosCanvas = p.createCanvas(width, height);
		chaosCanvas.parent("chaos-game");
		chaosCanvas.mouseClicked(setupGame);

		setupGame();
	}

	p.draw = function() {
		p.translate(width/2, height/2);
		for(let i=0; i < pointNum; i++) {
			p.strokeWeight(4);
			p.stroke(128, 128, 128);
			p.point(attractorPointList[i]);
		}

		p.strokeWeight(1);
		p.stroke(256, 256, 256);
		p.point(movingPoint);

		if (doubleSelect) {
			randomPointIndex = Math.floor(Math.random() * attractorPointList.length);
		} else {
			let newIndex = Math.floor(Math.random() * (attractorPointList.length-1));
			if (newIndex >= randomPointIndex) {
				randomPointIndex = newIndex + 1;
			} else {
				randomPointIndex = newIndex;
			}
		}

		let randomPoint = attractorPointList[randomPointIndex];

		let jump = p.createVector(randomPoint.x - movingPoint.x, randomPoint.y - movingPoint.y);
		jump.mult(jumpProportion);

		movingPoint.add(jump);
	}

	p.windowResized = function() {
		width = window.innerWidth / 5;
		p.resizeCanvas(width, width);
	}
}

let chaosGameSketch = new p5(chaosGame);
