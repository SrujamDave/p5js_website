var gameOfLife = function(p) {
	//Canvas dimensions
	let width;
	let height;

	//Outlines rows and columns in grid
	let columns = 40;
	let rows = 40;
	let padding = 1;

	//Stores which cells are dead and alive
	let lifeArray;

	//Dimensions of each cell calculated based on number of rows/cols
	//and the size of the canvas
	let squareWidth;
	let squareHeight;

	//Randomly fills up the grid with living and dead cells
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

	//Draws the cells in black and white depending if they're alive or dead
	function drawLife() {
		for (i = 0; i < rows; i++) {
			let currentRow = lifeArray[i + 1];

			for(j = 0; j < columns; j++) {
				if (currentRow[j + 1] == 1) {
					p.fill(256, 256, 256);
					p.rect(j * squareWidth + padding, 
						i * squareHeight + padding,
						squareWidth - 2 * padding,
						squareHeight - 2 * padding);
				} 
			}
		}
	}

	//Updates the cells' status based on Conway's rules
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

				if (lifeArray[i][j] == 1 && 
					(neighborCount == 2 
					|| neighborCount == 3)) {
					currentRow.push(1);
				} else if (lifeArray[i][j] == 0 && 
					neighborCount == 3) {
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

	//Sets up canvas, initializes/resets canvas by populating grid
	p.setup = function () {
		width = window.innerWidth / 5;
		height = width;

		let lifeCanvas = p.createCanvas(width, height);
		lifeCanvas.parent("gameoflife");
		lifeCanvas.mouseClicked(populateGrid);

		squareWidth = width / columns;
		squareHeight = height / rows;

		populateGrid();
	}

	//Draws/redraws cells, updates grid
	p.draw = function () {
		p.clear();
		p.frameRate(7);

		drawLife();
		updateLife();
	}

	//Resizes canvas if grid dimensions changed
	p.windowResized = function() {
		let size = window.innerWidth / 5;
		p.resizeCanvas(size, size);

		squareWidth = width / columns;
		squareHeight = height / rows;
	}
}

let gameOfLifeSketch = new p5(gameOfLife);

