var Fs = require('fs')
  , PacketParser = require('./src/parser/packetparser.js')
  , PacketDecoder = require('./src/decoder/decoder.js');

var entrystream = Fs.createReadStream('/path/to/demofile.dem');
var packetParser = new PacketParser();
var packetDecoder = new PacketDecoder();
entrystream.pipe(packetParser).pipe(packetDecoder);

var cmd = {};
var a = new Date();
packetDecoder.on('data', function(packet) {
  // Do stuff with your decoded packet
	if (!cmd[packet.metadata.cmd]) cmd[packet.metadata.cmd] = 0;
	cmd[packet.metadata.cmd] += 1;
});


packetParser.on('data', function(packet) {
 	if (packet.metadata.cmd == 7) { // last demo cmd
	 	var b = new Date();
	 	console.warn('Decoded in : ', (b.valueOf() - a.valueOf()) / 1000 + 's');
	 	console.warn('Packet repartition : ', cmd);
	}
});