const airfoilCtx = airfoil.getContext("2d");
const airfoilImg = document.getElementById("airfoil-img");

function renderAirfoil() {
	airfoilCtx.translate(airfoil.width/2, airfoil.height/2);
	const scale = 0.6;
	airfoilCtx.drawImage(
		airfoilImg,
		-scale*airfoil.width/2,
		-scale*airfoil.width/4*airfoilImg.height/airfoilImg.width,
		scale*airfoil.width,
		scale*airfoil.width/2*airfoilImg.height/airfoilImg.width
	);
}

renderAirfoil();
