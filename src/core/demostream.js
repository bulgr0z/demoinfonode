var Util = require('util')
	, Stream = require('stream')
	, Q = require('q')
	, _ = require('lodash')
	, Structs = require('../utils/structs.js')
	, fs = require('fs');


/**
 * Creates a ReadableStream from the demofile to provide read events
 * with sliced packets and decoded `packetInfo` to the Parser
 *
 * TODO : Should take in ReadableStream instead of `demopath`. We should not
 * limit the origin to fs (eg. could be any stream, socket, url)
 *
 * @constructor {DemoBuffer}
 * @param {string} demopath The path to the demo
 * @param {Object} options Stream.Transform options
 */
var DemoStream = function(demopath, options) {
	Stream.Transform.call(this, {objectMode: true});
	console.log('constructed DemoStream')

	// 1 or more buffer slices
	this.slices = [];
	// current packet header
	this.packetHeader = null;
	// raw data to be decoded
	this.rawPacketData = null;
};

Util.inherits(DemoStream, Stream.Transform);
module.exports = DemoStream;

// Should be a transform stream (implement Transform)
// -> GOOD read chunks from any source, coming at any rate
// -> GOOD output nice json packets through a stream
// -> UGLY we have no control over how the demo stream spits
//		its packets; we HAVE TO be able to handle a split packet
//
// @see http://nodejs.org/api/stream.html#stream_example_simpleprotocol_parser_v2

// --OBSOLETE-- Should implement ._read as a ReadableStream
// May also include structs decoding to provide a nice
// .read method without the user having to specify how many bytes
// he needs to read.

DemoStream.prototype.POINTER = 0;
DemoStream.prototype.TICK = -1; // -1 : not started / 0 demo header / 1+ ticks

DemoStream.prototype._transform = function(chunk, encoding, done) {
	// console.log('chunk ! Length : ', chunk.length);
	console.log('---------- TRANSFORM ')

	this.iterateChunk(chunk, done); // ?



	// var minChunkLength;
	// New packet, no chunks stashed. Need to get a header
	// if (this.isNewPacket()) {
	// 	// this.getNewPacket(chunk, done);

	// 	// console.log('started ', this.isGameStarted())
	// 	// minChunkLength = this.isGameStarted() ?
	// 	// 	Structs.PacketInfo.length :
	// 	// 	Structs.Header.length;

	// 	// if (!this.isGameStarted()) {

	// 	// }

	// 	// if (chunk.length < minChunkLength) {
	// 	// 	throw new Error('Need to stash a header ?');
	// 	// }

	// 	// this.packetInfo = this.readPacketInfo(chunk);
	// 	// // send back data
	// 	// // this.push(this.packetInfo);
	// 	// this.emit('header', this.packetInfo);
	// } else {
	// 	throw new Error('Not a new packet, need to concat chunks');
	// }

	// done();
};

// DemoStream.prototype.concatPacket = function() {
// };

DemoStream.prototype.iterateChunk = function(chunk, done) {
	// chunk has been parsed/stashed in its totality
	if (chunk.length === 0) {
		console.log('chunk over ? ')
		done();
	}

	console.log('---------- ITERATING ')

	// No packet header yet, try to decode one
	if (!this.hasHeader()) {
		// extract the header, get back the remaining data
		chunk = this.extractPacketHeader(chunk);
		// not enough data in the chunk, return to get another one
		if (chunk === null) return done();

		// special case for the demo header. Emit & return early as
		// no protobuff data is expected after it.
		if (!this.isGameStarted()) {
			this.emit('header', this.packetHeader);
			this.setTick(0); // start reading real packets
			this.packetHeader = null; // reset packet header
			return this.iterateChunk(chunk, done);
		}
	}
	console.log('lenth before ', chunk.length)
	// At this point, we must have at least a bit of usable raw data
	chunk = this.extractRawPacketData(chunk);
	//process.exit(0)
	if (chunk === null) return done(); // not enough data
	console.log('lenth after ', chunk.length)
	// TODO !
	// Here, decode the packet message before emit >.>
	var decoded = this.getDecodedPacket()
	console.log(decoded)
	this.push(decoded); // send packet

	this.packetHeader = null;
	this.rawPacketData = null;

	return this.iterateChunk(chunk, done);
};

