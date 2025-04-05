function tare() {
	console.log("Tare Request");
	tares.load1 = rawLoads.load1;
	tares.load2 = rawLoads.load2;
	tares.load3 = rawLoads.load3;
	tares.load4 = rawLoads.load4;
}

function createProfile() {
	console.log("Profile Request");
}

function uploadProfile() {
	console.log("Upload Profile Request");
}

function updateAttack() {
	const attack = document.getElementById("attack-input").value;
	setAttack(attack);
}

function setAttack(angle) {
	console.log(`Set Angle of Attack to ${angle}`);
}

function updateWindspeed() {
	const windspeed = document.getElementById("windspeed-input");
	setWindspeed(windspeed);
}

function setWindspeed(mph) {
	console.log(`Set Windspeed to ${mph}`);
}
