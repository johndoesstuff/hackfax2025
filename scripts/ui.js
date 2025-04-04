//

function updateCanvasSize() {
	const canvas = document.getElementById('canvas');

	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
	renderCanvas();
}

updateCanvasSize();

window.addEventListener('resize', updateCanvasSize);

