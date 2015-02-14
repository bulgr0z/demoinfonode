var Util = require('util')
	, Varint = require('varint')
	, ProtoBuff = require('protobufjs')
	, _ = require('lodash');
// Proto
var NetMessageProto = require('../../protobuf/netmessages.proto.json');
var UserMessageProto = require('../../protobuf/usermessages.proto.json');

var NetMessageBuilder = new ProtoBuff.Builder(); // <3 protobufjs
NetMessageBuilder.import(NetMessageProto); // import proto in the builder
var NetMessage = NetMessageBuilder.build(); // return the messages namespace

var UserMessageBuilder = new ProtoBuff.Builder();
UserMessageBuilder.import(UserMessageProto);
var UserMessage = UserMessageBuilder.build();


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

DemoMessages.prototype.getMessages = function() {
	for (var message of this.getNextMessage())
		this.messages.push(message);
};

DemoMessages.prototype.toJSON = function() {
	return {
		metadata: this.metadata,
		messages: this.messages
	};
};

// iterator func
DemoMessages.prototype.getNextMessage_ = function* () {
	while (this.data.length > 0) {
		var meta = this.getMessageMetadata_();
		// extract the message's raw data
		var encodedMessage = this.data.slice(0, meta.length);
		this.data = this.data.slice(meta.length); // offset this.data
		// get the message model
		var message = new DemoMessage(
			meta, encodedMessage);
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
	var messageCmd = Varint.decode(this.data);
	// offset buffer with the size (B) of the decoded varint
	this.data = this.data.slice(Varint.decode.bytes);
	// message length
	var messageLength = Varint.decode(this.data);
	this.data = this.data.slice(Varint.decode.bytes); // offset
	return {
		cmd: messageCmd,
		length: messageLength
	};
};


/**
 * @constructor {DemoMessage} a single DemoMessage
 * @param {Object} packetMeta The message's metadata
 * @param {Buffer} data The message's raw data
 */
var DemoMessage = function(packetMeta, data) {
	this.setMessageType(packetMeta.cmd);
	this.setMessageName(packetMeta.cmd);
	this.message = this.decodeMessage(data);
};

DemoMessage.prototype.setMessageName = function(cmd) {
	// messages in the enum are referenced as svc_ or net_
	// but named as CSVCMsg_ or CNETMsg_.
	var buildMsgName = function(prefix, name) {
		var split = name.split('_');
		return prefix + '_' + split[1];
	};

	// invert enums to look up the names by cmd
	// lodash is awesome
	var invNet = _.invert(NetMessage.NET_Messages);
	var invUser = _.invert(UserMessage.SVC_Messages);

	if (cmd in invNet)
		this.messageName = buildMsgName('CNETMsg', invNet[cmd]);
	if (cmd in invUser)
		this.messageName = buildMsgName('CSVCMsg', invUser[cmd]);
};

DemoMessage.prototype.setMessageType = function(cmd) {
	if (cmd in _.invert(NetMessage.NET_Messages))
		this.messageType = 'NET';
	if (cmd in _.invert(NetMessage.SVC_Messages))
		this.messageType = 'SVC';
};


DemoMessage.prototype.decodeMessage = function(data) {
	// The given command was not found in the proto enums
	// TODO should keep some stats on these
	if (!this.messageName)
		return null;
	// decode the message
	return NetMessage[this.messageName].decode(data);
};