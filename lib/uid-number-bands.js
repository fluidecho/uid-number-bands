"use strict";
//
// Unique ID number generator within band ranges (uid-number-bands)
//
// Version: 0.0.9
// Author: Mark W. B. Ashcroft (mark [at] kurunt [dot] com)
// License: MIT or Apache 2.0.
//
// Copyright (c) 2013 Mark W. B. Ashcroft.
//


// About Bands -
// BANDS (integer) represents the maximum number of generator nodes that would exist within a cluster, must be the same across all generator nodes.
// BANDS is divisible by (999,999,999 + 1). The + 1 is because the band range starts at 0.
// BAND (integer) represents this input nodes band to use, must be unique within the Kurunt cluster and less than BANDS.
// So if BANDS = 100 then; (999,999,999 + 1) / 100 = 10,000,000 maximum messages per second per input node (band) can be issued IDs.

// 100 BANDS = 10,000,000 IDs per second.
// ------------------------------------------------
// | BAND (BANDS = 100) | ID RANGE                |
// ------------------------------------------------
// | 0                  | 000,000,000:009,999,999 |
// | 1                  | 010,000,000:019,999,999 |
// | 2                  | 020,000,000:029,999,999 |
// | 3                  | 030,000,000:039,999,999 |
// | 4                  | 040,000,000:049,999,999 |
// | 5                  | 050,000,000:059,999,999 |
// | 6                  | 060,000,000:069,999,999 |
// | 7                  | 070,000,000:079,999,999 |
// | 8                  | 080,000,000:089,999,999 |
// | 9                  | 090,000,000:099,999,999 |
// | 10                 | 100,000,000:109,999,999 |
// | 99                 | 990,000,000:999,999,999 |
// ------------------------------------------------

// 1000 BANDS = 1,000,000 IDs per second.
// ------------------------------------------------
// | BAND (BANDS = 1000)| ID RANGE                |
// ------------------------------------------------
// | 0                  | 000,000,000:000,999,999 |
// | 1                  | 001,000,000:001,999,999 |
// | 2                  | 002,000,000:002,999,999 |
// | 3                  | 003,000,000:003,999,999 |
// | 4                  | 004,000,000:004,999,999 |
// | 5                  | 005,000,000:005,999,999 |
// | 6                  | 006,000,000:006,999,999 |
// | 7                  | 007,000,000:007,999,999 |
// | 8                  | 008,000,000:008,999,999 |
// | 9                  | 009,000,000:009,999,999 |
// | 10                 | 010,000,000:010,999,999 |
// | 999                | 999,000,000:999,999,999 |
// ------------------------------------------------


// globals.
var BANDRNG       = 0;
var BANDRNGMIN    = 0;
var STARTATONE    = false;    // false = 0, true = 1.
var nextid        = 0;
var unixtime      = 0;
var freshsec      = false;



function init(band, bands, startAtOne, cb) {
  
  BANDRNG         = Math.round((999999999 + 1) / bands);
  BANDRNGMIN      = 0;
  if ( band != 0 ) {
    BANDRNGMIN    = band * BANDRNG;
  }
  
  if ( startAtOne != undefined ) {
    STARTATONE    = startAtOne;   // else false start at 0;
  }
  
  nextid          = BANDRNGMIN;
  unixtime        = 0;
  freshsec        = false;
  
  // callback optional.
  if ( cb != undefined ) {
    cb(true);
  } 
  
  return true;
  
}



var spacing_last = 0;               // used to space out ids between batches to avoid duplicates.
function make(spacing) {

  if ( spacing === undefined ) {
    spacing = 1;
  }
  
  var spacingx = spacing_last;
  spacing_last = spacing;

  var mstime = Date.now();

  if ( Math.round(mstime/1000) != unixtime ) {
    nextid = BANDRNGMIN;        // reset nextid to be bandrngmin.
    unixtime = Math.round(mstime/1000);   // reset unixtime to now (ineffect next second).
    freshsec = true;    
  } else {
    if ( freshsec === true ) {
      freshsec = false;
    }
  }

  if ( freshsec === false ) {
    nextid += spacingx;
  } else {
    nextid = BANDRNGMIN;
  }

  var idn = nextid;

  if ( STARTATONE === true ) {
    idn += 1;
  }

  var idObj = {};
  idObj.uid = unixtime.toString() + _padd_number(idn);    // because nanoseconds exceeds ECMA largest number, return as string.
  idObj.idn = idn;
  idObj.unixtime = Number(unixtime);  
  idObj.normalized_uid = unixtime + _padd_number((idn - BANDRNGMIN));
  idObj.freshsec = freshsec;
  
  return idObj;

}



function _padd_number(n) {

  // n as integer, returns 9 char number (string).
  var n_str = n.toString();
  switch (n_str.length) {
    case 1:
        var padded_num = '00000000' + n_str;
        break;
    case 2:
        var padded_num = '0000000' + n_str;
        break;
    case 3:
        var padded_num = '000000' + n_str;
        break;
    case 4:
        var padded_num = '00000' + n_str;
        break;
    case 5:
        var padded_num = '0000' + n_str;
        break;
    case 6:
        var padded_num = '000' + n_str;
        break;
    case 7:
        var padded_num = '00' + n_str;
        break;
    case 8:
        var padded_num = '0' + n_str;
        break;
    case 9:
        var padded_num = n_str;
        break;        
  }
  
  return padded_num;
  
}



function parse(uid) {

  // 1374235512000000000 (BAND = 0)
  // 1374235512010000000 (BAND = 1)

  var unixtime = uid.substring(0, 10);
  var idn = Number(uid.substring(10));     
  
  var idObj = {};
  idObj.uid = unixtime.toString() + _padd_number(idn);    // because nanoseconds exceeds ECMA largest number, return as string.
  idObj.idn = idn;
  idObj.unixtime = Number(unixtime);
  idObj.normalized_uid = unixtime + _padd_number((idn - BANDRNGMIN));  
  idObj.freshsec = freshsec;
  
  return idObj;
  
}



exports.init            = init;
exports.make            = make;
exports.parse           = parse;
exports._padd_number    = _padd_number;

