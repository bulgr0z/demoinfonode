var Bufferpack = require('bufferpack')
	, Util = require('./utils.js');

/**
 * Collection of helpers to decode the binary structs from a demofile.
 * Each helper exposes a convenience `decode` method.
 *
 * Usage exemple : var decoded = Structs.Header.decode(buffer)
 */
var Structs = {

	/**
	 * Header of the demofile, contains basic info such as protocols used, map, servername, etc.
	 */
	DemoHeader : {

		length : 1072,
		// "<" defines little-endianness
		format : '<8s(demoType)i(demoProtocol)i(netProtocol)260s(hostName)260s(clientName)260s(mapName)260s(gameDir)f(time)i(ticks)i(frames)i(signOn)'

	},

	/**
	 * Metadata of a demo packet; contains a command (signon, usercmd, etc..), the current tick and playerslot (?)
	 */
	PacketMetadata : {

		length : 6,
		format : '<B(cmd)i(tick)B(playerSlot)'

	},

	/**
	 * First header of a demo packet, 152 bytes of wtf
	 */
	PacketInfo : {

		// cmdinfo should be the first int32 found
		// 152B = 72x2 (for splitscreen)
		length : 152,
		format : '<i(command)'

	},

	/**
	 * Second header of a demo packet, not useful (?)
	 */
	PacketSequence : {

		length : 8,
		format : '<i(in)i(out)'

	},

	/**
	 * Third header of a demo packet, defines the packet's data size (and thus, the end of the packet)
	 */
	PacketLength : {

		length : 4,
		format : '<i(packetSize)'

	}

};

// Extends the structs with a `decode` method
for (var struct in Structs) {
	Structs[struct]['decode'] = function(buffer) {
		var decoded = Bufferpack.unpack(this.format, buffer);
		return Util.trimObject(decoded); // trim strings whitespace
	};
}

module.exports = Structs;