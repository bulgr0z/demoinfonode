# Demoinfonode

### What is it ?
A javascript parser for cs:go .dem files, based on on NodeJS streams API.

### What does it decode ?
* Most Net messages
* Most User messages
* DataTables

** Todo **

* Stringtables
* Game events

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