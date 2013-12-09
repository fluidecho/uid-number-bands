// example 

var uidNumberBands = require('.././index');
var util = require('util');

var BAND = 0;
var BANDS = 100;

// [band, bands, start id at 1, callback function (optional)].
uidNumberBands.init(BAND, BANDS, true);

// uidNumberBands.make(spacing) returns id object: id.uid, id.idn, id.normalized_uid, id.unixtime, id.freshsec.
var id = uidNumberBands.make();
console.log('set id: ' + util.inspect(id));

// can parse the uid.
var id = uidNumberBands.parse(id.uid);
console.log('parsed id: ' + util.inspect(id));
