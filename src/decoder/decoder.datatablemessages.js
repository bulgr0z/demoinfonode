// DataTable
//  - Begin loop 
//		Read datatable message
//		`is_end=true` message prop
//		break
//	- End loop
//
// There could be 1 or more messages in the packet
// wont be able to get a size to slice the buffer for a message
// demoinfogo seems like its looping over the message attributes until
// it encounters is_end ?
//
// Cant decode a non delimited buffer, could read by hand ?
// see protobufjs#3090 for example

var Util = require('util')
	, Varint = require('varint')
	, ProtoBuff = require('protobufjs')
	, _ = require('lodash');
// Proto
var NetMessage = require('./decoder.proto.js').NetMessage;

// var NetMessageBuilder = new ProtoBuff.Builder();
// NetMessageBuilder.import(NetMessageProto);
// var NetMessage = NetMessageBuilder.build();

// console.log(NetMessage)
// A DataTableMessage collection.
var DataTableMessages = function(meta, data) {
	// this.messages = [];
	console.log('Construct DataTableMessages');
	this.data = data;
	this.metadata = data;
	// unique DataTableMessages
	this.isEnd = false;

	this.decodeMessages_();
};

module.exports = DataTableMessages;

DataTableMessages.prototype.toJSON = function() {
	return {
		metadata: this.metadata,
		messages: this.messages
	};
};

// iterator func
DataTableMessages.prototype.getNextMessage_ = function* () {
	// while the last is_end has been decoded
	while (this.isEnd === false) {
		// message should have access to all available data ?
		// we cant predict its size. Maybe better to have a getLeftovers()
		// method on the model to call which would return the leftover data
		// from decoding. Or a getByteSize() that would return the bytes needed to decode.
		console.log('DECODE DATATABLE MESSAGE ');
		var message = new DataTableMessage(this.data);
		console.log('MESSAGE', message)
		process.exit(0);
		yield message; // return message
	}
};

// iterates messages over the packet data
DataTableMessages.prototype.decodeMessages_ = function() {
	for (var message of this.getNextMessage_())
		this.messages.push(message);
};

// DataTableMessage model


/**
 * @constructor {DataTableMessage} a single DataTableMessage
 * @param {Buffer} data The message's raw data
 */
var DataTableMessage = function(data) {
	this.messageName = 'CSVCMsg_SendTable';
	this.message = this.decodeDataTable(data);
};

DataTableMessage.prototype.decodeDataTable = function(data) {
	console.log(NetMessage[this.messageName]);
	return NetMessage[this.messageName].decode(data);
};