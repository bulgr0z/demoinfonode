var Fs = require('fs')
  , argv = require('yargs').argv
  , Winston = require('winston')
  , PacketParser = require('./src/core/packetparser.js');
	// , Parser = require('./src/core/parser.js')
	// , Stats = require('./src/utils/stats.js')
 //  , Util = require('./src/utils/utils.js');

var demofile = argv._[0];
var bufferPointer;

// console.log(argv)

var logger = new (Winston.Logger)({
  transports: [
    new (Winston.transports.Console)(),
    new (Winston.transports.File)({ filename: 'execution.log' })
  ]
});

var demoEvents = [];

var entrystream = Fs.createReadStream('/Volumes/MecanicalHD/Dropbox/dev/csgo/demo/demo.dem');
var packetParser = new PacketParser();

//demoStream.pipe(entrystream)
entrystream.pipe(packetParser).on('header', function(data) {
	console.log('header !', data);
	process.exit(1)
	// entrystream.pause()
});

packetParser.on('data', function(data) {
	console.log('\n\nMETADATA :: \n', data.metadata, '\n DATALENGTH :: ', data.data.length);
});

// entrystream.pipe(demoStream).on('data', function() {
// 	console.log('wut')
// });

// demoStream._read();

// Fs.readFile(demofile, function (err, data) {

// 	var demoBuffer = new DemoBuffer(data);
// 	var outputStream = Fs.createWriteStream('./results/results.txt', {
// 		flags: 'w',
// 	  encoding: 'utf8',
// 	  mode: 0666
// 	});

// 	var stats = new Stats("json");
// 	var parser = new Parser(demoBuffer, outputStream, stats);	
// 	// outputStream.once('open', function(descriptor) {
// 	// });

	
// 	//console.log(parser);

// 	// var demoHeader = demoBuffer.slice(0, 1072);
// 	// console.log(demoHeader);
// 	// console.log(demoBuffer);
// 	//var decoded = Bufferpack.unpack(format, demoHeader, 0);

// 	// console.log(demoBuffer);
// 	// var header = Structs.Header.decode(demoBuffer);
// 	// console.log(header);
// 	// console.log(demoBuffer);

// 	//console.log(decoded);

// });


