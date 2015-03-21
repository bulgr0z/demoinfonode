var Stream = require('stream')
  , Util = require('util')
  , _ = require('lodash');

// @param Array.<string> events The events to get
var GameEvents = function(events) {
  Stream.Transform.call(this, {objectMode: true});

  this.events = events;
  this.eventsById = {};
}

Util.inherits(GameEvents, Stream.Transform);
module.exports = GameEvents;

GameEvents.prototype._transform = function(packet, encoding, done) {

  var decoded = this.decodeEvents(packet);
  if (decoded) this.push(decoded);

  return done();
};


GameEvents.prototype.decodeEvents = function(packet) {

  var decoded = {};
  var hasGameEvent = false;
  var meta = packet.metadata;

  packet.messages.forEach(function(msg) {

    if (msg.messageName === 'CSVCMsg_GameEvent') {

      decoded['tick'] = meta.tick;
      var message = msg.message;

      if (this.eventsById[message.eventid]) {
        var eventType = this.eventsById[message.eventid].name;

        var gameevent = this.handleGameEvent(message, this.eventsById[message.eventid].keys);

        if (!decoded[eventType])
          decoded[eventType] = [];

        decoded[eventType].push(gameevent);
        hasGameEvent = true;
      }
    }

    if (msg.messageName === 'CSVCMsg_GameEventList') {

      msg.message.descriptors.forEach(function(descriptor) {
        // if we have to handle this event
        if (this.events.indexOf(descriptor.name) > -1) {
          this.eventsById[descriptor.eventid] = descriptor;
        }
      }, this);
    }

  }, this);

  if (hasGameEvent)
    return decoded;

  return false;
};

GameEvents.prototype.handleGameEvent = function(message, eventKeys) {

  var decoded = {};
  message.keys.forEach(function(key, index) {
    var type = key.type;
    var name = eventKeys[index].name;
    var indexes = Object.keys(key);
    decoded[name] = key[indexes[type]];
  });
  return decoded;
};

// {
//  "byteSize": 9,
//  "message": {
//   "event_name": null,
//   "eventid": 162,
//   "keys": [
//    {
//     "type": 4,
//     "val_string": null,
//     "val_float": null,
//     "val_long": null,
//     "val_short": 12,
//     "val_byte": null,
//     "val_bool": null,
//     "val_uint64": null,
//     "val_wstring": null
//    }
//   ]
//  },
//  "messageName": "CSVCMsg_GameEvent"
// }
// {
//  "byteSize": 24,
//  "message": {
//   "event_name": null,
//   "eventid": 124,
//   "keys": [
//    {
//     "type": 4,
//     "val_string": null,
//     "val_float": null,
//     "val_long": null,
//     "val_short": 10,
//     "val_byte": null,
//     "val_bool": null,
//     "val_uint64": null,
//     "val_wstring": null
//    },
//    {
//     "type": 1,
//     "val_string": "ak47",
//     "val_float": null,
//     "val_long": null,
//     "val_short": null,
//     "val_byte": null,
//     "val_bool": null,
//     "val_uint64": null,
//     "val_wstring": null
//    },
//    {
//     "type": 6,
//     "val_string": null,
//     "val_float": null,
//     "val_long": null,
//     "val_short": null,
//     "val_byte": null,
//     "val_bool": false,
//     "val_uint64": null,
//     "val_wstring": null
//    }
//   ]
//  },
//  "messageName": "CSVCMsg_GameEvent"
// }