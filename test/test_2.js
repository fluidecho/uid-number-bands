// test 2

var uidNumberBands 	= require('.././index');

var BAND = 99;
var BANDS = 100;

uidNumberBands.init(BAND, BANDS);

var id = uidNumberBands.make();
console.log( 'id: ' + id );
	
var idNormalized = uidNumberBands.normalize(id);
console.log( 'idNormalized: ' + idNormalized );
