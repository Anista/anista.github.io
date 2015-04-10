'use strict';

(function() {
	function StopWatch(node) {
		this.node = node;
		this.createStopWatch = this.createStopWatch();
		this.startTime = 0;
		this.stopwatchTime = 0;
		this.laps = [];

		this.timeIndicator = this.node.querySelector('.stopwatch-current');
		this.startStopButton = this.node.querySelector('.btn-primary');
		this.lapButton = this.node.querySelector('.btn-info');
		this.resetButton = this.node.querySelector('.btn-danger');
		this.lapsList = this.node.querySelector('.stopwatch-laps');
		this.deleteLapButton = this.node.querySelector('.label label-danger');

		this.events = this.events();
		this.currentInterval = null;
	}
	StopWatch.prototype.createStopWatch = function() {
		var container = this.node;
		var row = _createNode('div', 'row', container);
		//create first colomn
		var col_1 = _createNode('div', 'col-xs-4', row);
		var stopwatch = _createNode('h2', 'stopwatch-current', col_1);
		stopwatch.textContent = '00:00:00:000';
		var stopwatchLaps = _createNode('div', 'stopwatch-laps', col_1);
		//create second colomn
		var col_2 = _createNode('div', 'col-xs-4 stopwatch-controls', row);
		var buttonsGroup = _createNode('div', 'btn-group btn-group-lg', col_2);
		var buttonStart = _createNode('button', 'btn btn-primary', buttonsGroup);
		buttonStart.textContent = 'Start';
		var buttonLap = _createNode('button', 'btn btn-info', buttonsGroup);
		buttonLap.textContent = 'Lap';
		var buttonReset = _createNode('button', 'btn btn-danger btn-sm', col_2);
		buttonReset.textContent = 'Reset';
	};
	//create new lap and add event to delete lap
	StopWatch.prototype.createLap = function(content) {
		var lap = document.createElement('div');
		lap.className += 'alert alert-info';
		if (!this.lapsList.childNodes.length) {
			this.lapsList.appendChild(lap);
		}
		this.lapsList.insertBefore(lap, this.lapsList.childNodes[0]);
		lap.textContent = content;
		//create crossButton and add event
		var crossButton = _createNode('span', 'label label-danger', lap);
		crossButton.textContent = '×';
		crossButton.addEventListener('click', this.deleteLap.bind(this), false);
	};
	StopWatch.prototype.deleteLap = function(event) {
		event = event || window.event;
		var target = event.target || event.srcElement;
		if (target.className != 'label label-danger') return;
		target.parentNode.style.display = 'none';
	};
	//add new lap
	StopWatch.prototype.addLap = function() {
		var lapTime = this.formatTime(this.stopwatchTime);
		return this.createLap(lapTime);
	};
	//function to create every node element
	function _createNode(nodeName, className, parentNode) {
			var node = document.createElement(nodeName);
			node.className += className;
			return parentNode.appendChild(node);
		}
		// working with time
		//click button start or stop
	StopWatch.prototype.StartStop = function() {
		if (this.startStopButton.textContent === 'Start') {
			this.startStopButton.textContent = 'Stop';


			this.startTime = (new Date()).getTime();
			var _this = this;
			this.currentInterval = setInterval(function() {

				var currentTime = (new Date()).getTime();
				_this.stopwatchTime += currentTime - _this.startTime;
				_this.startTime = currentTime;
				_this.drawTime(_this.stopwatchTime);
			}, 16);
		} else {
			//if button text=stop
			this.startStopButton.textContent = 'Start';
			clearInterval(this.currentInterval);
		}
	};
	StopWatch.prototype.drawTime = function(time) {
		this.timeIndicator.textContent = this.formatTime(time);
	};
	StopWatch.prototype.formatTime = function(time) {
		var ms = time % 1000;
		time = (time - ms) / 1000;
		var s = time % 60;
		time = (time - s) / 60;
		var m = time % 60;
		time = (time - m) / 60;
		var h = time;
		return (_plusZero(h) + ':' + _plusZero(m) + ':' + _plusZero(s) + ':' + _plusZero(ms));
	};

	function _plusZero(timeElem) {
		var elem = 0;
		if (timeElem < 10) {
			elem = '0' + timeElem;
		} else {
			elem = timeElem;
		}
		return elem;
	}
	//reset
	StopWatch.prototype.resetStopWatch = function() {
		clearInterval(this.currentInterval);
		this.startStopButton.textContent = 'Start';
		this.startTime = 0;
		this.stopTime = 0;
		this.stopwatchTime = 0;
		this.laps = [];
		this.timeIndicator.textContent = '00:00:00:000';
		//remove laps		
		while (this.lapsList.hasChildNodes()) {
			this.lapsList.removeChild(this.lapsList.lastChild);
		}
	};

	//events
	StopWatch.prototype.events = function() {
		this.startStopButton.addEventListener('click', this.StartStop.bind(this), false);
		this.lapButton.addEventListener('click', this.addLap.bind(this), false);
		this.resetButton.addEventListener('click', this.resetStopWatch.bind(this), false);
		this.node.addEventListener("keydown", this.keyEvent.bind(this), false);
	};

	StopWatch.prototype.keyEvent = function(event) {
		var key = event.keyCode;
		if (key === 83) {
			event.preventDefault(); //s
			this.StartStop();
		}
		if (key === 82) {
			event.preventDefault(); //r
			this.resetStopWatch();
		}
		if (key === 76) {
			event.preventDefault(); //l
			this.addLap();
		}
	};
	window.StopWatch = StopWatch;
})()