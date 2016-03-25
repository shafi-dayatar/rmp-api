/*global, jQuery*/

"use strict";

(function() {
  var root = this;
  var prevRmp = root.rmp;
  
  var rmp = function() {
    var pub = {};
    /* Get request (Just pretend..) to rmp api */
    pub.get = function (data) {
      
    };
  };

  rmp.noConflict = function() {
    root.rmp = prevRmp;
    return rmp;
  };
  
  // EXPORT
  if( typeof exports !== 'undefined' ) {
    if( typeof module !== 'undefined' && module.exports ) {
      exports = module.exports = rmp;
    }
    exports.rmp = rmp;
  } 
  else {
    root.rmp = rmp;
  }
}).call(this);