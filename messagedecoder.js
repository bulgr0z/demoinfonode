var Structs = require('./structs.js')
	, Varint = require('varint')
	, Protobuf = require('protobufjs')
	, Bytebuffer = Protobuf.Bytebuffer
	, Long = Protobuf.Long;

module.exports = function(demoBuffer) {
	this.demoBuffer = demoBuffer;
	var builder = Protobuf.loadProtoFile("../protobuf/cstrike15_usermessages.proto");
	this.protobuf = builder.build();
};

module.exports.prototype = {

	demoBuffer : null,
	protobuf : null,

	net_messages : {
		8 : 'CSVCMsg_ServerInfo',
		7 : 'CNETMsg_SignonState',
		6 : 'CNETMsg_SetConVar',
		4 : 'CNETMsg_Tick',
		12 : 'CSVCMsg_CreateStringTable'
	},

	decodeNetPacket : function(cb) {
		var cmdInfo = Structs.CmdInfo.decode(this.demoBuffer)
			, cmdSequence = Structs.CmdSequence.decode(this.demoBuffer)
			, cmdLength = Structs.CmdLength.decode(this.demoBuffer)
			, message = {};

		// get a new buffer containing the message
		var rawData = this._extractRawPacket(cmdLength.value);
		var messages = this._decodeNetMessages(rawData, cb);


		console.log(rawData.length)
		console.log('info', cmdInfo, 'sequence', cmdSequence, 'length', cmdLength);
	},

	_decodeNetMessages : function(packetBuffer, cb) {
		console.log('DECODE ! / CURSOR : ', this.demoBuffer.getCursor())

		var offset = 0 // progression through the packet
			, decoded = false
			, result = [];

		//var count = 0; // debug
		while (!decoded) {

			// each message starts with a header of 2 varint32 : 
			// 	- command (corresponding to a protobuf message)
			//  - message length
			// Varints being of `variable` size, we need to keep track of the header size to slice the message
			var cmd = Varint.decode(packetBuffer.slice(offset))
				, cmdSize = Varint.decode.bytes // header cmd size
				, messageLength = Varint.decode(packetBuffer.slice(offset + cmdSize)) // 
				, messageHeaderLength = cmdSize + Varint.decode.bytes; // ... + bytes needed for messageLength

		
			if (cmd <= 0 || typeof cmd === "undefined") break; // 0 is not a valid cmd, need better error handling
			//if (count > 3) break; // debug

			var messageType = this.net_messages[cmd];
			if (messageType) { // skip to the next message if type not found in net_messages
				result.push(this.protobuf[messageType].decodeDelimited(packetBuffer.slice(offset + cmdSize))); // decode the message
				console.log('-- DECODING : ', messageType);
			} else {
				console.log('-- SKIPPING CMD ', cmd);
			}
			
			offset += messageHeaderLength + messageLength;
			//offset = offset + 8 + result[messageType].calculate(); // offset the command and message length 

			// console.log("RESULT ", result)
			// console.log("MESSAGE LENGTH ", result[messageType].calculate())
			// console.log("NEW OFFSET ", offset);

			//count ++ // debug
			//	decoded = true;
		}

		console.log(result)

	},

	_extractMessageFromPacket : function(packetBuffer, offset) {
		// first 8 bytes are two protobuf varint, defining cmd & message size
		console.log(packetBuffer)
		var cmdBuffer = packetBuffer.slice(0, 4);
		var sizeBuffer = packetBuffer.slice(4, 8)

		console.log(cmdBuffer, sizeBuffer)

		var cmd = Varint.decode(cmdBuffer)
			, size = Varint.decode(sizeBuffer);


		//var cmd2 = Varint.decode(packetBuffer.slice(offset + 8 + size, offset + 16 + size));

		console.log(packetBuffer)

		console.log("yay", cmd, size)	
		// var rawMessage = packetBuffer.slice(offset + 8, offset + 8 + size);
		return packetBuffer.slice(offset + 4);

		offset += 8 + size;
		
	},

	_extractRawPacket : function(packetLength) {
		var packet = this.demoBuffer.getBuffer().slice(
			this.demoBuffer.getCursor(),
			this.demoBuffer.getCursor() + packetLength
		);
		this.demoBuffer.setOffset(packetLength);
		return packet;
	}

}