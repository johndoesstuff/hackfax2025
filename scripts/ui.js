//

function updateCanvasSize() {
	const canvas = document.getElementById('canvas');

	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
}

updateCanvasSize();

window.addEventListener('resize', updateCanvasSize);

