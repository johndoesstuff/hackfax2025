window.sensorData = {
	a: randomData(50),
	b: randomData(50),
};

function randomData(n) {
	return Array(n).fill(0).map((e, i) => 100*(Math.random()+Math.abs(Math.sin(i/5)))/2);
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const graphColors = {"RED":"#c74440","BLUE":"#2d70b3","GREEN":"#348543","ORANGE":"#fa7e19","PURPLE":"#6042a6","BLACK":"#000000"};

let showAverage = true;
let averageDepth = 30;

function updateCanvasReadout(newData) {
	for (let sensor in newData) {
		window.sensorData[sensor].push(newData[sensor]);
	}

	renderCanvas();
	updateReadout();
}

function renderCanvas() {	
	ctx.setTransform(1, 0, 0, 1, 0, 0);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.scale(0.9, 0.9);
	ctx.translate(-canvas.width / 2, -canvas.height / 2);

	renderUI();

	const max = Math.max(...Object.values(sensorData).flat());
	let c = 0;
	for (let sensor in window.sensorData) {
		const color = Object.values(graphColors)[c % 6];
		c++;
		graphArray(window.sensorData[sensor], color, max);
	}

	c = 0;
	if (showAverage) {
		ctx.setLineDash([5, 3]);
		ctx.globalAlpha = 0.6;
		for (let sensor in window.sensorData) {
			const color = Object.values(graphColors)[c % 6];
			c++;
			graphArray(rollingAverage(window.sensorData[sensor], averageDepth), color, max);
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

function graphArray(arr, color, maxValue) {
	arr = arr.map(e => canvas.height - (e/maxValue * canvas.height));
	const step = canvas.width/(arr.length-1);
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
