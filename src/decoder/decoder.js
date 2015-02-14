var Util = require('util')
	, Stream = require('stream');
// Messages Types
var Decoders = {};
Decoders.DemoMessages = require('./decoder.demomessages.js');


/**
 * Gets the appropriate decoder for the given packet.
 * When the decoder has built its message collection, push them down the stream.
 *
 * @constructor {PacketDecoder}
 * @param {Object} options Stream.Transform options
 */
var PacketDecoder = function(options) {
	Stream.Transform.call(this, {objectMode: true});
};

Util.inherits(PacketDecoder, Stream.Transform);
module.exports = PacketDecoder;

// Map the Decoders by cmd
PacketDecoder.Decoders = {
	1: Decoders.DemoMessages, // signon
 	2: Decoders.DemoMessages, // packet
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
	var packetData = packet.data;
	var packetMeta = packet.metadata;
	var decoder = PacketDecoder.Decoders[packetMeta.cmd];
	// empty packet or no decoder found, skip
	if (!decoder) return done();
	// Decodes the packet and return a usable messages collection
	var messages = new decoder(packetMeta, packetData);

	this.push(messages.toJSON());
	return done();
};
