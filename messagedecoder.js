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
		4 : 'CNETMsg_Tick'
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
			, result = {};

		var count = 0; // debug
		while (!decoded) {
			var cmd = Varint.decode(packetBuffer.slice(offset, offset + 4));
			var size = Varint.decode(packetBuffer.slice(offset + 4, offset + 8));

			console.log("wut ?", cmd, size, offset)
			if (cmd == 0) break; // 0 is not a valid cmd, need better error handling
			if (count > 3) break; // debug

			var messageType = this.net_messages[cmd];
			console.log('COMMAND: ', messageType, cmd, offset+4)
			result[messageType] = this.protobuf[messageType].decodeDelimited(packetBuffer.slice(offset + 4)); // decode the message
			offset = offset + 8 + result[messageType].calculate(); // offset the command and message length 

			console.log(result, offset, result[messageType].calculate())
			count ++ // debug
			//	decoded = true;
		}

		// function getMessageCommand(packetBuffer) {
		// 	return packetBuffer.slice(0, 4);
		// };

		// function decodeMessage(message) {
		// 	console.log(this.protobuf)
		// };

		// var message = this._extractMessageFromPacket(packetBuffer, offset);
		// console.log(message.length)

		// try {
		// 	//var decoded = this.protobuf.CSVCMsg_ServerInfo.decode(message);
		// 	var decoded = this.protobuf.CSVCMsg_ServerInfo.decodeDelimited(message)
		// } catch(e) {
		// 	console.log(e, e.decoded);
		// }
		// console.log(decoded);
		// console.log(decoded.calculate());
		// csgo.CSVCMsg_UserMessage.decode(data);

		//console.log(offset)

		// var cmd = packetBuffer.readUInt32LE(0);
		// var size = packetBuffer.readUInt32LE(4);
		// console.log('cmd: ', cmd, '| size: ', size);
		// var cmd = Varint.decode(packetBuffer.slice(0, 4));
		// var size = Varint.decode(packetBuffer.slice(4, 8));

		// var cmd2 = Varint.decode(packetBuffer.slice(8+size, 16+size));
		// var size2 = Varint.decode(packetBuffer.slice(16+size, 20+size));
		// console.log('cmd: ', cmd, '| size: ', size);
		// console.log('cmd2: ', cmd2, '| size2: ', size2);


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