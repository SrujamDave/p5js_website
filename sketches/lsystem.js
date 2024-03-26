function lSystem(p) {
	let width = window.innerWidth / 5;
	let height = width;

	class LSystem {
		constructor() {
			this.rules = {};
			this.word = "";
			this.seed = "X";
			this.startingPosition = p.createBe

			this.turnAngle = 0;
		}

		updateSeed(n) {
			let updatedWord = "";
			let letterArray = Object.keys(this.rules);
			let oldWord = (this.word == "") ? this.seed : this.word;

			for (let letter of oldWord) {
				if (letterArray.includes(letter)) {
					updatedWord += this.rules[letter];
				} else {
					updatedWord += letter;
				}
			}

			this.word = updatedWord;
		}
	}

	class Turtle {
		constructor() {
			this.position = p.createVector();
			this.angle = 0;
			this.jumpDistance = 0;

			this.storedPositions = [];
			this.storedAngles = [];
		}

		moveTurtle() {
			p.stroke(256,256,256);
			p.strokeWeight(0.5);

			let jumpVector = p.createVector(Math.cos(this.angle) * this.jumpDistance, Math.sin(this.angle) * this.jumpDistance);
			p.line(this.position.x, this.position.y, this.position.x + jumpVector.x, this.position.y + jumpVector.y);
			this.position.add(jumpVector);
		}

		storeTurtle() {
			let storedAngle = turtle.angle;
			let storedPosition = p.createVector(turtle.position.x, turtle.position.y);
			this.storedAngles.push(storedAngle);
			this.storedPositions.push(storedPosition);			
		}

		jumpTurtle() {
			let newAngle = this.storedAngles.pop();
			let newPosition = this.storedPositions.pop();
			turtle.angle = newAngle;
			turtle.position = newPosition;			
		}
	}

	let currentLetterIndex;
	let iterationNumber;

	let fernSystem = new LSystem();
	fernSystem.rules = {
		"X": "F-[[X]+X]+F[+FX]-X",
		"F": "FF"
	};
	fernSystem.seed = "X";
	fernSystem.turnAngle = 25;
	fernSystem.startingPosition = p.createVector(10, height);
	
	let turtle = new Turtle();
	let angleIncrement = (2 * Math.PI / 360) * fernSystem.turnAngle;

	function drawWord(drawer, currentCharacter) {
		if (currentCharacter == "A" || currentCharacter == "B" || currentCharacter == "F") {
				drawer.moveTurtle();
			} 

			if (currentCharacter == "[") {
				drawer.storeTurtle();
			} 

			if (currentCharacter == "]") {
				drawer.jumpTurtle();
			}

			if (currentCharacter == "-") {
				drawer.angle -= angleIncrement;
			} 

			if (currentCharacter == "+") {
				drawer.angle += angleIncrement;
			}
	}

	function resetTurtle(turt, lSystem) {
		turt.position = p.createVector(10, height);
		turt.jumpDistance = width/150 * (Math.pow(2, 6-iterationNumber));
		turt.angle = Math.PI * -0.375;
		currentLetterIndex = 0;
	}
	function resetLSystem(lSystem) {
		lSystem.word = "";
		iterationNumber = 0;
	}

	function resetSystem() {
		resetLSystem(fernSystem);
		resetTurtle(turtle, fernSystem);
	}

	p.setup = function () {
		width = window.innerWidth / 5;
		height = width;

		let lSystemCanvas = p.createCanvas(width, height);
		lSystemCanvas.parent("l-system");
		lSystemCanvas.mouseClicked(resetSystem);

		resetSystem();
	}

	p.draw = function() {
		while (true) {
			let currentChar = fernSystem.word[currentLetterIndex];
			if (currentLetterIndex < fernSystem.word.length) {
				drawWord(turtle, currentChar);	
				currentLetterIndex++;
			} else if (currentLetterIndex == fernSystem.word.length) {
				if (iterationNumber == 6) {
					resetSystem();
				} else {
					iterationNumber++;
					currentLetterIndex = 0;

					fernSystem.updateSeed();
					resetTurtle(turtle, fernSystem);
					p.clear();
				}
			}

			if (currentChar == "F") {
				break;
			}
		}
	}

	p.windowResized = function() {
	    let width = window.innerWidth / 5;
	    p.resizeCanvas(width, width);
	}
}

let lSystemSketch = new p5(lSystem);