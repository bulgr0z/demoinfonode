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

var Util = require('util')
	, Varint = require('varint')
	, ProtoBuff = require('protobufjs')
	, ByteBuffer = require('bytebuffer')
	, _ = require('lodash');
// Proto
var NetMessage = require('./decoder.proto.js').NetMessage;
var NetMessageBuilder = require('./decoder.proto.js').NetMessageBuilder;

// A DataTableMessage collection.
var DataTableMessages = function(meta, data) {
	// wrap data in a ByteBuffer; offers pretty cool stuff like
	// varint32 decoding with a nice offset set.
	// TODO : Decoders should handle their data as a ByteBuffer instead
	// of node's native buffers.
	this.data = ByteBuffer.wrap(data);
	this.metadata = data;
	// unique DataTableMessages
	this.isEnd = false;
	this.messages = [];
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
		// NOTE : decoding a message from a ByteBuffer with Protobufjs
		// will nicely set the buffer's offset for us. -> We don't need to keep track
		// of `data` cursor.
		var model = new DataTableMessage(this.data);
		// last message has `is_end:true`
		if (model.message.$get('is_end'))
			this.isEnd = true;

		yield model; // return message
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
	this.type = null;
	this.byteSize = 0;
	this.message = this.decodeDataTable(data);
};

DataTableMessage.prototype.decodeDataTable = function(data) {
	// read DataTable type & size
	this.type = data.readVarint32();
	this.byteSize = data.readVarint32();

	var Message = NetMessageBuilder.lookup('NetMessages.CSVCMsg_SendTable');
	var group = Message.isGroup;
	return Message.decode(data, this.byteSize, 1);
};