var Fs = require('fs')
  , PacketParser = require('./src/parser/packetparser.js')
  , PacketDecoder = require('./src/decoder/decoder.js');

var entrystream = Fs.createReadStream('/path/to/demofile.dem');
var packetParser = new PacketParser();
var packetDecoder = new PacketDecoder();
entrystream.pipe(packetParser).pipe(packetDecoder);

packetDecoder.on('data', function(packet) {
  // Do stuff with your decoded packet
  // console.log(JSON.stringify(packet, null, 2));
});