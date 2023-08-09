// Initialization
let gameSeq = [];
let userSeq = [];
// Game status
let started = false;
let level = 0;
let highScore = 0;
//  DOM elements
let h2 = document.querySelector('h2');
// Button colors
const buttonColors = ['red', 'green', 'yellow', 'purple'];
// Start the game
// Start button click
// let startBtn = document.querySelector('#start');
document.addEventListener('keypress', function () {
	// Check if the game has started
	if (!started) {
		console.log('Game started');
		started = true;
		// Level up and flash the button
		levelUp();
	}
	// // Change the start button to reset button
	// let resetBtn = document.querySelector('#start');
	// resetBtn.innerHTML = 'Reset';
	// resetBtn.style.backgroundColor = 'red';
	// resetBtn.addEventListener('click', function () {
	// 	// Reset the game
		// reset();
	// 	// Change the reset button to start button
	// 	let startBtn = document.querySelector('#start');
	// 	startBtn.innerHTML = 'Start';
	// 	startBtn.style.backgroundColor = 'green';
	});
// });
// Button Flash
function btnFlash(btn) {
	btn.classList.add('flash');
	setTimeout(() => {
		btn.classList.remove('flash');
	}, 250);
}
// User click
function levelUp() {
	// Reset the user sequence
	userSeq = [];
	// Level up
	level++;
	h2.innerText = `Level ${level}`;
	// Random button choose
	let randomIdx = Math.floor(Math.random() * 3);
	let randomColor = buttonColors[randomIdx];
	let randomBtn = document.querySelector(`.${randomColor}`);
	// Add the color to the game sequence
	gameSeq.push(randomColor);
	// Flash the button
	btnFlash(randomBtn);
}

function checkAns(idx) {
	// Check if the user has clicked the correct button
	if (userSeq[idx] === gameSeq[idx]) {
		// Check if the user has finished the sequence
		if (userSeq.length == gameSeq.length) {
			setTimeout(levelUp, 1000);
		}
	} else {
		// Game over
		highScore = checkHighScore(level);
		h2.innerHTML = `Game Over! Your Score: <b>${level}</b> <br> <b>High Score: ${highScore}</b> <br> Press any key to restart the game`;
		// Flash the screen red
		document.querySelector('body').style.backgroundColor = 'red';
		setTimeout(function () {
			document.querySelector('body').style.backgroundColor = 'antiquewhite';
		}, 100);
		// Reset the game
		reset();
	}
}

// Button click
function btnPress() {
	let btn = this;
	btnFlash(btn);
	// Get the color of the button
	userColor = btn.getAttribute('id');
	userSeq.push(userColor);
	// Check the answer
	checkAns(userSeq.length - 1);
}

// Get all the buttons
let allBtns = document.querySelectorAll('.btn');
// Add event listener to all the buttons
for (btn of allBtns) {
	btn.addEventListener('click', btnPress);
}

// Check and update high score
function checkHighScore(score) {
	if (score > highScore) {
		highScore = score;
	}
	return highScore;
}

// Reset the game
function reset() {
	started = false;
	level = 0;
	gameSeq = [];
	userSeq = [];
}
