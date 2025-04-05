let tares = {
	load1: -344474,
	load2: -479068,
	load3: 21750,
	load4: 853875,
}

function checkOverload() {
	let loadRegex = /Load1: (-?\d+)\r\nLoad2: (-?\d+)\r\nLoad3: (-?\d+)\r\nLoad4: (-?\d+)\r\n/;

	let match = serialDataStream.match(loadRegex);

	if (match) {
		const loads = {
			load1: parseInt(match[1]),
			load2: parseInt(match[2]),
			load3: parseInt(match[3]),
			load4: parseInt(match[4]),
		};
		loads = normalizeLoads(loads);
		console.log(loads);
		serialDataStream = serialDataStream.replace(loadRegex, '');
		//updateCanvasReadout(loads);
	}
}

function normalizeLoads(loads) {
	loads.load1 -= tares.load1;
	loads.load2 -= tares.load2;
	loads.load3 -= tares.load3;
	loads.load4 -= tares.load4;
	return loads;
}
