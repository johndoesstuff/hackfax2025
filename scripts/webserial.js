let port;
let reader;
let serialDataStream = '';

async function connectSerial() {
	try {
		port = await navigator.serial.requestPort();
		await port.open({ baudRate: 9600 });

		const decoder = new TextDecoderStream();
		const inputDone = port.readable.pipeTo(decoder.writable);
		const inputStream = decoder.readable;

		reader = inputStream.getReader();
		readLoop();
	} catch (err) {
		console.error('Connection failed:', err);
		alert("Connection failed");
	}
}
async function readLoop() {
	while (true) {
		try {
			const { value, done } = await reader.read();
			if (done) break;

			if (value) {
				//console.log('Received:', value);
				serialDataStream += value;
				checkOverload();
			}
		} catch (err) {
			console.error('Read error:', err);
			break;
		}
	}
}
