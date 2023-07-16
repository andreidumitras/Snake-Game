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

	// desenam board
	context.fillStyle = "black";
	context.fillRect(0, 0, board.width, board.height);

	// desenam mancare
	context.fillStyle = "red";
	context.fillRect(foodX, foodY, blockSize, blockSize);
	if (snakeHeadX == foodX && snakeHeadY == foodY) {
		color -= 10;
		// snake.push([foodX, foodY, `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`]);
		snake.push([foodX, foodY, `rgb(0, ${color}, 0)`]);
		scoreValue++;
		score = document.getElementById("score");
		score.textContent = "Score: " + scoreValue;
		document.set
		placeFood();
	}
	// desenam sarpe
	// desenam corp sarpe
	for (let i = snake.length - 1; i > 0; i--) {
		snake[i][0] = snake[i - 1][0];				// blocurile de la coada urmaresc capul
		snake[i][1] = snake[i - 1][1];				// blocurile de la coada urmaresc capul
	}
	if (snake.length) {
		snake[0] = [snakeHeadX, snakeHeadY, "lime"];	// blocurile de la coada, au suprascris capul, asa ca urmeaza capul sa fie repozitionat
	}
	context.fillStyle = "lime";
	snakeHeadX += snakeDirectionX * blockSize;	// repozitionarea capului pe X
	snakeHeadY += snakeDirectionY * blockSize;	// repozitionarea capului pe Y
	snakeBorders();
	context.fillRect(snakeHeadX, snakeHeadY, blockSize, blockSize);
	for (let i = 0; i < snake.length; i++) {
		// context.fillStyle = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
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
				snakeDirectionX = 0;	// mergem pe Y nu pe X
				snakeDirectionY = -1;	// mergem in SUS pe Y
			}
			break;
		case "ArrowDown":
			if (snakeDirectionY != -1) {
				snakeDirectionX = 0;		// mergem pe Y nu pe X
				snakeDirectionY = 1;		// mergem in JOS pe Y
			}
			break;
		case "ArrowLeft":
			if (snakeDirectionX != 1) {
				snakeDirectionX = -1;	// mergem in STANGA pe X
				snakeDirectionY = 0;		// mergem pe X nu pe Y
			}
			break;
		case "ArrowRight":
			if (snakeDirectionX != -1) {
				snakeDirectionX = 1;		// mergem in DREAPTA pe X
				snakeDirectionY = 0;		// mergem pe X nu pe Y
			}
			break;
		// case "S":
		// 	speed++;
		// 	break;
		// case "A":
		// 	speed--;
		// 	break;
	}
}

// Variabilele 'globale'
// board
const rows = 20;			// date din fereastra anterioara
const cols = 20;			// date din fereastra anterioara
const blockSize = 25;

var board;				// plansa (matricea)?
var context;			// contextul de canvas in care se va desena

// sarpele
var snakeHeadX;
var snakeHeadY;
var snake = [];			// array de coordonate

// mancaree
var foodX;
var foodY;

// directie sarpe
var snakeDirectionX = 0;
var snakeDirectionY = 0;

// viteza sarpe
// var speed = 1;

var color = 255;

var gameOver = false;

var scoreValue = 0;

// cand fereastra se incarca, se executa functia.
window.onload = function() {
	// setam contextul pentru board: board primeste elementul din html, denumit intuitiv 'board'
	board = document.getElementById("board");
	board.height = rows * blockSize;
	board.width = cols * blockSize;

	// setam contextul pentru a desena pe board
	context = board.getContext("2d");

	// coordonatele initiale pt mancare
	placeFood();

	// coordonatele initiale pt sarpe
	placeSnake();

	// adauga raspuns la comenzi:
	// keyup va astepta pana se ridica tasta si atunci va executa functia changeDirection
	document.addEventListener("keyup", changeDirection);

	// functia care redeseneaza tabla
	setInterval(updateBoard, 100); 		// la fiecare 100 ms redeseneaza board-ul
}