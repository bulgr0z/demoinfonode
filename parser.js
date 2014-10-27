var Structs = require('./structs.js');

module.exports = function(demoBuffer, outputStream) {
	
	this.demoBuffer = demoBuffer;
	this.outputStream = outputStream;

	this.readHeader();

	// start parser loop
	this.readNextFrame();

	// bad bloquant ? des events ca serait plus cool
	// while (!this.demoEnded) {
	// 	this.readNextFrame();
	// }

};

module.exports.prototype = {
	
	demoBuffer : null,
	outputStream : null,
	demoEnded : false,
	isValidDemo : false,
	//preferedOutput : "string",

	readHeader : function() {
		var header = Structs.Header.decode(this.demoBuffer);
		if (header.demoType === 'HL2DEMO') this.isValidDemo = true;

		this.output(header, "DEMO HEADER");
	},

	readNextFrame : function() {
		var cmd = Structs.CmdHeader.decode(this.demoBuffer);
		console.log('CMD : ', cmd);
	},

	// called on the last frame / error
	demoEnd : function() {
		this.outputStream.end();
	},
  
  // outputs messages
	output : function(message, title) {
		this._outputString(message, title)
	},

	_outputString : function(message, title) {
				
		var header = '';
		if (typeof title === 'string') header = "----- " + title + "\n";
		
		this.outputStream.write(header + JSON.stringify(message) + "\n\n");
	}

};
