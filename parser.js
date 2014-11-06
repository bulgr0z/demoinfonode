var Structs = require('./structs.js')
	, MessageDecoder = require('./messagedecoder.js')
	, Q = require('q');

module.exports = function(demoBuffer, outputStream) {
	
	this.demoBuffer = demoBuffer;
	this.outputStream = outputStream;

	this.messageDecoder = new MessageDecoder(this.demoBuffer);

	this.readHeader();

	this.packetCount = {
		1 : 0,
		2 : 0,
		3 : 0,
		4 : 0,
		5 : 0,
		6 : 0,
		7 : 0,
		8 : 0,
		9 : 0
	};

	this.loop(this.readNextFrame.bind(this)).then(function() {
		console.log('WTF DONE ?')
	}).catch(function(e) {
		console.log('BAD STUFF ', e)
	});
	// start parser loop
	//this.readNextFrame();

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

	/**
	 * Reads each `frame` of the demo (each frame containing 0 or more protobuf messages)
	 *
	 */
	readNextFrame : function() {
		var header = Structs.CmdHeader.decode(this.demoBuffer);

		console.log('+++ READING NEW FRAME. HEADER COMMAND : ', header)
		
		// var promiseNextFrame = Q.promise(function() {
		// 	this.output(messages, '-- PACKET --'); // write to buffer
		// 	this.readNextFrame(); // get back to the loop
		// }.bind(this));
		
		// if (this.commands[header.cmd] == 5) {
		// 	console.log('5555555555')
		// 	process.exit(code=0);

		// }

		this.packetCount[header.cmd] += 1;

		switch (this.commands[header.cmd]) {
			case 'packet' :
			case 'signon' :

				// this.messageDecoder.decodeNetPacket(this._decodedFrameCallback.bind(this))
				return this.messageDecoder.decodeNetPacket()

				// var message = this.messageDecoder.decodeNetPacket(function(messages) {
				// 	// console.log('JOB DONE ?')
				// 	// console.log(msg)
				// 	this.output(messages);
				// 	this.readNextFrame(); // get back to the loop
				// }.bind(this));

				// console.log(this.demoBuffer)
				// var cmdinfo = Structs.CmdInfo.decode(this.demoBuffer);
				// console.log(cmdinfo)
				// console.log(this.demoBuffer)
				break; 

			case 'usercmd' : 

			// ECstrike15UserMessages: 
			//   { CS_UM_VGUIMenu: 1,
			//     CS_UM_Geiger: 2,
			//     CS_UM_Train: 3,
			//     CS_UM_HudText: 4,
			//     CS_UM_SayText: 5,

				console.log('USER CMD !')
				break;

			case 'stop' : 
				console.log('DEMO END ! this silly parser made it.')
				break;

			case 'stringtables' :
			case 'datatables' :
			case 'consolecmd' :

				return this.messageDecoder.decodeRawPacket();
				//this.messageDecoder.decodeRawPacket(this._decodedFrameCallback.bind(this));
				break;

			case 'syntick' :
				// this.output(header, 'SYNTICK');
				// this.readNextFrame(); // continue
				var dummy = Q.defer();
				dummy.resolve([]); // dummy, was breaking the loop
				return dummy.promise;
				break;
		}


		console.log("packet count : ", this.packetCount)
		console.log('CMD : ', header);
	},

	loop : function(cb) {
		console.log('THEN	 !', cb)
		return cb().then(function(decodedPacket) {
			this.output(decodedPacket, 'PACKET ?')
			return this.loop(cb);
		}.bind(this));
	},

	// called on the last frame / error
	demoEnd : function() {
		this.outputStream.end();
	},
  
  // outputs messages
	output : function(message, title) {
		this._outputString(message, title)
	},

	/**
	 * Generic callback used by readNextFrame when messages are decoded
	 * Writes the received messages on the buffer and reads the next frame.
	 */
	_decodedFrameCallback : function(messages) {
		this.output(messages, '-- PACKET --'); // write to buffer
		this.readNextFrame(); // get back to the loop
	},

	_outputString : function(message, title) {				
		var header = '';
		if (typeof title === 'string') header = "----- " + title + "\n";
		console.log('write')
		this.outputStream.write(header + JSON.stringify(message, null, 4) + "\n\n");
	}

};

