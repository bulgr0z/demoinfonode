/**
 * Stats should be able to provide in depth statistics about packets
 *  Eg : "decoded 80% of netmessages" / "40% of undecoded fields were xxx "
 *
 * User should be allowed to format its stats either in json/verbose
 */
var Stats = function(format) {

	if (format) this.format = format;

	// init packetCount
	for (var i = 1; i < 10; i++) {
		this.packetCount[i] = 0;
	}
};

Stats.prototype = {

	reportFormat : "json", // default format
	packetTypes : ["signon", "packet", "syntick", "consolecmd", "usercmd", "datatables", "stop", "customdata", "stringtables"],
	packetCount : {}, // total count, ordered by packet cmd
	packetErrors : {}, // decode errors, ordered by tick

	/**
	 * TODO jsdoc
	 */
	add : function(type, stats) {

		switch (type) {
			case 'packet' : 
				this._addPacket(stats)
				break;

		}

	},

	_addPacket : function(stats) {
		console.log(stats);

		this.packetCount[stats.cmd] += 1;
		//process.exit();
	}

};

module.exports = Stats;