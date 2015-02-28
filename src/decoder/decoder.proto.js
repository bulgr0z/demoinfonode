var ProtoBuf = require('protobufjs');
var ProtocolBuffers = require('protocol-buffers');
var fs = require('fs');

// Proto
var NetMessageProto = require('../../protobuf/netmessages.proto.json');
var UserMessageProto = require('../../protobuf/usermessages.proto.json');

var NetMessageBuilder = new ProtoBuf.Builder();
NetMessageBuilder.import(NetMessageProto);
var NetMessage = NetMessageBuilder.build('NetMessages'); // return the messages namespace

var UserMessageBuilder = new ProtoBuf.Builder();
UserMessageBuilder.import(UserMessageProto);
var UserMessage = UserMessageBuilder.build('UserMessages');

module.exports = {
	UserMessageBuilder: UserMessageBuilder,
	UserMessage: UserMessage,
	NetMessageBuilder: NetMessageBuilder,
	NetMessage: NetMessage
};