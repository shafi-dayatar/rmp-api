/*global jQuery, _*/

(function() {

  "use strict";

  var root = this;
  var prevRmp = root.rmp;

  var rmp = function(options) {
    var pub = {};
    var priv = {};
    /* Generates new query object */
    priv.newQuery = function(university, campus, name) {
      return {
        university: university,
        campus: campus,
        name: name
      };
    };
    /* Generates a search URL for the professor */
    priv.getSearchUrl = function(query) {
      return 'http://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&schoolName=' +
        encodeURIComponent(query.university) +
        encodeURIComponent(" ") +
        encodeURIComponent(query.campus) +
        '&queryoption=HEADER&query=' +
        encodeURIComponent(query.name) +
        '&facetSearch=true';
    };
    /* Validates constructor options & holds options as properties */
    priv.options = function(input) {
      // if no input
      if (typeof input === "undefined" || input === null) {
        input = "";
        console.warn("Instantiating new rmp object without arguments. Please provide a university name.");
      }
      // if input is an object
      else if (typeof input === "object") {
        // University validation
        input.university = typeof input.university === "undefined" ? "" : input.university;
        input.university = input.university === null ? "" : input.university;
        // Campus validation
        input.campus = typeof input.campus === "undefined" ? "" : input.campus;
        input.campus = input.campus === null ? "" : input.campus;
      }
      // if invalid type input
      else if (typeof input !== "string") {
        throw new Error("Argument 1: Must be a String containing a university name.");
      }
      // return fixed input
      return input;
    };
    /* Validate and return options */
    priv.getOptions = function(input) {
      if (typeof input === "undefined" || input === null) {
        throw new Error("Number of required arguments is 1");
      }
      else {
        // When a name is passed as the argument
        if (typeof input === "string") {
          return {
            name: input
          };
        }
        // When otherwise
        else {
          // When argument is an Object
          if (typeof input === "object") {
            // if name property does not exist
            if (typeof input.name === "undefined") {
              throw new Error("Required option missing: name");
            }
            // if name property exists
            else {
              return input;
            }
          }
          else {
            throw new Error("Argument type not recognized");
          }
        }
      }
    };
    /* Get request (Just pretend..) to RateMyProfessors api */
    pub.get = function(options) {
      options = priv.getOptions(options);
      console.log(options);
    };

    // Validate input
    _.extend(priv.options, priv.options(options));

    return pub;
  };
  rmp.noConflict = function() {
    root.rmp = prevRmp;
    return rmp;
  };

  // EXPORT
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _.extend(rmp, rmp());
    }
    exports.rmp = _.extend(rmp, rmp(""));
  }
  else {
    root.rmp = _.extend(rmp, rmp(""));
  }
}).call(this);