## Unique ID Generator Within Bands

Unique identifier (ID) number generator within band ranges. 

### Goals

- to be unique.
- to be a integer.
- to be represented as a nanosecond.
- to be issued sequentially.
- to be scalable by multiple generators.

### Reason

This schema, was developed for Kurunt, the scalable message processing framework, where you have multiple inputs receiving messages for processing that each require a __unique__ ID represented as a sequential integer in nanosecond format.

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
var util = require('util');

var BAND = 0;
var BANDS = 100;

// [band, bands, start id at 1, callback function (optional)].
uidNumberBands.init(BAND, BANDS);

// uidNumberBands.make(spacing) returns id object: id.uid, id.idn, id.normalized_uid, id.unixtime, id.freshsec.
var id = uidNumberBands.make();
console.log('set id: ' + util.inspect(id));

// can parse the uid.
var id = uidNumberBands.parse(id.uid);
console.log('parsed id: ' + util.inspect(id));

```

### Bands

BANDS (integer) represents the maximum number of generators. BANDS is divisible by (999,999,999 + 1). The + 1 is because the band range starts at 0.  

BAND (integer) represents the generator being used.  

So if BANDS = 100 then; (999,999,999 + 1) / 100 = 10,000,000 maximum IDs per second per generator (band).  

The ID returned combines unix time and the ID, for example: 1382454272 & 999999999 = "1382454272999999999"

```
100 BANDS = 10,000,000 IDs per second.
------------------------------------------------
| BAND (BANDS = 100) | ID RANGE                |
------------------------------------------------
| 0                  | 000,000,000:009,999,999 |
| 1                  | 010,000,000:019,999,999 |
| 2                  | 020,000,000:029,999,999 |
| 3                  | 030,000,000:039,999,999 |
| 4                  | 040,000,000:049,999,999 |
| 5                  | 050,000,000:059,999,999 |
| 6                  | 060,000,000:069,999,999 |
| 7                  | 070,000,000:079,999,999 |
| 8                  | 080,000,000:089,999,999 |
| 9                  | 090,000,000:099,999,999 |
| 10                 | 100,000,000:109,999,999 |
| 99                 | 990,000,000:999,999,999 |
------------------------------------------------

1000 BANDS = 1,000,000 IDs per second.
------------------------------------------------
| BAND (BANDS = 1000)| ID RANGE                |
------------------------------------------------
| 0                  | 000,000,000:000,999,999 |
| 1                  | 001,000,000:001,999,999 |
| 2                  | 002,000,000:002,999,999 |
| 3                  | 003,000,000:003,999,999 |
| 4                  | 004,000,000:004,999,999 |
| 5                  | 005,000,000:005,999,999 |
| 6                  | 006,000,000:006,999,999 |
| 7                  | 007,000,000:007,999,999 |
| 8                  | 008,000,000:008,999,999 |
| 9                  | 009,000,000:009,999,999 |
| 10                 | 010,000,000:010,999,999 |
| 999                | 999,000,000:999,999,999 |
------------------------------------------------
```

### Limitations

- A maximum of 1 billion IDs can be issued per second with a 64 bit system.
- This ID schema will exceed the nanoseconds 19 chars when unixtime exceeds 9999999999 on Sat, 20 Nov, 2286 17:46:39 GMT.
- Because nanoseconds exceeds ECMA (javascripts) largest number, returned as string representing nanosecond integer.

### License

MIT or Apache 2.0

