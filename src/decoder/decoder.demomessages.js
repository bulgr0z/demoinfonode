var Util = require('util')
	, Varint = require('varint')
	, ProtoBuff = require('protobufjs')
	, ByteBuffer = require('bytebuffer')
	, _ = require('lodash');

// Concat of netmessages.proto & cstrike15_usermessages.proto
// -> simplifies imports & namespacing
var CSGOMessages = require('./decoder.proto.js');

// Invert the message names enums to lookup names by cmd
// when resolving a message header.
var invNet = _.invert(
	CSGOMessages.lookup('CSGOMessages.NET_Messages').build());
var invSvc = _.invert(
	CSGOMessages.lookup('CSGOMessages.SVC_Messages').build());
var invUser = _.invert(
	CSGOMessages.lookup('CSGOMessages.ECstrike15UserMessages').build());

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
		// extract metadata
		var meta = this.getMessageMetadata_();
		// decode & return
		yield new DemoMessage(
			meta, this.data);
	}
};

// iterates messages over the packet data
DemoMessages.prototype.decodeMessages_ = function() {
	for (var message of this.getNextMessage_())
		this.messages.push(message);
};

// Decode the message's meta from the chunk and offset
DemoMessages.prototype.getMessageMetadata_ = function() {
	// Get message cmd & message size from the ByteBuffer,
	// reading will offset the buffer
	var messageCmd = this.data.readVarint32();
	var messageLength = this.data.readVarint32();
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
	// Decode the root message
	var netMessage = this.decodeMessage(
		netMessageName,
		data,
		this.byteSize);
	// we have a nested UserMessage, decode it
	if (netMessageName === 'CSVCMsg_UserMessage') {
		var userMessageName = this.getMessageName('user', netMessage.msg_type);
		// Decode a nested UserMessage with the cmd & buffer found in
		// in the root NetMessage
		userMessage = this.decodeMessage(
			userMessageName,
			netMessage.msg_data,
			netMessage.msg_data.remaining());

		// set the message
		this.message = userMessage;
		this.messageName = userMessageName;
	} else {
		// no user message, the message is the netMessage
		this.message = netMessage;
		this.messageName = netMessageName;
	}
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
		if (cmd in invNet)
			messageName = buildMsgName('CNETMsg', invNet[cmd]);
		if (cmd in invSvc)
			messageName = buildMsgName('CSVCMsg', invSvc[cmd]);
	}
	if (type === 'user') {
		if (cmd in invUser)
			messageName = buildMsgName('CCSUsrMsg', invUser[cmd]);
	}
	return messageName;
};

DemoMessage.prototype.setMessageType = function(cmd) {
	if (cmd in _.invert(CSGOMessages.NET_Messages))
		this.messageType = 'NET';
	if (cmd in _.invert(CSGOMessages.SVC_Messages))
		this.messageType = 'SVC';
};

DemoMessage.prototype.decodeMessage = function(messageName, data, size) {
	// The given command was not found in the proto enums
	// TODO should keep some stats on these
	if (!messageName) {
		data.skip(size);
		return null;
	}

	var Message = CSGOMessages.lookup('CSGOMessages.' + messageName);
	return Message.decode(data, size);
};
