var Structs = require('./structs.js')
	, Varint = require('varint')
	, Protobuf = require('protobufjs')
	, Bytebuffer = Protobuf.Bytebuffer
	, Long = Protobuf.Long
	, Q = require('q');

/**
 * Provides decoders to extract 0 or more protobuf messages from a .dem packet
 * All decoders return a promise object which will contain the resolved messages.
 *
 * @constructor
 * @param {Buffer} demoBuffer - raw packet sliced from the buffer
 */
var MessageDecoder = function(demoBuffer) {
	this.demoBuffer = demoBuffer;
	// loading cstrike15_usermessages proto file also imports netmessages_public
	var builder = Protobuf.loadProtoFile("./protobuf/cstrike15_usermessages.proto");
	this.protobuf = builder.build();
};

MessageDecoder.prototype = {

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
		// this._decodeRawMessages(this.demoBuffer.getBuffer())
		// console.log('RAW PACKET ?')
		var decoded = Q.defer();

		var cmdLength = Structs.PacketLength.decode(this.demoBuffer);
		var rawData = this._extractRawPacket(cmdLength.value);
		
		decoded.resolve([]); // dummy result
		return decoded.promise;
	},

	decodeNetPacket : function() {
		var cmdInfo = Structs.PacketInfo.decode(this.demoBuffer)
			, cmdSequence = Structs.PacketSequence.decode(this.demoBuffer)
			, cmdLength = Structs.PacketLength.decode(this.demoBuffer)
			, message = {}
			, decoded = Q.defer();

		console.log('CMD INFO ', cmdInfo, cmdSequence, cmdLength);
		if (cmdInfo.command != 0) {
			console.log('NO 0')
			process.exit(code=0);	
		} 

		var rawData = this._extractRawPacket(cmdLength.value); // slice a new buffer containing the message
		
		this._decodeRawMessages(rawData, decoded); // decode every message from the packet and exec cb
		return decoded.promise;

		// console.log(rawData.length)
		// console.log('info', cmdInfo, 'sequence', cmdSequence, 'length', cmdLength);
	},

	_decodeRawMessages : function(packetBuffer, decodePromise) {
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
			
			//var messageType = this.net_messages[cmd];
			var protoCallback = this._getCmdCallback(cmd);
			if (protoCallback) { // skip to the next message if type not found in net_messages
				// wrap the message in an object with the command as key
				var wrappedMsg = {};
				wrappedMsg[protoCallback] = this.protobuf[protoCallback].decodeDelimited(packetBuffer.slice(offset + cmdSize));
				messages.push(wrappedMsg); // decode the message

				console.log('-- DECODING : ', protoCallback);
			} else {
				console.log('-- SKIPPING CMD ', cmd);
			}
			
			offset += messageHeaderLength + messageLength;
			//if (cmd == 9) console.log(messages)
		}

		decodePromise.resolve(messages);
		//cb(messages);
	},

	_getCmdCallback : function(cmd) {
		console.log('Getting CMD CALLBACK');
		var protoCallback = '';
		for (var message in this.protobuf.SVC_Messages) {
			if (this.protobuf.SVC_Messages[message] == cmd) {
				protoCallback = message.split('svc_');
				protoCallback = "CSVCMsg_" + protoCallback[1]
			}
		}
		
		console.log('REQUESTED CMD : ', protoCallback);
		return protoCallback;	

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

module.exports = MessageDecoder;