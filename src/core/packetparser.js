var Util = require('util')
	, Stream = require('stream')
	, Q = require('q')
	, _ = require('lodash')
	, Structs = require('../utils/structs.js');

/**
 * @constructor {PacketParser}
 * @param {Object} options Stream.Transform options
 */
var PacketParser = function(options) {
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
PacketParser.PacketStructs = {
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
// TODO this could be useful to implement basic stats gathering ?
PacketParser.Format = {};
// Not enough data in the provided chunk
PacketParser.Format.insufficientData = function(buffer) {
	return {chunk: buffer };
};
// HL2DEMO header
PacketParser.Format.demoHeader = function(header, buffer) {
	return {
		type: 'DemoHeader',
		demoHeader: header,
		chunk: buffer
	};
};
// dem packet
PacketParser.Format.packet = function(packetMetadata, data, buffer) {
	return  {
		type: 'Packet',
		metadata: packetMetadata,
		data: data,
		chunk: buffer
	};
};
// empty packet (eg. synctick) -> empty data, nothing read except header
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
	// At first tries to read a HL2DEMO header from the stream
	// If found, will emit it and stash leftovers from the chunk.
	//
	// FIXME should implement basic overflow protection
	//		(eg. throw if cant parse even if > 1072b)
	if (!this.isStarted) {
		var parsedPacket = this.parse(chunk);
		if (parsedPacket.type === 'DemoHeader') {
			this.emit('header', parsedPacket.demoHeader);
			this.isStarted = true; // now will start parsing packets
		}

		this.stash(parsedPacket.chunk);
		done();
	}
	// When HL2DEMO has been found, iterate over the chunk (and previous stash)
	// to parse any packet present.
	else {
		chunk = this.getStashBuffer(chunk); // apply stash first
		this.parseAllChunkPackets(chunk, function(leftovers) {
			this.stash(leftovers.chunk);
			done();
		});
	}

};

// Api

// Parse a chunk, returns a DemoHeader or Packet
// FIXME should be deprecated ?
PacketParser.prototype.parse = function(chunk) {
	// append stashed chunks first
	var dataBuf = this.getStashBuffer(chunk);

	if (!this.isStarted) {
		return this.parseDemHeader(dataBuf);
	}

	return this.parsePacket(dataBuf);
};

// Add a buffer to the stash
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

// Parses & emit as many packets as possible from the provided buffer. Recursive
// in process.nextTick, will stop when an InsuficientData returns and call
// `parsed` to give back the control to `transform_`.
PacketParser.prototype.parseAllChunkPackets = function(buffer, parsed) {
	var packet = this.parsePacket(buffer);

	if (packet.type === 'Packet') {
		this.push({
			metadata: packet.metadata,
			data: packet.data
		});
		// iterate without breaking the loop
		process.nextTick(function() {
			this.parseAllChunkPackets(packet.chunk, parsed);
		}.bind(this));
	} else {
		parsed.apply(this, [packet]);
	}
};

// Parse a packet from the provided buffer. The buffer is expected to have
// already been appended to the stash.
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
	// If no additional meta is provided, there is no data to extract (no 'size' struct).
	// We can do an early return with an empty `data` prop
	if (additionalMetaLength === 0)
		return PacketParser.Format.emptyPacket(packetMetadata, buffer);
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

	// Parsed a full packet, return it for emit
	return PacketParser.Format.packet(
		packetMetadata,
		buffer.slice(0, packetMetadata.packetSize), // data slice
		buffer.slice(packetMetadata.packetSize) // remaining buffer
	);
};