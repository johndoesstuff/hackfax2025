function updateCanvasSize() {
	const canvas = document.getElementById('canvas');

	const dpr = window.devicePixelRatio || 1;

	const rect = canvas.getBoundingClientRect();

	canvas.width = rect.width * dpr;
	canvas.height = rect.height * dpr;
	try {
		renderCanvas();
	} catch (e) {}
	console.log("updated");
}

updateCanvasSize();

window.addEventListener('resize', updateCanvasSize);

