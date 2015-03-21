var Fs = require('fs')
  , PacketParser = require('./src/parser/packetparser.js')
  , PacketDecoder = require('./src/decoder/decoder.js')
  , GameEvents = require('./src/modeler/modeler.gameevents.js');

// player_connect_full
// player_team
var eventsToDecode = ['player_death', 'player_connect', 'player_disconnect']
// var eventsToDecode = ['player_death', 'player_team', 'player_connect_full']

var entrystream = Fs.createReadStream('/Volumes/MecanicalHD/Dropbox/dev/csgo/demo/match730_003035043074272133283_0536844275_184.dem');
var packetParser = new PacketParser();
var packetDecoder = new PacketDecoder();
var gameEvents = new GameEvents(eventsToDecode);
entrystream.pipe(packetParser).pipe(packetDecoder).pipe(gameEvents);

var cmd = {};
var a = new Date();

packetParser.on('header', function(header) {
  console.log(header)
  // process.exit(0)
})

packetDecoder.on('data', function(packet) {
  // Do stuff with your decoded packet
	if (!cmd[packet.metadata.cmd]) cmd[packet.metadata.cmd] = 0;
	cmd[packet.metadata.cmd] += 1;
	// console.log(JSON.stringify(packet, null, 1))

  var gameevents;
  packet.messages.forEach(function(msg) {
    if (msg.messageName === 'CSVCMsg_GameEvent') {
//      console.log(JSON.stringify(msg, null, 1))
    }
  })
});

gameEvents.on('data', function(data) {
  console.log('\n\nEVENT', data)
});


packetParser.on('data', function(packet) {
 	if (packet.metadata.cmd == 7) { // last demo cmd
	 	var b = new Date();
	 	console.warn('Decoded in : ', (b.valueOf() - a.valueOf()) / 1000 + 's');
	 	console.warn('Packet repartition : ', cmd);
	}
});