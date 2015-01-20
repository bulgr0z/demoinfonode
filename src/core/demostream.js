var Util = require('util')
	, Stream = require('stream')
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

	// stashed chunks
	this.chunks = [];
	// current packet info
	this.packetInfo;
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
DemoStream.prototype.TICK = 0;

DemoStream.prototype._transform = function(chunk, encoding, done) {
	// console.log('chunk ! Length : ', chunk.length);

	var minChunkLength;
	// New packet (no chunks stashed)
	if (this.isNewPacket()) {
		console.log('started ', this.isGameStarted())
		minChunkLength = this.isGameStarted() ?
			Structs.PacketInfo.length :
			Structs.Header.length;

		if (chunk.length < minChunkLength) {
			throw new Error('Need to stash a header ?');
		}

		this.packetInfo = this.readPacketInfo(chunk);
		// send back data
		// this.push(this.packetInfo);
		this.emit('header', this.packetInfo);
	} else {
		throw new Error('Not a new packet, need to concat chunks');
	}

	done();
};

DemoStream.prototype.readPacketInfo = function(chunk) {
	return this.isGameStarted() ?
		Structs.PacketInfo.decode(chunk) :
		Structs.Header.decode(chunk);
};

DemoStream.prototype.isGameStarted = function() {
	return this.getTick() > 0;
};

DemoStream.prototype.setTick = function(tick) {
	if (!_.isNumber(tick))
		throw new Error('setTick : tick must be a number - tick: ', tick);

	return this.TICK;
};

DemoStream.prototype.getTick = function() {
	return this.TICK;
};

DemoStream.prototype.isNewPacket = function() {
	return this.chunks.length === 0;
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