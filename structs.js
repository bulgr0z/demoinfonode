var Binary = require('binary')
	, Bufferpack = require('bufferpack')
	, Util = require('./utils.js');

/**
 * Collection of helpers to decode the binary structs from a demofile.
 * Each helper is extended with and exposes a `decode` method. 
 *
 * Usage exemple : var decoded = Structs.Header.decode(buffer)
 */
var Structs = {

	/**
	 * Header of the demofile, contains basic info such as protocols used, map, servername, etc.
	 */
	Header : {

		length : 1072,
		// "<" defines little-endianness
		format : "<8s(demoType)I(demoProtocol)I(netProtocol)260s(hostName)260s(clientName)260s(mapName)260s(gameDir)f(time)I(ticks)I(frames)I(signOn)"

	},

	/**
	 * Metadata of a demo packet; contains a command (signon, usercmd, etc..), the current tick and playerslot (?)
	 */
	PacketMetadata : {

		length : 6,
		format : "<B(cmd)I(tick)B(playerSlot)"

	},

	/**
	 * First header of a demo packet, 152 bytes of wtf
	 */
	PacketInfo : {

		// cmdinfo should be the first int32 fount 
		// 152B = 72x2 (for splitscreen)
		length : 152,
		format : "<I(command)"

	},

	/**
	 * Second header of a demo packet, not useful (?)
	 */
	PacketSequence : {

		length : 8,
		format : "<I(in)I(out)"

	},

	/**
	 * Third header of a demo packet, defines the packet's data size (and thus, the end of the packet)
	 */
	PacketLength : {

		length : 4,
		format : "<i(value)"

	}

};

// Extends the structs with a `decode` method
for (var struct in Structs) {
	Structs[struct]['decode'] = function(demoBuffer) {
		var decoded = Bufferpack.unpack(this.format, demoBuffer.getBuffer(), demoBuffer.getCursor());
		demoBuffer.setOffset(this.length);
		
		return Util.trimObject(decoded);
	};
}

module.exports = Structs;