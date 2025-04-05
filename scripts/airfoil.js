const airfoilCtx = airfoil.getContext("2d");
const airfoilImg = document.getElementById("airfoil-img");

function renderAirfoil() {
	airfoilCtx.setTransform(1, 0, 0, 1, 0, 0);
	airfoilCtx.clearRect(0, 0, airfoil.width, airfoil.height);
	airfoilCtx.translate(airfoil.width/2, airfoil.height/2);
	const scale = 0.6;
	airfoilCtx.drawImage(
		airfoilImg,
		-scale*airfoil.width/2,
		-scale*airfoil.width/4*airfoilImg.height/airfoilImg.width,
		scale*airfoil.width,
		scale*airfoil.width/2*airfoilImg.height/airfoilImg.width
	);
	ctx.strokeStyle = graphColors.ORANGE;
	let load1 = sensorData.load1[sensorData.load1.length - 1];
	let load2 = sensorData.load2[sensorData.load2.length - 1];
	let load3 = sensorData.load3[sensorData.load3.length - 1];
	let load4 = sensorData.load4[sensorData.load4.length - 1];
	let lift = load1 + load2;
	let drag = load3 + load4;
	console.log(lift);
	drawArrow(airfoilCtx, 0, 0, 0, -lift * 10, {color: graphColors.ORANGE});
	drawArrow(airfoilCtx, 0, 0, drag * 10, 0, {color: graphColors.PURPLE});
	drawArrow(airfoilCtx, 0, 0, drag * 10, -lift * 10, {color: graphColors.BLUE});
}

function drawArrow(ctx, x1, y1, x2, y2, options = {}) {
	const {
		color = '#000',
		width = 2,
		headLength = 10,
		headAngle = Math.PI / 7
	} = options;

	const dx = x2 - x1;
	const dy = y2 - y1;
	const angle = Math.atan2(dy, dx);

	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(x2, y2);
	ctx.lineTo(
		x2 - headLength * Math.cos(angle - headAngle),
		y2 - headLength * Math.sin(angle - headAngle)
	);
	ctx.lineTo(
		x2 - headLength * Math.cos(angle + headAngle),
		y2 - headLength * Math.sin(angle + headAngle)
	);
	ctx.lineTo(x2, y2);
	ctx.fillStyle = color;
	ctx.fill();
}


renderAirfoil();
