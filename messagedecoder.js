var Structs = require('./structs.js')
	, Varint = require('varint')
	, Protobuf = require('protobufjs')
	, Bytebuffer = Protobuf.Bytebuffer
	, Long = Protobuf.Long
	, Q = require('q');

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
		9 : 'CSVCMsg_SendTable',
		12 : 'CSVCMsg_CreateStringTable',
		18 : 'CSVCMsg_SetView',
		30 : 'CSVCMsg_GameEventList'
	},

	/**
	 * TODO
	 * Passthrough method, offsets the packet from the stream but does not decode it.
	 */
	decodeRawPacket : function() {
		// var cmdInfo = Structs.CmdInfo.decode(this.demoBuffer);
		// console.log()
		//this._decodeRawMessages(this.demoBuffer.getBuffer())
		// console.log('RAW PACKET ?')
		var decoded = Q.defer();

		var cmdLength = Structs.CmdLength.decode(this.demoBuffer);
		var rawData = this._extractRawPacket(cmdLength.value);
		
		decoded.resolve([]); // dummy result
		return decoded.promise;
	},

	decodeNetPacket : function(cb) {
		var cmdInfo = Structs.CmdInfo.decode(this.demoBuffer)
			, cmdSequence = Structs.CmdSequence.decode(this.demoBuffer)
			, cmdLength = Structs.CmdLength.decode(this.demoBuffer)
			, message = {};

		var rawData = this._extractRawPacket(cmdLength.value); // slice a new buffer containing the message
		this._decodeRawMessages(rawData, cb); // decode every message from the packet and exec cb

		// console.log(rawData.length)
		// console.log('info', cmdInfo, 'sequence', cmdSequence, 'length', cmdLength);
	},

	_decodeRawMessages : function(packetBuffer, cb) {
		var offset = 0 // progression through the packet
			, messages = [];

		while (offset < packetBuffer.length) {

			// each message starts with a header of 2 varint32 : 
			// 	- command (corresponding to a protobuf message)
			//  - message length
			// Varints being of `variable` size, we need to keep track of the header size to slice the message
			var cmd = Varint.decode(packetBuffer.slice(offset))
				, cmdSize = Varint.decode.bytes // header cmd size
				, messageLength = Varint.decode(packetBuffer.slice(offset + cmdSize)) // 
				, messageHeaderLength = cmdSize + Varint.decode.bytes; // ... + bytes needed for messageLength

			//console.log('OFFSET ', offset, packetBuffer.length)		
			
			var messageType = this.net_messages[cmd];
			if (messageType) { // skip to the next message if type not found in net_messages
				// wrap the message in an object with the command as key
				var wrappedMsg = {};
				wrappedMsg[messageType] = this.protobuf[messageType].decodeDelimited(packetBuffer.slice(offset + cmdSize));
				messages.push(wrappedMsg); // decode the message

				console.log('-- DECODING : ', messageType);
			} else {
				console.log('-- SKIPPING CMD ', cmd);
			}
			
			offset += messageHeaderLength + messageLength;
			//if (cmd == 9) console.log(messages)
		}

		cb(messages);
	},

	_extractRawPacket : function(packetLength) {
		var packet = this.demoBuffer.getBuffer().slice(
			this.demoBuffer.getCursor(),
			this.demoBuffer.getCursor() + packetLength
		);
		this.demoBuffer.setOffset(packetLength);
		return packet;
	}

};