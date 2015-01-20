var Binary = require('binary')
	, Bufferpack = require('bufferpack')
	, Util = require('./utils.js');

// UPDATE 2015 -
// PacketInfo contains the FULL HEADER of a packet, up to the start of
// the unerlying Message. Could be then split up by the Parser into
// a `packetMeta` and `messageMeta` if it is really necessary


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
		// cmdinfo should be the first int32 found
		// 152B = 72x2 (for splitscreen)
		length : 164,
		format : "<I(command)148s(playerinfo)I(in)I(out)i(size)"
	},

	/**
	 * Second header of a demo packet, not useful (?)
	 */
	// PacketSequence : {
	// 	length : 8,
	// 	format : "<I(in)I(out)"
	// },

	/**
	 * Third header of a demo packet, defines the packet's data size (and thus, the end of the packet)
	 */
	// PacketLength : {
	// 	length : 4,
	// 	format : "<i(value)"
	// }

};

// Extends the structs with a `decode` method
for (var struct in Structs) {
	Structs[struct]['decode'] = function(buffer) {

		var decoded = Bufferpack.unpack(this.format, buffer);

		return Util.trimObject(decoded);
	};
}

module.exports = Structs;