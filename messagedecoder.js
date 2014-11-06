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
 * @param {Buffer} demoBuffer - DemoBuffer object to read/offset the packets from
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

	/**
	 * @deprecated as the messages are now infered directly from the proto Enum
	 */
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
	 * Extracts and decodes the next packet from the Buffer.
	 *
	 * @param {string} packetType - packet type infered from the metadata decoded by Parser
	 */
	decodeNextPacket : function(packetType) {

		var $decoded = Q.defer();

		switch (packetType) {
			case 'net' : 
				return this._decodeNetPacket($decoded); 
				break;

			case 'data' : 
				return this._decodeDataPacket($decoded);
				break;

			default : 
				// unable to decode the packet, return dummy promise
				$decoded.resolve([]);
				return $decoded.promise;
		}

	},

	/**	
	 * TODO : Not yet implemented
	 * Decodes raw data (eg. stringtables/datatables) from the packet
	 *
	 * @private
	 * @param {Promise} $decoded - Promise obj to resolve when decoded
	 * @returns {Promise} $decoded.promise - resolved when decoded
	 */
	_decodeDataPacket : function($decoded) {
		var cmdLength = Structs.PacketLength.decode(this.demoBuffer);
		var rawData = this._extractRawPacket(cmdLength.value);
		
		$decoded.resolve([]); // dummy result
		return $decoded.promise;
	},

	/**
	 * Decodes a netpacket (which may contain netmessages, usermessages or both)
	 * 
	 * @private
	 * @param {Promise} $decoded - Promise obj to resolve when decoded
	 * @returns {Promise} $decoded.promise - resolved when decoded
	 */
	_decodeNetPacket : function($decoded) {
		var cmdInfo = Structs.PacketInfo.decode(this.demoBuffer)
			, cmdSequence = Structs.PacketSequence.decode(this.demoBuffer)
			, cmdLength = Structs.PacketLength.decode(this.demoBuffer)
			, message = {};

		console.log('CMD INFO ', cmdInfo, cmdSequence, cmdLength);
		if (cmdInfo.command != 0) {
			console.log('NO 0')
			process.exit(code=0);	
		} 

		var rawData = this._extractRawPacket(cmdLength.value); // slice a new buffer containing the message
		
		this._decodeRawMessages(rawData, $decoded); // decode every message from the packet and exec cb
		return $decoded.promise;

	},

	/**
	 * Decodes 0 or more protobuf messages sliced from the DemoBuffer (ie. the packet's "raw data").
	 *
	 * each message starts with a header of 2 varint32 : 
	 * 	- command (corresponding to a protobuf message)
 	 *	- message length
	 * 	Varints being of `variable` size, we need to keep track of the header size to properly extract the message
	 * 
	 * @private
	 * @param {Buffer} packetBuffer - DemoBuffer slice (raw part of the packet)
	 * @param {Promise} $decoded - Promise obj to resolve when decoded
	 */
	_decodeRawMessages : function(packetBuffer, $decoded) {
		var offset = 0 // progression through the packet
			, messages = [];

		while (offset < packetBuffer.length) {

			var cmd = Varint.decode(packetBuffer.slice(offset))
				, cmdSize = Varint.decode.bytes // header cmd size
				, messageLength = Varint.decode(packetBuffer.slice(offset + cmdSize)) // 
				, messageHeaderLength = cmdSize + Varint.decode.bytes; // ... + bytes needed for messageLength

			var protoCallback = this._getProtoCallback(cmd);
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
		}

		$decoded.resolve(messages);
		
	},

	/**
	 * Iterates over the messages enums of the proto files to find the appropriate callback for the passed cmd
	 *
	 * @private
	 * @param {number} cmd - Message id (varint decoded) to find
	 * @returns {string} protoCallback - Name of the callback corresponding to the provided id
	 */
	_getProtoCallback : function(cmd) {		
		var protoCallback = '';
		for (var message in this.protobuf.SVC_Messages) {
			if (this.protobuf.SVC_Messages[message] == cmd) {
				protoCallback = message.split('svc_');
				protoCallback = "CSVCMsg_" + protoCallback[1]
			}
		}
		
		return protoCallback;	
	},

	/**
	 * Extracts the "raw data" of a packet and offsets the DemoBuffer cursor's for the packet's length
	 * 
	 * @private
	 * @param {number} packetLength - Size (in bytes) of the data (decoded from packet's header)
	 * @returns {Buffer} packet - Sliced buffer containing only the raw data
	 */
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