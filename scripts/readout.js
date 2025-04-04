function updateReadout() {
	const readout = document.getElementById("readout");
	values = Object.entries(sensorData).map(e => e[0] + ": " + Math.round(e[1][e[1].length - 1]*100)/100).join(", ");
	readout.innerText = `Current Values: ${values}`;
}

updateReadout();
