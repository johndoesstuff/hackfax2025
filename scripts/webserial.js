let port1;
let port2;
let reader1;
let reader2;
let serialDataStream1 = '';
let serialDataStream2 = '';

async function connectSerial() {
	try {
		port1 = await navigator.serial.requestPort();
		port2 = await navigator.serial.requestPort();
		await port1.open({ baudRate: 9600 });
		await port2.open({ baudRate: 9600 });

		const decoder1 = new TextDecoderStream();
		const decoder2 = new TextDecoderStream();

		port1.readable.pipeTo(decoder1.writable);
		port2.readable.pipeTo(decoder2.writable);

		const inputStream1 = decoder1.readable;
		const inputStream2 = decoder2.readable;

		reader1 = inputStream1.getReader();
		reader2 = inputStream2.getReader();

		readLoop();
	} catch (err) {
		console.error('Connection failed:', err);
		alert("Connection failed");
	}
}

async function readLoop() {
	while (true) {
		try {
			const { value: value1, done: done1 } = await reader1.read();
			if (done1) break;
			if (value1) {
				//console.log('Port1:', value1);
				serialDataStream1 += value1;
				checkOverload1();
			}

			const { value: value2, done: done2 } = await reader2.read();
			if (done2) break;
			if (value2) {
				//console.log('Port2:', value2);
				serialDataStream2 += value2;
				checkOverload2();
			}
		} catch (err) {
			console.error('Read error:', err);
			break;
		}
	}
}

