/*global*/
(function() {

  "use strict";

  /* Set true to print debug messages */
  var DEBUG_MODE = false;

  var request,
    jQuery = this.jQuery,
    $ = this.$,
    _ = this._;

  /* Check for Node.js */
  var IS_NODE = false;
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      IS_NODE = true;
      // Get dependencies
      request = require("request");
      jQuery = require("cheerio");
      $ = require("cheerio");
      _ = require("underscore");
    }
  }

  var root = this;
  var prevRmp = root.rmp;

  /* Adding String.prototype.includes if it does not exist */
  if (typeof String.prototype.includes === "undefined") {
    String.prototype.includes = function(str2) {
      return this.indexOf(str2) > -1;
    };
  }

  /* Used to print debug messages in the console */
  var debugLog = function(context, message) {
    if (DEBUG_MODE) {
      console.log(context + ": " + message);
    }
  };

  /**
   * rmp-api namespace
   *
   */
  var rmp = function(options) {
    // Binded object
    var _this = this;
    var pub = {};
    var priv = {};
    /* Search configuration */
    priv.config = {
      location: "" // university/campus
    };
    /* Selectors used for searching HTML */
    priv.selectors = {
      listing: ".listing.PROFESSOR",
      fname: "#mainContent > div.right-panel > div.top-info-block > div.result-info > div.result-name > h1 > span:nth-child(1)",
      lname: "#mainContent > div.right-panel > div.top-info-block > div.result-info > div.result-name > h1 > span.plname",
      quality: "#mainContent > div.right-panel > div.rating-breakdown > div.left-breakdown > div > div:nth-child(1) > div > div > div",
      grade: "#mainContent > div.right-panel > div.rating-breakdown > div.left-breakdown > div > div:nth-child(2) > div:nth-child(2) > div",
      chili: "#mainContent > div.right-panel > div.rating-breakdown > div.left-breakdown > div > div:nth-child(2) > div:nth-child(3) > div > figure > img",
      easiness: "#mainContent > div.right-panel > div.rating-breakdown > div.left-breakdown > div > div:nth-child(2) > div:nth-child(2) > div",
      clarity: "#mainContent > div.right-panel > div.rating-breakdown > div.left-breakdown > div > div:nth-child(2) > div:nth-child(2) > div",
      help: "#mainContent > div.right-panel > div.rating-breakdown > div.left-breakdown > div > div:nth-child(2) > div:nth-child(2) > div",
      university: "#mainContent > div.right-panel > div.top-info-block > div.result-info > div.result-title > h2 > a",
      // every comment
      comments: "p.commentsParagraph",
      // top tag of a professor
      topTag: "#mainContent > div.right-panel > div.rating-breakdown > div.right-breakdown > div.tag-box > span:nth-child(1)",
      // first tag of every comment
      commentTags: "td.comments > div.tagbox > span:nth-child(1)",
      // courses
      courses: ".class > .name > .response",
      // course ratings
      courseRatings: ".rating-type"
    };
    /* Generates new query object */
    priv.newQuery = function(university, campus, name) {
      university = typeof university === "undefined" ? "" : university;
      campus = typeof campus === "undefined" ? "" : campus;
      return {
        university: university,
        campus: campus,
        name: name
      };
    };
    /* Combines all properties of a string */
    priv.combine = function(options) {
      var query = "";
      if (typeof options === "string") {
        query = options;
        return query;
      }
      else if (typeof options === "object") {
        _.each(options, function(value, key, list) {
          query += " ";
          query += value;
        });
        return query;
      }
      else {
        throw new Error("Please pass in a String name or object with correct property keys.");
      }
    };
    /* Generates a search URL for the professor */
    priv.getSearchUrl = function(options) {
      var query = priv.combine(options);
      return "http://www.ratemyprofessors.com/search.jsp?query=" +
        encodeURIComponent(priv.config.location) + encodeURIComponent(" ") +
        encodeURIComponent(query);
    };
    /* Validates constructor options & holds options as properties */
    priv.options = function(input) {
      var out = {};
      // if no input
      if (typeof input === "undefined" || input === null) {
        input = "";
        console.warn("Instantiating new rmp object without arguments.");
        return out;
      }
      // if input is an object
      else if (typeof input === "object") {
        out.location = priv.config.location;
        _.each(input, function(value, key, list) {
          if (typeof val === "string") {
            out.location += " ";
            out.location += value;
          }
        });
        return out;
      }
      // if invalid type input
      else if (typeof input !== "string") {
        throw new Error("Argument 1: Must be a String containing a university or campus name.");
      }
      else {
        // if a string
        out = {
          location: priv.config.location + " " + input
        };
        return out;
      }
    };
    /* Validate and return options */
    priv.getOptionsAsQuery = function(input) {
      if (typeof input === "undefined" || input === null) {
        throw new Error("Number of required arguments is 1");
      }
      else {
        // When a name is passed as the argument
        if (typeof input === "string") {
          var name = input;
          return priv.newQuery(priv.config.university, priv.config.campus, name);
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
              return priv.newQuery(priv.config.university, priv.config.campus, input.name);
            }
          }
          else {
            throw new Error("Argument type not recognized");
          }
        }
      }
    };
    /* Scrape professor's page */
    priv.scrape = function(url, callback) {
      // Scrapes the data & calls callback with professor data
      var scrape = function(html, callback) {
        // Page built from HTML string
        var page = jQuery(html);
        var comments = [];
        var courses = [];
        var tags = [];
        var courseRatings = [];
        // Scrape all tags
        $(priv.selectors.commentTags, page).each(function(indx, elem) {
          tags.push($(elem).text().trim());
        });
        // Scrape all comments
        $(priv.selectors.comments, page).each(function(indx, elem) {
          comments.push($(elem).text().trim());
        });
        // Scrape all courses
        $(priv.selectors.courses, page).each(function(indx, elem) {
          courses.push($(elem).text().trim());
        });
        // Scrape all courses
        $(priv.selectors.courseRatings, page).each(function(indx, elem) {
          courseRatings.push($(elem).text().trim().toUpperCase());
        });

        // Create professor object
        var professor = null;

        // If Valid professor page (not blank)
        if (priv.isPageValid(page)) {
          professor = {
            url: url,
            fname: $(priv.selectors.fname, page).text().trim(),
            lname: $(priv.selectors.lname, page).text().trim(),
            quality: $(priv.selectors.quality, page).text().trim(),
            easiness: $(priv.selectors.easiness, page).text().trim(),
            help: $(priv.selectors.help, page).text().trim(),
            clarity: $(priv.selectors.clarity, page).text().trim(),
            topTag: $(priv.selectors.topTag, page).text().trim(),
            grade: $(priv.selectors.grade, page).text().trim(),
            university: $(priv.selectors.university, page).text().trim(),
            chili: $(priv.selectors.chili, page).attr("src")
              .replace("/assets/chilis/", "")
              .replace("-chili.png", ""),
            tags: tags,
            comments: comments,
            courses: courses,
            courseRatings: courseRatings
          };
        }

        // Check if callback valid
        if (typeof callback !== "function") {
          throw new Error("No or invalid callback provided.");
        }
        else {
          callback(professor);
        }
      };
      // Make request
      priv.requestPage(url, function(respText) {
        scrape(respText, callback);
      });
    };
    /* Checks if a professor page is valid (a.k.a. contains actual data) */
    priv.isPageValid = function(page) {
      var nameExists = $(priv.selectors.fname, page).text().trim() !== "";
      var chiliExists = typeof $(priv.selectors.chili, page).attr("src") !== "undefined";
      debugLog("priv.isPageValid: nameExists", nameExists);
      debugLog("priv.isPageValid: chiliExists", chiliExists);
      debugLog("priv.isPageValid", nameExists && chiliExists);
      return nameExists && chiliExists;
    };
    /* Parses and Cleans up name from the RMP search */
    priv.parseName = function(name) {
      var out = {};
      var names = [];
      if (name.includes(",")) {
        name = name.toLowerCase();
        names = name.split(",");
        out.last = names[0].trim().toLowerCase();
        out.first = names[1].trim().toLowerCase();
      }
      else if (name.includes(" ")) {
        names = name.split(" ");
        out.first = names[0].trim().toLowerCase();
        out.last = names[1].trim().toLowerCase();
      }
      else {
        out.first = name.trim().toLowerCase();
        out.last = "";
      }
      out.full = out.first + out.last;
      return out;
    };
    /* Check if professor matches */
    priv.matches = function(_name1, _name2, exactOnly) {
      // Clean names
      var name1 = priv.parseName(_name1);
      var name2 = priv.parseName(_name2);
      // Start searching for match
      if (name1.full === name2.full) {
        return true;
      }
      else if (!exactOnly) {
        if (name1.full.includes(name2.first) &&
          name1.full.includes(name2.last)) {
          return true;
        }
        else if (name2.full.includes(name1.first) &&
          name2.full.includes(name1.last)) {
          return true;
        }
        else {
          return false;
        }
      }
    };
    /* Get name from professor listing element */
    priv.nameFromLisiting = function(elem) {
      elem = $(elem);
      return $("a > span.listing-name > span.main", elem).text();
    };
    /* Get url from listing element */
    priv.urlFromListing = function(elem) {
      elem = $(elem);
      return "http://www.ratemyprofessors.com" + $("a", elem).attr('href');
    };
    /* Scan search page for professor */
    priv.scan = function(query, html, callback) {
      var jqPage = jQuery(html);
      var professorList = jQuery(priv.selectors.listing, jqPage);
      var found = false;
      professorList.each(function(indx, elem) {
        if (!found && priv.matches(query.name, priv.nameFromLisiting(elem), true)) {
          priv.scrape(priv.urlFromListing(elem), callback);
          found = true;
        }
      });
      professorList.each(function(indx, elem) {
        if (!found && priv.matches(query.name, priv.nameFromLisiting(elem), false)) {
          priv.scrape(priv.urlFromListing(elem), callback);
          found = true;
        }
      });
      if (found === false) {
        // Could not find professor after scan
        callback(null);
      }
    };
    /* Makes AJAX request to page and retrieves HTML */
    priv.requestPage = function(url, callback) {
      var MAX_RETRIES = 3;
      var requestCount = 0;
      var getPage = function(reqUrl) {
        if (requestCount < MAX_RETRIES) {
          var data = {
            "url": reqUrl
          };
          if (!IS_NODE) {
            $.ajax({
              url: "https://rmp-api-server.herokuapp.com/rmp/v1",
              type: "POST",
              crossorigin: true,
              data: data,
              dataType: 'text',
              success: function(data) {
                // Got page
                callback(data);
              },
              error: function(error) {
                // Retry on fail
                getPage(url, callback);
              }
            });
          }
          else {
            request(data.url, function(error, response, body) {
              if (!error && response.statusCode == 200) {
                // Got page
                callback(body);
              }
              else {
                // Retry on fail
                getPage(url, callback);
              }
            });
          }
        }
        else {
          callback(null);
        }
        requestCount += 1;
      };
      getPage(url);
    };
    /* Search for professor on RMP */
    priv.search = function(query, url, callback) {
      priv.requestPage(url, function(respText) {
        if (respText === null) {
          // Could not make request
          callback(null);
        }
        else {
          priv.scan(query, respText, callback);
        }
      });
    };
    /* Get request (Just pretend..) to RateMyProfessors api */
    pub.get = function(options, callback) {
      // Generate a query using the options
      var query = priv.getOptionsAsQuery(options);
      // Get the search URL
      var searchUrl = priv.getSearchUrl(options);
      // Let the hunt begin
      priv.search(query, searchUrl, callback);
    };
    /* Get the context of the search */
    pub.getContext = function() {
      return priv.config.location;
    };

    // Initialize
    priv.config.location = _this.context;

    // Validate input
    _.extend(priv.config, priv.options(options));

    // Bind variable
    var exportBind = {
      context: pub.getContext()
    };

    // Bind context to function
    var binded = _.bind(rmp, exportBind);

    // Function + public properties
    priv.export = _.extend(binded, pub);

    // Export
    return priv.export;
  };

  // Initial bind of rmp
  var rmp_export = _.bind(rmp, {
    context: ""
  });

  /**
   * Use to return to original 'rmp' variable
   *
   */
  rmp.noConflict = function() {
    root.rmp = prevRmp;
    return rmp;
  };

  // EXPORT
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = rmp_export("");
    }
    exports.rmp = rmp_export("");
  }
  else {
    root.rmp = rmp_export("");
  }
}).call(this);
