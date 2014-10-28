/**
 * TODO :: Decode devrait etre une seule function ? (genre extended sur chaque struct)
 *
 * Reading a struct from the stream will automatically offset the buffer's pointer
 *
 */

var Binary = require('binary')
	, Bufferpack = require('bufferpack')
	, Util = require('./utils.js');

module.exports = {

	Header : {

		length : 1072,
		// "<" defines little-endianness
		format : "<8s(demoType)I(demoProtocol)I(netProtocol)260s(hostName)260s(clientName)260s(mapName)260s(gameDir)f(time)I(ticks)I(frames)I(signOn)",

		decode : function(demoBuffer) {
			var decoded = Bufferpack.unpack(this.format, demoBuffer.getBuffer(), demoBuffer.getCursor());
			demoBuffer.setOffset(this.length);
			
			return Util.trimObject(decoded);
		}

	},

	CmdHeader : {

		length : 6,
		format : "<B(cmd)I(tick)B(playerSlot)",

		decode : function(demoBuffer) {
			var decoded = Bufferpack.unpack(this.format, demoBuffer.getBuffer(), demoBuffer.getCursor());
			demoBuffer.setOffset(this.length);
			
			return Util.trimObject(decoded);
		}

	},

	CmdInfo : {

		// cmdinfo should be the first int32 fount 
		// 152B = 72x2 (for splitscreen)
		length : 152,
		format : "<I(command)",

		decode : function(demoBuffer) {
			var decoded = Bufferpack.unpack(this.format, demoBuffer.getBuffer(), demoBuffer.getCursor());
			demoBuffer.setOffset(this.length);
			
			return Util.trimObject(decoded);
		}

	},

	CmdSequence : {

		length : 8,
		format : "<I(in)I(out)",

		decode : function(demoBuffer) {
			var decoded = Bufferpack.unpack(this.format, demoBuffer.getBuffer(), demoBuffer.getCursor());
			demoBuffer.setOffset(this.length);
			
			return Util.trimObject(decoded);
		}

	},

	CmdLength : {

		length : 4,
		format : "<i(value)",

		decode : function(demoBuffer) {
			var decoded = Bufferpack.unpack(this.format, demoBuffer.getBuffer(), demoBuffer.getCursor());
			demoBuffer.setOffset(this.length);
			
			return Util.trimObject(decoded);
		}

	}

};
