// var PacketParser = require('./src/parser/packetparser.js')
//   , PacketDecoder = require('./src/decoder/decoder.js');

// module.exports = {
//   PacketParser: PacketParser,
//   PacketDecoder: PacketDecoder
// };

var Fs = require('fs')
  , argv = require('yargs').argv
  , Winston = require('winston')
  , PacketParser = require('./src/parser/packetparser.js')
  , PacketDecoder = require('./src/decoder/decoder.js');

var demofile = argv._[0];
var bufferPointer;

var logger = new (Winston.Logger)({
  transports: [
    new (Winston.transports.Console)(),
    new (Winston.transports.File)({ filename: 'execution.log' })
  ]
});


var entrystream = Fs.createReadStream('/Volumes/MecanicalHD/Dropbox/dev/csgo/demo/demo.dem');
var packetParser = new PacketParser();
var packetDecoder = new PacketDecoder();
entrystream.pipe(packetParser).pipe(packetDecoder);

var start = new Date().valueOf();
var end;

packetDecoder.on('data', function(packet) {
  // console.log(JSON.stringify(packet, null, 2));
});