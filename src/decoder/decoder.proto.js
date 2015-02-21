var ProtoBuf = require('protobufjs');
var ProtocolBuffers = require('protocol-buffers');
var fs = require('fs');

// Proto
var NetMessageProto = require('../../protobuf/netmessages2.proto.json');
var UserMessageProto = require('../../protobuf/usermessages.proto.json');

var NetMessageBuilder = new ProtoBuf.Builder();
NetMessageBuilder.import(NetMessageProto);
// var NetMessageBuilder = ProtoBuf.loadProtoFile(__dirname+"/../../protobuf/netmessages_public.proto");
var NetMessage = NetMessageBuilder.build('NetMessages'); // return the messages namespace

var UserMessageBuilder = new ProtoBuf.Builder();
UserMessageBuilder.import(UserMessageProto);
var UserMessage = UserMessageBuilder.build();

// var ProtoNetMessage = ProtocolBuffers(fs.readFileSync(__dirname+'/../../protobuf/netmessages_public.proto'));

var parser = new ProtoBuf.DotProto.Parser(fs.readFileSync(__dirname+'/../../protobuf/netmessages_public.proto'));
var p = parser.parse();

//debugger;

module.exports = {
	UserMessageBuilder: UserMessageBuilder,
	UserMessage: UserMessage,
	NetMessageBuilder: NetMessageBuilder,
	NetMessage: NetMessage
};