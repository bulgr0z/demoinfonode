var Structs = require('./structs.js')
	, MessageDecoder = require('./messagedecoder.js');

module.exports = function(demoBuffer, outputStream) {
	
	this.demoBuffer = demoBuffer;
	this.outputStream = outputStream;

	this.messageDecoder = new MessageDecoder(this.demoBuffer);

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

	commands : {
		1 : 'signon',
		2 : 'packet',
		3 : 'syntick',
		4 : 'consolecmd',
		5 : 'usercmd',
		6 : 'datatables',
		7 : 'stop',
		8 : 'customdata',
		9 : 'stringtables'
	},
	
	readHeader : function() {
		var header = Structs.Header.decode(this.demoBuffer);
		if (header.demoType === 'HL2DEMO') this.isValidDemo = true;

		this.output(header, "DEMO HEADER");
	},

	readNextFrame : function() {
		var header = Structs.CmdHeader.decode(this.demoBuffer);

		switch (this.commands[header.cmd]) {
			case 'packet' :
			case 'signon' :
				console.log('signon packet', this.demoBuffer.getCursor());

				var message = this.messageDecoder.decodeNetPacket(function(messages) {
					console.log('JOB DONE ?')
					console.log(msg)
				});

				// console.log(this.demoBuffer)
				// var cmdinfo = Structs.CmdInfo.decode(this.demoBuffer);
				// console.log(cmdinfo)
				// console.log(this.demoBuffer)
				break; 

			case 'stop' : 

				break;

			case 'stringtables' :
			case 'datatables' :
			case 'consolecmd' :
				break;

			case 'syntick' :
				break;
		}

		console.log('CMD : ', header);
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