// OBSOLETE DESC Extract (if possible) the packet's header from the chunk and return
// the remaining chunk data. If packet can't be extracted, stash the data
// and return null
DemoStream.prototype.extractPacketHeader = function(chunk) {
	console.log('extractPacketHeader')

	// minimal required data length
	var expectedLength = this.isGameStarted() ?
		Structs.PacketInfo.length :
		Structs.Header.length;
	// expected available buffer size (adding slices if any)
	var availableLength = this.getSlicesLength() + chunk.length;
	if (availableLength >= expectedLength) {
		console.log('CONCAT HEADER expected HEADER ', expectedLength, 'available HEADER ', availableLength, this.slices.length)
		chunk = Buffer.concat(this.slices.concat(chunk));
		this.slices = []; // reset slices
	} else {
		console.log('STASH HEADER expected HEADER ', expectedLength, 'available HEADER ', availableLength, this.slices.length)
		// not enough data, add the chunk to the slices and return
		this.slices.push(chunk);
		return null;
	}
	// decode and set packet header
	this.packetHeader = this.isGameStarted() ?
		Structs.PacketInfo.decode(chunk) :
		Structs.Header.decode(chunk);
	// return the remaining chunk data
	return chunk.slice(expectedLength);
};

DemoStream.prototype.extractRawPacketData = function(chunk) {
// console.log('extractRawPacketData', this.packetHeader)
// process.exit(0)
	var expectedLength = this.packetHeader.size;
	var availableLength = this.getSlicesLength() + chunk.length;
	if (availableLength >= expectedLength) {
		console.log('CONCAT PACKET expected PACKET ', expectedLength, 'available PACKET ', availableLength, this.slices.length)
		chunk = Buffer.concat(this.slices.concat(chunk));
		this.slices = []; // reset slices
	} else {
		console.log('STASH PACKET expected PACKET ', expectedLength, 'available PACKET ', availableLength, this.slices.length)
		// not enough data, add the chunk to the slices and return
		this.slices.push(chunk);
		return null;
	}
	// extract the raw packet
	this.rawPacketData = chunk.slice(0, expectedLength);
	console.log('got raw packet of size ', expectedLength)
	// return the remaining data
	return chunk.slice(expectedLength);
};

// Passes the raw packet data & header to the MessageDecoder
// return the decoded message as an object
DemoStream.prototype.getDecodedPacket = function() {
	var decodedPacket = {
		header: this.packetHeader,
		data: null // this.rawPacketData
	}
	return decodedPacket;
};

DemoStream.prototype.loop = function() {
	return cb().then(function(decodedPacket) {
		this.output(decodedPacket, 'PACKET ?')
		return this.loop(cb);
	}.bind(this));
};

DemoStream.prototype.isGameStarted = function() {
	return this.getTick() >= 0;
};

DemoStream.prototype.setTick = function(tick) {
	if (!_.isNumber(tick))
		throw new Error('setTick : tick must be a number - tick: ', tick);

	this.TICK = tick;
};

DemoStream.prototype.getTick = function() {
	return this.TICK;
};

// get the total length of all the stashed slices
DemoStream.prototype.getSlicesLength = function() {
	var length = 0;
	this.slices.forEach(function(slice) {
		length = slice.length
	});
	return length;
};

DemoStream.prototype.hasSlices = function() {
	return this.slices.length > 0;
};

DemoStream.prototype.hasHeader = function() {
	return this.packetHeader !== null;
};

// DemoStream.prototype = {
// 	buffer : null,
// 	pointer : 0,
// 	tick: 0,

// 	/** @override */
// 	_transform: function(chunk, encoding, done) {
// 		console.log('chunk ! Length : ', chunk.length);

// 		// this.stream_.on('readable', function() {
// 		// 	console.log(Structs)
// 		// 	var packetInfo = this.readPacketInfo_();
// 		// 	console.log('packet info ? ', packetInfo)
// 		// }.bind(this));
		
// 		done();
// 	},

// 	getDemoStream: function() {
// 		return this.stream_;
// 	},

// 	// getBuffer : function() {
// 	// 	return this.buffer;
// 	// },

// 	// setOffset : function(offset) {
// 	// 	this.cursor += offset;
// 	// },

// 	getWat: function() {
// 		console.log('wat', this)
// 	},

// 	getCursor: function() {
// 		return this.cursor;
// 	}
// };