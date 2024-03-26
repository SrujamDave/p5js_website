var gameOfLife = function(p) {
    let width;
    let height;

	let columns = 40;
	let rows = 40;
	let padding = 1;

	let lifeArray;

	let squareWidth;
	let squareHeight;

	function populateGrid() {
		lifeArray =[];

		lifeArray.push(Array(columns + 2).fill(0));

		for (i = 0; i < rows; i++) {
			let currentRow = [];
			currentRow.push(0);
			for(j = 0; j < columns; j++) {
				currentRow.push(Math.floor(Math.random() * 2));
			}
			currentRow.push(0);
			lifeArray.push(currentRow);
		}
		lifeArray.push(Array(columns + 2).fill(0));
	}

	function drawLife() {
		for (i = 0; i < rows; i++) {
			let currentRow = lifeArray[i + 1];

			for(j = 0; j < columns; j++) {
				if (currentRow[j + 1] == 1) {
					p.fill(256, 256, 256);
					p.rect(j * squareWidth + padding, i * squareHeight + padding, 
					squareWidth - 2 * padding, squareHeight - 2 * padding);
				} 
			}
		}
	}

	function updateLife() {
		updatedLifeArray = [];
		counter = 0;
		updatedLifeArray.push(Array(columns + 2).fill(0));

		for (i = 1; i < (rows+1); i++) {
			let currentRow = [];
			currentRow.push(0);
			for(j = 1; j < (columns+1); j++) {
				neighborCount = lifeArray[i-1][j-1] + 
				lifeArray[i-1][j] + 
				lifeArray[i-1][j+1] + 
				lifeArray[i][j-1] + 
				lifeArray[i][j+1] + 
				lifeArray[i+1][j-1] + 
				lifeArray[i+1][j] + 
				lifeArray[i+1][j+1];

				if (lifeArray[i][j] == 1 && (neighborCount == 2 || neighborCount == 3)) {
					currentRow.push(1);
				} else if (lifeArray[i][j] == 0 && neighborCount == 3) {
					currentRow.push(1);
				} else {
					currentRow.push(0);
				}
			}
			currentRow.push(0);
			updatedLifeArray.push(currentRow);
		}
		updatedLifeArray.push(Array(columns + 2).fill(0));
		lifeArray = updatedLifeArray;
	}

	function resetCanvas() {
		populateGrid();
	}

	p.setup = function () {
		width = window.innerWidth / 5;
		height = width;

		let lifeCanvas = p.createCanvas(width, height);
		lifeCanvas.parent("gameoflife");
		lifeCanvas.mouseClicked(resetCanvas);

		squareWidth = width / columns;
		squareHeight = height / rows;

		populateGrid();
	}

	p.draw = function () {
		p.clear();
		p.frameRate(7);

		drawLife();
		updateLife();
	}

	p.windowResized = function() {
		let size = window.innerWidth / 5;
		p.resizeCanvas(size, size);

		squareWidth = width / columns;
		squareHeight = height / rows;
	}
}

let gameOfLifeSketch = new p5(gameOfLife);

