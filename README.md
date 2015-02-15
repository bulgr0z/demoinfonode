# Demoinfonode

### What is it ?
A javascript parser for cs:go .dem files, based on on NodeJS streams API.

### What does it decode ?
At the moment the only available decoders are the proto decoders.
This mainly means that you wont get (yet) the player info (ie. camera/position vectors).

### Usage

**Please note** : This project makes use of ES6 features: it is recommanded to run it with [iojs](https://iojs.org). If you want to run it with nodejs, you'll have to do it with the `--harmony` flag.


```
// Provide a readable stream to parse
var readableStream = Fs.createReadStream('/path/to/demo.dem');

// Instantiate the packet parser & decoder
var packetParser = new PacketParser();
var packetDecoder = new PacketDecoder();

// Pipe the stream and get decoded packets
readableStream.pipe(packetParser).pipe(packetDecoder);
packetDecoder.on('data', function(packet) {
  // do stuff
});
```