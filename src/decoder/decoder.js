var Util = require('util')
	, Stream = require('stream')
	, Varint = require('varint')
	, Q = require('q')
	, _ = require('lodash')
	, Structs = require('../utils/structs.js');
// Messages Types
var Decoders = {};
Decoders.DemoMessages = require('./decoder.demomessages.js');


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

// PacketDecoder.Format.demoMessage = function(demoMessage, buffer) {
// 	return {
// 		demoMessage: demoMessage,
// 		chunk: buffer
// 	};
// };

// TRANSFORM

PacketDecoder.prototype._transform = function(packet, encoding, done) {
	console.log('packet decoder received packet ', packet);

	var chunk = packet.data;
	// a bit ugly there ?
	// var formattedMeta = this.getMessageMetadata(chunk);
	// chunk = formattedMeta.chunk;
	// var messages = this.decodeDemoPacket({
	// 	cmd: formattedMeta.cmd,
	// 	length: formattedMeta.length
	// }, chunk);
	console.log('before');
	var messages = this.decodeDemoMessages(chunk);
	console.log('after ');
	// console.log(messages)
	// console.log(formattedMeta, formattedMeta.chunk.length);
	process.exit(0);
};

// API


// Decode a DemoPacket composed of 1 or more messages
PacketDecoder.prototype.decodeDemoMessages = function(chunk) {
	// Should just be `DemoMessages.getMessages()` ?
	// There is no reason to iterate from there, and it would be cleaner
	// to just be able to use DemoMessages as a collection afterwards
	
	return new Decoders.DemoMessages(chunk);
};