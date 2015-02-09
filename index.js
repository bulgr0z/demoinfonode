var Fs = require('fs')
  , argv = require('yargs').argv
  , Winston = require('winston')
  , PacketParser = require('./src/core/packetparser.js');

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

entrystream.pipe(packetParser).on('header', function(data) {
	//console.log('header !', data);
});

var start = new Date().valueOf();
var end;
packetParser.on('data', function(packet) {
	// console.log('\n\nMETADATA :: \n', packet.metadata, '\n DATALENGTH :: ', packet.data.length);
  if (packet.metadata.cmd === 7) {
    end = new Date().valueOf();
    console.log('TIME : ', (end - start) / 1000)
  }
});