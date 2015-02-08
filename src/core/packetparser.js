var Util = require('util')
	, Stream = require('stream')
	, Varint = require('varint')
	, Q = require('q')
	, _ = require('lodash')
	, Structs = require('../utils/structs.js');

// TODO : Be able to decode multiple packets from a single transform

/**
 * @constructor {PacketParser}
 * @param {string} demopath The path to the demo
 * @param {Object} options Stream.Transform options
 */
var PacketParser = function(demopath, options) {
	Stream.Transform.call(this, {objectMode: true});

	// 1 or more buffer slices
	this.slices = [];
	// current packet header
	this.packetHeader = null;
	// raw data to be decoded
	this.rawPacketData = null;
	// We have not seen (yet) a HL2DEMO header
	this.isStarted = false;
};

Util.inherits(PacketParser, Stream.Transform);
module.exports = PacketParser;

// map of the packet structs by cmdType
// FIXME (?) Maybe always has a Structs.PacketLength at the end ?
PacketParser.PacketStructs = {
	// Should have 2 _varint32_ after : cmd/size (-> no structs.size)
	1: [Structs.PacketInfo, Structs.PacketSequence, Structs.PacketLength], // signon (start up message)
	2: [Structs.PacketInfo, Structs.PacketSequence, Structs.PacketLength], // packet
	3: [], // syntick, skip packet
	4: [], // consoleCmd, skip
	5: [Structs.PacketLength], // userCmd
	6: [Structs.PacketLength], // datatables
	7: [], // dem stop
	8: [], // "customdata"
	9: [Structs.PacketLength], // stringtables
	10: [Structs.PacketLength], // stringtables
};

// Custom formatters
PacketParser.Format = {};
// not enough data to decode
PacketParser.Format.insufficientData = function(buffer) {
	return {chunk: buffer };
};

PacketParser.Format.demoHeader = function(header, buffer) {
	return {
		type: 'DemoHeader',
		demoHeader: header,
		chunk: buffer
	};
};

PacketParser.Format.packet = function(packetMetadata, data, buffer) {
	return  {
		type: 'Packet',
		metadata: packetMetadata,
		data: data,
		chunk: buffer
	};
};

PacketParser.Format.emptyPacket = function(packetMetadata, buffer) {
	return {
		type: 'Packet',
		metadata: packetMetadata,
		data: [],
		chunk: buffer
	};
};

// Transform implementation

PacketParser.prototype._transform = function(chunk, encoding, done) {
	// When HL2DEMO header is encountered, should emit a 'header' event
	// and maybe stash the rest to return early ?
	var parsedPacket = this.parse(chunk);

	if (parsedPacket.type === 'DemoHeader') {
		this.emit('header', parsedPacket.demoHeader);
		this.isStarted = true; // now will start parsing packets
	}

	if (parsedPacket.type === 'Packet') {
		// push the packet down the stream
		this.push({
			metadata: parsedPacket.metadata,
			data: parsedPacket.data
		});
	}

	this.stash(parsedPacket.chunk);
	done();
};

// Api

PacketParser.prototype.parse = function(chunk) {
	// append stashed chunks first
	var dataBuf = this.getStashBuffer(chunk);

	if (!this.isStarted) {
		return this.parseDemHeader(dataBuf);
	}

	return this.parsePacket(dataBuf);
};

PacketParser.prototype.stash = function(buffer) {
	if (buffer.length) this.slices.push(buffer);
};

// Get a buffer from the stash. if opt_buffer provided, appends
// it to the stash before concat.
PacketParser.prototype.getStashBuffer = function(opt_buffer) {
	if (!this.slices.length) return opt_buffer;
	if (opt_buffer) this.stash(opt_buffer);
	var concat = Buffer.concat(this.slices);
	this.slices = []; // reset slices
	return concat;
};

// Parses a HL2DEMO header if enough data is present in buffer.
PacketParser.prototype.parseDemHeader = function(buffer) {
	var headerLength = Structs.DemoHeader.length;
	if (buffer.length < headerLength)
		return PacketParser.Format.insufficientData(buffer);

	// return the decoded header and remaining data
	return PacketParser.Format.demoHeader(
		Structs.DemoHeader.decode(buffer),
		buffer.slice(headerLength));
};

PacketParser.prototype.parsePacket = function(buffer) {
	// keep a copy of the original `buffer` : it may be needed for an early return
	var originalChunk = buffer;
	// first, if possible, read packet metadata
	var metaLength = Structs.PacketMetadata.length;
	if (buffer.length < metaLength)
		return PacketParser.Format.insufficientData(originalChunk);
	// decode packet metadata
	var packetMetadata = Structs.PacketMetadata.decode(buffer);
	buffer = buffer.slice(metaLength); // advance buffer position

	// Test if we have enough buffer left to decode the additional meta
	var additionalMetaLength = 0;
	PacketParser.PacketStructs[packetMetadata.cmd].forEach(function(struct) {
		additionalMetaLength += struct.length;
	});
	// If no additional meta is provided, there is no raw data to extract.
	// We can do an early return with an empty `data` prop
	if (additionalMetaLength === 0)
		return PacketParser.Format.emptyPacket(packetMetadata, buffer);
		// return {chunk: originalChunk, data: []};
	// not enough buffer to read additional meta
	if (buffer.length < additionalMetaLength)
		return PacketParser.Format.insufficientData(originalChunk);

	// decode any additional meta and merge them in packetMetadata
	PacketParser.PacketStructs[packetMetadata.cmd].forEach(function(struct) {
		_.assign(packetMetadata, struct.decode(buffer));
		buffer = buffer.slice(struct.length);
	});

	if (buffer.length < packetMetadata.packetSize)
		return PacketParser.Format.insufficientData(originalChunk);

	// Should be in a decoder, not here.
	//
	// Read the two varints describing a
	// var cmdSlice = this.getVarintAndSlice(buffer);
	// if (!cmdSlice) return {chunk: buffer};
	// buffer = cmdSlice.chunk;

	// var pLengthSlice =

	return PacketParser.Format.packet(
		packetMetadata,
		buffer.slice(0, packetMetadata.packetSize), // data slice
		buffer.slice(packetMetadata.packetSize) // remaining buffer
	);

};

// Should be in Decoder
//
// reads a varint from `buffer` and returns an object
// @return {varint: <the varint>, chunk: <remaining data>} OR null
// PacketParser.prototype.getVarintAndSlice = function(buffer) {
// 	// Varint.decode will return `undefined` if not enough data is provided
// 	var varint = Varint.decode(packetBuffer.slice(offset))
// 	var varintSize = Varint.decode.bytes; // the length of the encoded varint
// 	if (varint === undefined) return null;

// 	return {
// 		varint: varint,
// 		chunk: buffer.slice(varintSize)
// 	};
// };