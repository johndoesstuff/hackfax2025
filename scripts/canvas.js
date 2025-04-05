window.sensorData = {
	load1: [0, 0],
	load2: [0, 0],
	load3: [0, 0],
	load4: [0, 0],
	speed: [0, 0],
};

function randomData(n) {
	return Array(n).fill(0).map((e, i) => 100*(Math.random()+Math.abs(Math.sin(i/5)))/2);
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const graphColors = {"RED":"#c74440","BLUE":"#2d70b3","GREEN":"#348543","ORANGE":"#fa7e19","PURPLE":"#6042a6","BLACK":"#000000"};

let showAverage = true;
let averageDepth = 10;
let displaying = 0;

let gridlinesRendered = false;

function updateCanvasReadout(newData) {
	for (let sensor in newData) {
		window.sensorData[sensor].push(newData[sensor]);
	}

	renderCanvas();
	updateReadout();
}

function renderCanvas() {
	gridlinesRendered = false;
	ctx.setTransform(1, 0, 0, 1, 0, 0);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.scale(0.9, 0.9);
	ctx.translate(-canvas.width / 2, -canvas.height / 2);

	renderUI();

	let visibleSensors = {};
	if (displaying == 0) {
		visibleSensors.load1 = sensorData.load1;
		visibleSensors.load2 = sensorData.load2;
		visibleSensors.load3 = sensorData.load3;
		visibleSensors.load4 = sensorData.load4;
	} else if (displaying == 1) {
		visibleSensors.speed = sensorData.speed;
	}
	
	console.log(visibleSensors);

	const max = Math.max(...Object.values(visibleSensors).flat());
	let c = 0;
	for (let sensor in visibleSensors) {
		const color = Object.values(graphColors)[c % 6];
		c++;
		graphArray(visibleSensors[sensor], color, max);
	}

	c = 0;
	if (showAverage) {
		ctx.setLineDash([5, 3]);
		ctx.globalAlpha = 0.6;
		for (let sensor in visibleSensors) {
			const color = Object.values(graphColors)[c % 6];
			c++;
			graphArray(rollingAverage(visibleSensors[sensor], averageDepth), color, max);
		}
		ctx.setLineDash([]);
		ctx.globalAlpha = 1;
	}
}

function renderUI() {
	const arrowSize = 6;
	const overshoot = 16;

	ctx.moveTo(-canvas.width, canvas.height);
	ctx.strokeStyle = textColor;
	ctx.beginPath();
	ctx.lineTo(-canvas.width, canvas.height);
	ctx.lineTo(canvas.width + overshoot, canvas.height);
	ctx.moveTo(canvas.width - arrowSize + overshoot, canvas.height + arrowSize);
	ctx.lineTo(canvas.width + overshoot, canvas.height);
	ctx.lineTo(canvas.width - arrowSize + overshoot, canvas.height - arrowSize);
	ctx.stroke();

	ctx.moveTo(0, 2*canvas.height);
	ctx.beginPath();
	ctx.lineTo(0, 2*canvas.height);
	ctx.lineTo(0, -overshoot);
	ctx.lineTo(arrowSize, arrowSize - overshoot);
	ctx.lineTo(0, -overshoot);
	ctx.lineTo(-arrowSize, arrowSize - overshoot);
	ctx.stroke();

	ctx.setLineDash([5, 3]);
	ctx.beginPath();
	ctx.strokeStyle = backgroundSecondaryColor;

	ctx.moveTo(canvas.width, canvas.height);
	ctx.lineTo(canvas.width, canvas.height);
	ctx.lineTo(canvas.width, 0);
	ctx.stroke();
	ctx.setLineDash([]);
}

function renderGridlines(xStep, yStep) {
	if (gridlinesRendered) return;
	gridlinesRendered = true;
	ctx.strokeStyle = '#ccc';
	ctx.lineWidth = 0.5;

	for (let x = xStep; x < canvas.width; x += xStep) {
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, canvas.height);
		ctx.stroke();
	}

	for (let y = yStep; y < canvas.height; y += yStep) {
		ctx.beginPath();
		ctx.moveTo(0, canvas.height-y);
		ctx.lineTo(canvas.width, canvas.height-y);
		ctx.stroke();
	}
	ctx.lineWidth = 1;
}

function renderGridLabels(xStep, yStep, xJump, yJump) {
	ctx.fillStyle = '#666';
	ctx.font = '12px JetbrainsMono, monospace';
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';

	// X-axis labels (bottom)
	for (let x = xStep; x < canvas.width; x += xStep) {
		const value = ((x - 0) / xStep * xJump).toFixed(0);
		ctx.fillText(value, x - 4, canvas.height + 8);
	}

	// Y-axis labels (left side, bottom up)
	ctx.textAlign = 'right';
	ctx.textBaseline = 'middle';

	for (let y = yStep; y < canvas.height; y += yStep) {
		const value = ((y / yStep) * yJump).toFixed(0);
		ctx.fillText(value, - 8, canvas.height - y);
	}
}


function graphArray(arr, color, maxValue) {
	arr = arr.map(e => canvas.height - (e/maxValue * canvas.height));
	const step = canvas.width/(arr.length-1);

	renderGridlines(step, 5/maxValue * canvas.height);
	renderGridLabels(step, 5/maxValue * canvas.height, 1, 5);

	ctx.strokeStyle = color;

	ctx.moveTo(0, arr[0]);
	ctx.beginPath();
	for (let i = 0; i < arr.length; i++) {
		ctx.lineTo(step*i, arr[i]);
	}
	ctx.stroke();
}

function rollingAverage(arr, n) {
	let result = [];
	let sum = 0;

	for (let i = 0; i < arr.length; i++) {
		sum += arr[i];
		if (i >= n) {
			sum -= arr[i - n];
		}
		result.push(sum / Math.min(i + 1, n));
	}

	return result;
}

renderCanvas();
