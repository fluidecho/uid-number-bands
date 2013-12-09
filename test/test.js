// test

var util  = require('util');
var uidNumberBands  = require('.././index');


var BAND  = 0;
var BANDS   = 100;


// [band, bands, start id at 1, callback function (optional)].
uidNumberBands.init(BAND, BANDS,  true, function() {

  var id  = 0;
  var ids   = {};
  var x   = 0;
  var total = 30;

  var repeat  = setInterval(function() {

    // uidNumberBands.make(spacing to next id else 1).
    console.log( uidNumberBands.make(1) );    // returns id object: uid.id, uid.idn, id.unixtime, id.freshsec.

    x++;
    if ( x >= total ) {
      clearInterval(repeat);
    }

  }, 50 );

});

