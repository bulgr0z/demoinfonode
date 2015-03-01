var Fs = require('fs')
  , PacketParser = require('./src/parser/packetparser.js')
  , PacketDecoder = require('./src/decoder/decoder.js');

var entrystream = Fs.createReadStream('/Volumes/MecanicalHD/Dropbox/dev/csgo/demo/demo.dem');
var packetParser = new PacketParser();
var packetDecoder = new PacketDecoder();
entrystream.pipe(packetParser).pipe(packetDecoder);

var cmd = {};
var a = new Date();
packetDecoder.on('data', function(packet) {
  // Do stuff with your decoded packet
	if (!cmd[packet.metadata.cmd]) cmd[packet.metadata.cmd] = 0;
	cmd[packet.metadata.cmd] += 1;

	if (packet.messages) {
		packet.messages.forEach(function(msg) {
			if (msg.messageName == 'CSVCMsg_GameEventList') {

				console.log('game events list !!')
				process.exit(0)
			}
		});
	}
	// console.log(JSON.stringify(packet, null, 2))
});


packetParser.on('data', function(packet) {
 	if (packet.metadata.cmd == 7) {
 	var b = new Date();
 	console.warn('time : ', (b.valueOf() - a.valueOf()) / 1000 + 's')
 	console.warn(cmd)
}
});