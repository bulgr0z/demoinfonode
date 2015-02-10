var Util = require('util')
	, Stream = require('stream')
	, Varint = require('varint')
	, Q = require('q')
	, _ = require('lodash')
	, Structs = require('../utils/structs.js');

/**
 * @constructor {PacketDecoder}
 * @param {Object} options Stream.Transform options
 */
var PacketDecoder = function(options) {
	Stream.Transform.call(this, {objectMode: true});
};

Util.inherits(PacketDecoder, Stream.Transform);
module.exports = PacketDecoder;

PacketDecoder.MessageCallbacks = {
	1: 'decodeDemoPacket',
	2: 'decodeDemoPacket',
	3: null, // UNSUSED Does not even come in the decoder, to remove ?
	4: null, // UNSUSED
	5: null, // TODO userCmd
	6: null, // TODO datatables
	7: null, // UNSUSED dem stop
	8: null, // UNSUSED "customdata"
	9: null, // TODO stringtables
	10: null, // TODO stringtables
};

// PacketDecoder formatters
PacketDecoder.Format = {};

PacketDecoder.Format.messageMetadata = function(cmd, length, buffer) {
	return {
		cmd: cmd,
		length: length,
		chunk: buffer
	};
};

// TRANSFORM

PacketDecoder.prototype._transform = function(packet, encoding, done) {
	console.log('packet decoder received packet ', packet);

	var chunk = packet.data;
	var meta = this.getMessageMetadata(chunk);
	var message = this.decodeDemoPacket(meta, chunk);
	console.log(meta, meta.chunk.length);
	process.exit(0);
};

// API

PacketDecoder.prototype.getMessageMetadata = function(chunk) {
	// varint32 encoded message cmd
	var messageCmd = Varint.decode(chunk);
	// offset buffer with the size (B) of the decoded varint
	chunk = chunk.slice(Varint.decode.bytes);
	// message length
	var messageLength = Varint.decode(chunk);
	chunk = chunk.slice(Varint.decode.bytes); // offset
	return PacketDecoder.Format.messageMetadata(
		messageCmd, messageLength, chunk);
};

PacketDecoder.prototype.decodeDemoPacket = function(meta, chunk) {
	
};