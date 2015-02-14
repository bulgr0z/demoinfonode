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


/**
 * @constructor {DemoMessage}
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
module.exports = DemoMessage;

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