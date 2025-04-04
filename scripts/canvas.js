window.sensorData = {
	a: [31, 12, 6, 52, 42, 71, 35],
	b: [],
};

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function updateCanvasReadout(newData) {
	for (let sensor in newData) {
		window.sensorData[sensor].push(newData[sensor]);
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
