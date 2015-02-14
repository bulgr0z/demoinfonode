var Util = require('util')
	, Stream = require('stream')
	, Varint = require('varint')
	, ProtoBuff = require('protobufjs')
	, Q = require('q')
	, _ = require('lodash')
	, Structs = require('../utils/structs.js');
// Proto
var NetMessageProto = require('../../protobuf/netmessages.proto.json');
var UserMessageProto = require('../../protobuf/usermessages.proto.json');

var NetMessageBuilder = new ProtoBuff.Builder(); // <3 protobufjs
NetMessageBuilder.import(NetMessageProto); // import proto in the builder
var NetMessage = NetMessageBuilder.build(); // return the messages namespace

var UserMessageBuilder = new ProtoBuff.Builder();
UserMessageBuilder.import(UserMessageProto);
var UserMessage = UserMessageBuilder.build();


// The `DemoMessages` iterator to decode 1 or more `DemoMessage`
var DemoMessages = function(data) {
	this.messages = [];
	this.data = data;
	console.log('construct DemoMessages')
};

module.exports = DemoMessages;

// iterator func
DemoMessages.prototype.getNextMessage = function* () {
	console.log('get next message ', this.data.length)
	while (this.data.length > 0) {
		console.log('Iterator data length', this.data.length)
		var meta = this.getMessageMetadata();
		// extract the message's raw data
		var encodedMessage = this.data.slice(0, meta.length);
		this.data = this.data.slice(meta.length); // offset this.data
		// get message model
		var message = new DemoMessage(
			meta, encodedMessage
		);
		console.log('ITERATOR BUILT A MESSAGE', message);
		yield message;
	}
};

// Decode the message's meta from the chunk and offset
DemoMessages.prototype.getMessageMetadata = function() {
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
	// return PacketDecoder.Format.messageMetadata(
	// 	messageCmd, messageLength, chunk);
};


/**
 * @constructor {DemoMessage} a single DemoMessage
 * @param {Object} packetMeta The message's metadata
 * @param {Buffer} data The message's raw data
 */
var DemoMessage = function(packetMeta, data) {
	// console.log('construct proto packet');
	// console.log(NetMessage);

	this.setMessageType(packetMeta.cmd);

	this.setMessageName(packetMeta.cmd);

	console.log('message type ? ', this.messageType);
	console.log('message name ? ', this.messageName);
	console.log('data length ? ', data.length);


	this.message = this.decodeMessage(data);
};

// TODO : inherit from generic `Packet` which would provide getters
// Util.inherits(PacketDecoder, Stream.Transform);

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

	return NetMessage[this.messageName].decode(data);

	// if (this.messageType === 'SVC')
	// 	return UserMessage[this.messageName].decode(data);
	// NET_Messages
	// SVC_Messages
	// var messageName = NetMessage[this.messageType][_.invert(NetMessage.SVC_Messages)]
	// return NetMessage[]
};