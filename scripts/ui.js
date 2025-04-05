function updateCanvasSize() {
	const canvas = document.getElementById('canvas');
	const airfoil = document.getElementById('airfoil');

	const dpr = window.devicePixelRatio || 1;

	const rect = canvas.getBoundingClientRect();

	canvas.width = rect.width * dpr;
	canvas.height = rect.height * dpr;
	try {
		renderCanvas();
	} catch (e) {}
	console.log("updated");

	const rectAirfoil = canvas.getBoundingClientRect();
	airfoil.width = rectAirfoil.width * dpr;
	airfoil.height = rectAirfoil.height * dpr;
}

updateCanvasSize();

window.addEventListener('resize', updateCanvasSize);
const GRAPH = "GRAPH";
const AIRFOIL = "AIRFOIL";
window.showing = GRAPH;

function toggleGraph() {
	if (window.showing != GRAPH) {
		document.getElementById("airfoil-container").style.display = "none";
		document.getElementById("graph-container").style.display = "flex";
	}
	window.showing = GRAPH;
}

function toggleAirflow() {
	if (window.showing != AIRFOIL) {
		document.getElementById("graph-container").style.display = "none";
		document.getElementById("airfoil-container").style.display = "flex";
	}
	window.showing = AIRFOIL;
}
