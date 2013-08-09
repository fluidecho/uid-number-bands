// test for duplicate ids

var util      = require('util');
var uidNumberBands  = require('.././index');


var BAND      = 99;
var BANDS       = 100;


uidNumberBands.init(BAND, BANDS, function() {

  var id    = 0;
  var ids     = {};
  var x     = 0;
  var total   = 1000000;
  var spacing   = 10;       // defines the spacing between id returned.

  for ( x = 0; x <= total; x++ ) {

    id  = uidNumberBands.make(spacing);

    if ( typeof ids[id] == 'undefined' ) {
      ids[id] = 1;
    } else {
      console.log('Duplicate! ' + id + ' x: ' + x);
      process.exit(1);
    }

    //console.log( id );    // id

    x++;
    if ( x >= total ) {
      //console.log('DUMP> ' + util.inspect(ids, true, 99, true));
      console.log( 'done without any duplicates' );
    }

  }

});


