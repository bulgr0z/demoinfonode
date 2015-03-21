var ProtoBuf = require('protobufjs')
  , path = require('path');

var CombinedBuilder = ProtoBuf.loadProtoFile({
  root: path.resolve(__dirname, '../../'),
  file: 'protobuf/combined.proto'
});
var Messages = CombinedBuilder.build('CSGOMessages'); // return the messages namespace

module.exports = CombinedBuilder;