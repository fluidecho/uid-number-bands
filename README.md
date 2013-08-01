## Unique ID number generator within band ranges

Unique identifier (ID) number generator within band ranges, by multiple generators in sequential order. A node.js module, however could be adapted for other systems.

### Goals

- to be unique.
- to be a integer.
- to be represented as a nanosecond.
- to be issued sequentially.
- to be scalable by multiple generators.

### Reason

This schema, was developed for Kurunt, the scalable message processing framework, where you have multiple inputs receiving messages for processing that each require a unique ID represented as a sequential integer in nanosecond format.

### Examples

1374207372000000001  
1374207372000000002  
1374207372000000003  
...  


### Installation

```js
npm install uid-number-bands
```

### Usage

```js
var uidNumberBands = require('uid-number-bands');

var BAND = 0;
var BANDS = 100;

uidNumberBands.init(BAND, BANDS, function() {

	var id = uidNumberBands.make();
	console.log( 'id: ' + id );
	
	var idNormalized = uidNumberBands.normalize(id);
	console.log( 'idNormalized: ' + idNormalized );
	
});

```

### Limitations

- A maximum of 1 billion IDs can be issued per second with a 64 bit system.
- This ID schema will exceed the nanoseconds 19 chars when unixtime exceeds 9999999999 on Sat, 20 Nov, 2286 17:46:39 GMT.
- Because nanoseconds exceeds ECMA (javascripts) largest number, returned as string representing nanosecond integer.

### License

MIT or Apache 2.0

