var ProtoBuf = require('protobufjs');

var CombinedBuilder = ProtoBuf.loadProtoFile({
	root: process.cwd(),
	file: 'protobuf/combined.proto'
});
var Messages = CombinedBuilder.build('CSGOMessages'); // return the messages namespace

module.exports = CombinedBuilder;