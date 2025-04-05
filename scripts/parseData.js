let tares = {
	load1: -344974,
	load2: -479068,
	load3: 21750,
	load4: 853875,
}

let scalars = {
	load1: 10000,
	load2: 10000,
	load3: 10000,
	load4: 10000,
}

let rawLoads;
let firstOverload = true;

function checkOverload() {
	let loadRegex = /Load1: (-?\d+)\r\nLoad2: (-?\d+)\r\nLoad3: (-?\d+)\r\nLoad4: (-?\d+)\r\n/;

	let match = serialDataStream.match(loadRegex);

	if (match) {
		rawLoads = {
			load1: parseInt(match[1]),
			load2: parseInt(match[2]),
			load3: parseInt(match[3]),
			load4: parseInt(match[4]),
		};

		if (firstOverload) {
			tare();
			firstOverload = false;
		}

		let loads = normalizeLoads(rawLoads);
		console.log(loads);
		serialDataStream = serialDataStream.replace(loadRegex, '');
		updateCanvasReadout(loads);
	}
}

function normalizeLoads(loads) {
	loads = JSON.parse(JSON.stringify(loads)); //preserve raw
	loads.load1 -= tares.load1;
	loads.load2 -= tares.load2;
	loads.load3 -= tares.load3;
	loads.load4 -= tares.load4;
	loads.load1 /= scalars.load1;
	loads.load2 /= scalars.load2;
	loads.load3 /= scalars.load3;
	loads.load4 /= scalars.load4;
	loads.load1 = Math.max(0, loads.load1);
	loads.load2 = Math.max(0, loads.load2);
	loads.load3 = Math.max(0, loads.load3);
	loads.load4 = Math.max(0, loads.load4);
	return loads;
}
