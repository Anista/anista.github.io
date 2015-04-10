"use strict";

$(window).load(function() {
	var $load_screen = $(".load-screen");
	$load_screen.fadeOut(2000, function() {
		$load_screen.remove()
	});
});

(function() {

	function Guessing(node) {
		this.game = node;
		// buttons
		this.playButton = this.game.querySelector('#play');
		this.tryButton = this.game.querySelector('#try');
		this.escButton = this.game.querySelector('#esc');
		this.againButton = this.game.querySelector('#again');
		//
		this.playing = this.game.querySelector('.playing');
		this.inputForm = this.game.querySelector('.input-form');
		this.userInput = this.game.querySelector('#userInput');
		// changing fields
		this.hint = this.game.querySelector('.hint');
		this.attemptsNumber = this.game.querySelector('#attemptsNumber');
		this.events = this.events();
		this.thinkOfNumber = 0;
		// attempts
		this.NUMBER_OF_ATTEMPTS = 10;
		// messages
		this.message = "";
		this.messages = ["I'm thinking of a number between 0 and 50. Try to guess it!",
			"You win! Congratulations!",
			"Reached the limit of attempts. You lost!",
			"You lost! You run away!",
			"Enter the integer number between 0 and 50",
			"Warmer",
			"Colder"
		];
		this.gameFinished = false;
		this.gameStarted = false;
	};
	Guessing.prototype.events = function() {
		this.playButton.addEventListener('click', this.startPlay.bind(this), false);
		this.tryButton.addEventListener('click', this.play.bind(this), false);
		this.escButton.addEventListener('click', this.gameOver.bind(this), false);
		this.againButton.addEventListener('click', this.startPlay.bind(this), false);
		document.addEventListener('keydown', this.keyEvent.bind(this), false);
	};
	Guessing.prototype.startPlay = function() {
		this.gameStarted = true;
		this.currentAttemptNumber = 1;
		//gap between inputNumber/previousNumber and think of number
		this.gap = 0;
		this.previousGap = 0;
		//
		this.userNumber = 0;
		this.previousUserNumber = 0;
		this.gameFinished = false;
		this.userInput.value = '';
		this.playButton.style.display = 'none';
		this.playing.style.display = 'block';
		this.inputForm.style.display = 'block';
		this.tryButton.style.display = 'inline-block';
		this.escButton.style.display = 'inline-block';
		this.againButton.style.display = 'none';
		this.userInput.focus();
		this.message = this.messages[0];
		this.createMessage(this.message, this.NUMBER_OF_ATTEMPTS);
		this.thinkOfNumber = Math.floor(Math.random() * 51);
	};
	Guessing.prototype.play = function() {
		this.userNumber = parseInt(this.userInput.value, 10);
		this.gap = Math.abs(this.userNumber - this.thinkOfNumber);
		this.previousGap = Math.abs(this.previousUserNumber - this.thinkOfNumber) || (Infinity - this.thinkOfNumber);
		if (this.gameFinished) {
			return;
		}
		if (this.userNumber === this.thinkOfNumber) {
			this.message = this.messages[1];
			this.gameFinished = true;
			this.gameOver(this.message);
		} else if (this.currentAttemptNumber === this.NUMBER_OF_ATTEMPTS) {
			//reached the limit of attempts
			this.message = this.messages[2];
			this.gameOver(this.message);
		} else if (isNaN(this.userNumber) || this.userNumber > 50 || this.userNumber < 0) {
			this.message = this.messages[4];
		} else if (this.gap <= this.previousGap) {
			//warmer or colder
			this.message = this.messages[5];
		} else {
			this.message = this.messages[6];
		}

		console.log('userNumber', this.userNumber, 'thinkOfNumber', this.thinkOfNumber, 'currentAttemptNumber', this.currentAttemptNumber);
		this.createMessage(this.message);
		if (this.currentAttemptNumber >= this.NUMBER_OF_ATTEMPTS) {
			this.gameFinished = true;
			return;
		}
		this.currentAttemptNumber += 1;
		this.previousUserNumber = this.userNumber;
		this.userInput.value = '';
	};
	Guessing.prototype.gameOver = function(message) {
		if (message) {
			this.createMessage(message);
		}
		this.gameStarted = false;
		this.gameFinished = true;
		this.createMessage(this.messages[3]);
		this.inputForm.style.display = 'none';
		this.tryButton.style.display = 'none';
		this.escButton.style.display = 'none';
		this.againButton.style.display = 'block';
	};
	Guessing.prototype.createMessage = function(message, att) {
		this.hint.textContent = message;
		if (att) {
			this.attemptsNumber.textContent = att;
		} else {
			this.attemptsNumber.textContent = this.NUMBER_OF_ATTEMPTS - this.currentAttemptNumber;
		}
	};

	Guessing.prototype.keyEvent = function(event) {
		var key = event.keyCode;
		if (key === 13) {
			event.preventDefault(); //enter
			if (!this.gameStarted) {
				this.startPlay();
			} else {
				this.play();
			}
		}
		if (key === 27) {
			event.preventDefault(); //esc
			if (!this.gameFinished) {
				this.gameOver(this.messages[3]);
			}
		}
	};
	window.Guessing = Guessing;
})()