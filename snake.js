function snakeBorders() {
	if (snakeHeadX < 0) {
		snakeHeadX = cols * blockSize;
	}
	if (snakeHeadX > cols * blockSize) {
		snakeHeadX = 0;
	}
	if (snakeHeadY < 0) {
		snakeHeadY = rows * blockSize;
	}
	if (snakeHeadY >rows * blockSize) {
		snakeHeadY = 0;
	}
}

function updateBoard() {
	if (gameOver) {
		return;
	}

	// draw board
	context.fillStyle = "black";
	context.fillRect(0, 0, board.width, board.height);

	// draw food
	context.fillStyle = "red";
	context.fillRect(foodX, foodY, blockSize, blockSize);
	if (snakeHeadX == foodX && snakeHeadY == foodY) {
		color -= 10;
		snake.push([foodX, foodY, `rgb(0, ${color}, 0)`]);
		scoreValue++;
		score = document.getElementById("score");
		score.textContent = "Score: " + scoreValue;
		document.set
		placeFood();
	}
	// draw snake
	// draw snake head
	for (let i = snake.length - 1; i > 0; i--) {
		// the tail is following the head
		snake[i][0] = snake[i - 1][0];
		snake[i][1] = snake[i - 1][1];
	}
	if (snake.length) {
		// tail blocks overwritte the head, so the head must be replaced
		snake[0] = [snakeHeadX, snakeHeadY, "lime"];
	}
	context.fillStyle = "lime";
	snakeHeadX += snakeDirectionX * blockSize;	// replace head on X
	snakeHeadY += snakeDirectionY * blockSize;	// replace head on Y
	snakeBorders();
	context.fillRect(snakeHeadX, snakeHeadY, blockSize, blockSize);
	for (let i = 0; i < snake.length; i++) {
		if (snakeHeadX == snake[i][0] && snakeHeadY == snake[i][1]) {
			gameOver = true;
			alert("Game over!");
		}
		context.fillStyle = snake[i][2];
		context.fillRect(snake[i][0], snake[i][1], blockSize, blockSize);
	}
}

function placeFood() {
	foodX = Math.floor(Math.random() * rows) * blockSize;
	foodY = Math.floor(Math.random() * cols) * blockSize;
}

function placeSnake() {
	snakeHeadX = Math.floor(Math.random() * rows) * blockSize;
	snakeHeadY = Math.floor(Math.random() * cols) * blockSize;
}

function changeDirection(event) {
	switch (event.code) {
		case "ArrowUp":
			if (snakeDirectionY != 1) {
				snakeDirectionX = 0;	// choose Y not X
				snakeDirectionY = -1;	// go up on Y
			}
			break;
		case "ArrowDown":
			if (snakeDirectionY != -1) {
				snakeDirectionX = 0;		// choose Y not X
				snakeDirectionY = 1;		// go down on Y
			}
			break;
		case "ArrowLeft":
			if (snakeDirectionX != 1) {
				snakeDirectionX = -1;		// go left on X
				snakeDirectionY = 0;		// // choose X not Y
			}
			break;
		case "ArrowRight":
			if (snakeDirectionX != -1) {
				snakeDirectionX = 1;		// go right on X
				snakeDirectionY = 0;		// choose X not Y
			}
			break;
	}
}

// Variabilele 'globale'
// board
const rows = 20;			// data from the previous page
const cols = 20;			// data from the previous page
const blockSize = 25;

var board;				// board (matrix)
var context;			// canvas context in which the drawings are made

// snake parts
var snakeHeadX;
var snakeHeadY;
var snake = [];			// array of coordinates

// food parts
var foodX;
var foodY;

// snake directions
var snakeDirectionX = 0;
var snakeDirectionY = 0;

// other variables
var color = 255;
var gameOver = false;
var scoreValue = 0;

// when the page is loaded, this function will run first
window.onload = function() {
	// set context: the board recieved the 'board' element form html
	board = document.getElementById("board");
	board.height = rows * blockSize;
	board.width = cols * blockSize;

	// enable drawing on the context
	context = board.getContext("2d");

	// initialize the food coordinates
	placeFood();

	// initialize the snake (head) coordinates
	placeSnake();

	// add keys events
	// keyup waits until the key is released. Only then the function changeDirection will be called
	document.addEventListener("keyup", changeDirection);

	// the function which redraws the board at every 100 ms
	setInterval(updateBoard, 100);
}