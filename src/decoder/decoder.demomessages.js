var Util = require('util')
	, Varint = require('varint')
	, ProtoBuff = require('protobufjs')
	, ByteBuffer = require('bytebuffer')
	, _ = require('lodash');
// Proto
var NetMessageProto = require('../../protobuf/netmessages.proto.json');
var UserMessageProto = require('../../protobuf/usermessages.proto.json');

var NetMessage = require('./decoder.proto.js').NetMessage;
var NetMessageBuilder = require('./decoder.proto.js').NetMessageBuilder;

var UserMessage = require('./decoder.proto.js').UserMessage;
var UserMessageBuilder = require('./decoder.proto.js').UserMessageBuilder;

// TODO the collection should be able to whitelist/blacklist packets
// (as in, not even decoded, purely skiped)

// A DemoMessage collection.
// Decodes all messages from the given data chunk on construct.
// Note : the decoding is done with an ES6 iterator.
var DemoMessages = function(metadata, data) {
	this.messages = [];
	this.metadata = metadata;
	this.data = data;

	this.decodeMessages_();
};

module.exports = DemoMessages;

DemoMessages.prototype.toJSON = function() {
	return {
		metadata: this.metadata,
		messages: this.messages
	};
};

// iterator func
DemoMessages.prototype.getNextMessage_ = function* () {
	while (this.data.remaining() > 0) {
		var meta = this.getMessageMetadata_();
		// extract the message's raw data
		// var encodedMessage = this.data.slice(0, meta.length);
		// this.data = this.data.slice(meta.length); // offset this.data
		// get the message model
		// console.log('\nMETA length ', meta.length)

		var message = new DemoMessage(
			meta, this.data);
		// console.log('\n\n AFTER MESSAGE ',this.data, this.data.remaining());
		yield message; // return message
	}
};

// iterates messages over the packet data
DemoMessages.prototype.decodeMessages_ = function() {
	for (var message of this.getNextMessage_())
		this.messages.push(message);
};

// Decode the message's meta from the chunk and offset
DemoMessages.prototype.getMessageMetadata_ = function() {
	// varint32 encoded message cmd
	// var messageCmd = Varint.decode(this.data);
	var messageCmd = this.data.readVarint32();
	var messageLength = this.data.readVarint32();
	// console.log('\nCMD / SIZE offset ', this.data.offset)
	// offset buffer with the size (B) of the decoded varint
	// this.data = this.data.slice(Varint.decode.bytes);
	// message length
	// var messageLength = Varint.decode(this.data);
	// this.data = this.data.slice(Varint.decode.bytes); // offset
	return {
		cmd: messageCmd,
		length: messageLength
	};
};


// DemoMessage model

// CSVCMsg_GameEventList -> list of game events

// DT_CSPlayer look for this
// --> Next priority should be datatables decoding
// deadflag = 1

/**
 * @constructor {DemoMessage} a single DemoMessage
 * @param {Object} packetMeta The message's metadata
 * @param {Buffer} data The message's raw data
 */
var DemoMessage = function(packetMeta, data) {
	// The base message is always a NetMessage, but there can be
	// anything nested in this message (UserMessage, stringtable, etc..)
	this.setMessageType(packetMeta.cmd);
	this.byteSize = packetMeta.length;


	var netMessageName = this.getMessageName('net', packetMeta.cmd);
	var netMessage = this.decodeNetMessage(netMessageName, data);
	// console.log('\nNEW DEMO MESSAGE\n', netMessageName, packetMeta.cmd)

	// we have a nested UserMessage, decode it
	if (netMessageName === 'CSVCMsg_UserMessage') {
		// console.log(netMessage, data);
		// process.exit(0)
		var userMessageName = this.getMessageName('user', netMessage.msg_type);
		userMessage = this.decodeUserMessage(userMessageName, netMessage.msg_data);
		// set the message
		this.message = userMessage;
		this.messageName = userMessageName;
	} else {
		// no user message, the message is the netMessage
		this.message = netMessage;
		this.messageName = netMessageName;
	}
	// console.log(this.message)
	// process.exit(0)
};

// Get a message name from a proto enum.
// @param {string} type The message type (eg. 'user' or 'net')
// @param {number} cmd The cmd int
DemoMessage.prototype.getMessageName = function(type, cmd) {
	// messages in the enum are referenced as svc_ or net_
	// but named as CSVCMsg_ or CNETMsg_.
	var buildMsgName = function(prefix, name) {
		var split = name.split('_');
		return prefix + '_' + split.pop();
	};

	var messageName;
	if (type === 'net') {
		// invert enums to look up the names by cmd
		// lodash is awesome
		var invNet = _.invert(NetMessage.NET_Messages);
		var invSvc = _.invert(NetMessage.SVC_Messages);

		if (cmd in invNet)
			messageName = buildMsgName('CNETMsg', invNet[cmd]);
		if (cmd in invSvc)
			messageName = buildMsgName('CSVCMsg', invSvc[cmd]);
	}
	if (type === 'user') {
		var invUser = _.invert(UserMessage.ECstrike15UserMessages);
		if (cmd in invUser)
			messageName = buildMsgName('CCSUsrMsg', invUser[cmd]);
	}
	return messageName;
};

DemoMessage.prototype.setMessageType = function(cmd) {
	if (cmd in _.invert(NetMessage.NET_Messages))
		this.messageType = 'NET';
	if (cmd in _.invert(NetMessage.SVC_Messages))
		this.messageType = 'SVC';
};


DemoMessage.prototype.decodeNetMessage = function(messageName, data) {
	// The given command was not found in the proto enums
	// TODO should keep some stats on these
	if (!messageName) {
		data.skip(this.byteSize);
		return null;
	}
	// offset & decode the message
	// var messageData = data.slice(null, this.byteSize);
	// data.skip(this.byteSize);

	var Message = NetMessageBuilder.lookup('NetMessages.' + messageName);
	// console.log(messageName, this.byteSize, Message.isGroup);
	// return Message.decode(data, this.byteSize);

	// var a = NetMessage.lookup('NetMessages.CSVCMsg_SendTable');
	// console.log('AAA ',a); process.exit(0)
	// console.log(data, messageName)
	// var messageData = data.slice(0, this.byteSize);
	// data.skip(this.byteSize);
	// console.log(messageData instanceof ByteBuffer)
	// console.log('\n', data, '\n', this.byteSize);

	if (messageName === 'CSVCMsg_ClassInfo') {

		// var itemsize = data.readVarint32();
		var decoded = Message.decode(data, this.byteSize);
		// console.log(decoded);
		// process.exit(0);
	} else {
		var decoded = Message.decode(data, this.byteSize);
	}

	// console.log('decoded ', decoded)
	return decoded;
	// var lol;
	// lol = NetMessage[messageName].decode(messageData);
	// return lol
};

DemoMessage.prototype.decodeUserMessage = function(messageName, data) {
	if (!messageName) {
		data.skip(this.byteSize);
		return null;
	}
	// decode the message
	// var messageData = data.slice(null, this.byteSize);
	// data.skip(this.byteSize);
	// console.log(messageName, this.byteSize, data)
	var Message = UserMessageBuilder.lookup('UserMessages.' + messageName);
	return Message.decode(data, data.remaining());
	// return UserMessage[messageName].decodeDelimited(data);
};