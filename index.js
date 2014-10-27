var Protobuf = require('protobufjs')
	, Bytebuffer = Protobuf.Bytebuffer
	, Long = Protobuf.Long
	, Fs = require('fs')
  , Varint = require('varint')
  , Bufferpack = require('bufferpack')

	//, Structs = require('./structs.js')
	, Parser = require('./parser.js')
  , Util = require('./utils.js');

var demofile = "../demo/demo2.dem";
var bufferPointer;

var demoEvents = [];

Fs.readFile(demofile, function (err, data) {

	var demoBuffer = new DemoBuffer(data);
	var outputStream = Fs.createWriteStream('./results/results.txt', { 
		flags: 'w',
	  encoding: 'utf8',
	  mode: 0666 
	});

	var parser = new Parser(demoBuffer, outputStream);	
	// outputStream.once('open', function(descriptor) {
	// });

	
	//console.log(parser);

	// var demoHeader = demoBuffer.slice(0, 1072);
	// console.log(demoHeader);
	// console.log(demoBuffer);
	//var decoded = Bufferpack.unpack(format, demoHeader, 0);

	// console.log(demoBuffer);
	// var header = Structs.Header.decode(demoBuffer);
	// console.log(header);
	// console.log(demoBuffer);

	//console.log(decoded);

});

/**
 * Wraps our file buffer in an object containing the buffer, a cursor indicating
 * the current position and accessor methods.
 */
var DemoBuffer = function(buffer) {
	this.buffer = buffer;
};
DemoBuffer.prototype = {
	buffer : null,
	cursor : 0,

	getBuffer : function() {
		return this.buffer;
	},

	setOffset : function(offset) {
		this.cursor += offset;
	},

	getCursor : function() {
		return this.cursor;
	}
};