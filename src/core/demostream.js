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
	Stream.Transform.call(this, {});
	console.log('constructed DemoStream')

	// 1 or more buffer slices
	this.slices = [];
	// current packet header
	this.packetHeader;
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

	// new packet, no header. Probably demo start
	if (this.isNewPacket() && !this.hasHeader()) {
		slicedChunk = this.extractPacketHeader(chunk);
		// not enough data in chunk, wait for another one
		if (!slicedChunk) return done();

		if (!this.isGameStarted()) {
			// Demo header; emit it and return to read another chunk since
			// no protobuff data is attached to this header.
			this.emit('header', this.packetHeader);
			this.setTick(0); // start reading real packets
			return this.iterateChunk(slicedChunk, done);
		} else {
			// Packet header
			console.log('packet info ', this.packetHeader)
			process.exit(0)
		}
	}
	// new packet, has header; extract data
	if (this.isNewPacket() && this.hasHeader()) {
		chunk = this.extractPacketData(chunk);
		console.log('new packet ! ', this.packetHeader, chunk.length);
		process.exit(1);
	}

	return this.iterateChunk(chunk, done);
};

// Extract (if possible) the packet's header from the chunk and return
// the remaining chunk data. If packet can't be extracted, stash the data
// and return null
DemoStream.prototype.extractPacketHeader = function(chunk) {
	var dataLength = this.isGameStarted() ?
		Structs.PacketInfo.length :
		Structs.Header.length;

	if (dataLength > chunk.length) {
		this.slices.push(chunk);
		return null; // chunk too small, can't extract a header
	}
	console.log('length before ', chunk.length)
	this.packetHeader = this.isGameStarted() ?
		Structs.PacketInfo.decode(chunk) :
		Structs.Header.decode(chunk);

	return chunk.slice(dataLength);
};

DemoStream.prototype.extractPacketData = function() {
	console.log('lol extract data')
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

DemoStream.prototype.isNewPacket = function() {
	return this.slices.length === 0;
};

DemoStream.prototype.hasHeader = function() {
	return this.packetHeader === null;
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