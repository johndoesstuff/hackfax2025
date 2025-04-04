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

function updateCanvasReadout(newData) {
	for (let sensor in newData) {
		window.sensorData[sensor].push(newData[sensor]);
	}

	renderCanvas();
	updateReadout();
}

function renderCanvas() {	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	const max = Math.max(...Object.values(sensorData).flat());
	let c = 0;
	for (let sensor in window.sensorData) {
		const color = Object.values(graphColors)[c % 6];
		c++;
		graphArray(window.sensorData[sensor], color, max);
	}
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

renderCanvas();
