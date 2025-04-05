function updateReadout() {
	const readout = document.getElementById("readout");
	//values = Object.entries(sensorData).map(e => e[0] + ": " + Math.round(e[1][e[1].length - 1]*100)/100).join(", ");
	values = Object.fromEntries(Object.entries(sensorData).map(e => [e[0], e[1][e[1].length - 1]]));
	readout.innerText = `Lift: ${roundHundredths(values.load1 + values.load2)}, Drag: ${roundHundredths(values.load3 + values.load4)}, Speed: ${roundHundredths(values.speed)}`;
}

updateReadout();

function roundHundredths(e) {
	return Math.round(e * 100)/100;
}
