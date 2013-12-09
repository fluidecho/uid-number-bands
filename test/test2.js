// test

var util  = require('util');
var uidNumberBands  = require('.././index');


var BAND  = 0;
var BANDS   = 100;


uidNumberBands.init(BAND, BANDS);

var id  = 0;
var ids   = {};
var x   = 0;
var total = 30;

var repeat  = setInterval(function() {

  console.log( uidNumberBands.make() );   // id

  x++;
  if ( x >= total ) {
    clearInterval(repeat);
  }

}, 50 );

