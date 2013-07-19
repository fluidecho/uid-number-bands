// example 

var uidNumberBands = require('./index');

var BAND = 0;
var BANDS = 100;

uidNumberBands.init(BAND, BANDS, function() {

	var id = uidNumberBands.make();
	console.log( 'id: ' + id );
	
	var idNormalized = uidNumberBands.normalize(id);
	console.log( 'idNormalized: ' + idNormalized );
	
});
