//

function updateCanvasSize() {
	const canvas = document.getElementById('canvas');

	const dpr = window.devicePixelRatio || 1;

	canvas.width = canvas.offsetWidth * dpr;
	canvas.height = canvas.offsetHeight * dpr;
	renderCanvas();
}

updateCanvasSize();

window.addEventListener('resize', updateCanvasSize);

