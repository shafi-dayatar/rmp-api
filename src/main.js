/*global jQuery, _*/

(function() {

  "use strict";

  var root = this;
  var prevRmp = root.rmp;

  /**
   * rmp-api namespace
   *
   */
  var rmp = function(options) {
    var pub = {};
    var priv = {};
    /* Selectors used for searching HTML */
    priv.selectors = {
      listing: ".listing.PROFESSOR",
      fname: "#mainContent > div.right-panel > div.top-info-block > div.result-info > div.result-name > h1 > span:nth-child(1)",
      lname: "#mainContent > div.right-panel > div.top-info-block > div.result-info > div.result-name > h1 > span.plname",
      quality: "#mainContent > div.right-panel > div.rating-breakdown > div.left-breakdown > div.breakdown-wrapper > div:nth-child(1) > div",
      grade: "#mainContent > div.right-panel > div.rating-breakdown > div.left-breakdown > div.breakdown-wrapper > div:nth-child(2) > div",
      chili: "#mainContent > div.right-panel > div.rating-breakdown > div.left-breakdown > div.breakdown-wrapper > div:nth-child(3) > div > figure > img",
      easiness: "#mainContent > div.right-panel > div.rating-breakdown > div.left-breakdown > div.faux-slides > div:nth-child(3) > div.rating",
      clarity: "#mainContent > div.right-panel > div.rating-breakdown > div.left-breakdown > div.faux-slides > div:nth-child(2) > div.rating",
      help: "#mainContent > div.right-panel > div.rating-breakdown > div.left-breakdown > div.faux-slides > div:nth-child(1) > div.rating"
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
    /* Generates a search URL for the professor */
    priv.getSearchUrl = function(query) {
      var campusSep = query.campus.length > 1 ? encodeURIComponent(" ") : "";
      return "http://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=teacherName&schoolName=" +
        encodeURIComponent(query.university) +
        campusSep +
        encodeURIComponent(query.campus) +
        "&schoolID=4002&query=" +
        encodeURIComponent(query.name);
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
      // if a string
      input = {
        university: input
      };
      return input;
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
          return priv.newQuery(priv.options.university, priv.options.campus, name);
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
              return priv.newQuery(priv.options.university, priv.options.campus, input.name);
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
        var page = jQuery(html);

        var comments = [];
        // Scrape all comments
        $("p.commentsParagraph", page).each(function(indx, elem) {
          comments.push($(elem).text().trim());
        });
        // Create professor object
        var professor = {
          fname: $(priv.selectors.fname, page).text().trim(),
          lname: $(priv.selectors.lname, page).text().trim(),
          quality: $(priv.selectors.quality, page).text().trim(),
          easiness: $(priv.selectors.easiness, page).text().trim(),
          help: $(priv.selectors.help, page).text().trim(),
          clarity: $(priv.selectors.clarity, page).text().trim(),
          comments: comments,
          chili: $(priv.selectors.chili, page).attr("src")
            .replace("/assets/chilis/", "")
            .replace("-chili.png", "")
        };
        console.log(professor);
        if (typeof callback !== "function") {
          throw new Error("No or invalid callback provided.");
        }
        else {
          callback(professor);
        }
      };
      // Make request
      priv.ajax(url, function(respText) {
        scrape(respText, callback);
      });
    };
    /* Parses and Cleans up name from the RMP search */
    priv.parseName = function(name) {
      var out = {};
      var names = [];
      if (name.includes(",")) {
        names = name.split(",");
        out.last = names[0].trim();
        out.first = names[1].trim();
      }
      else {
        names = name.split(" ");
        out.first = names[0].trim();
        out.last = names[1].trim();
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
          console.log("Matched");
          priv.scrape(priv.urlFromListing(elem), callback);
          found = true;
        }
        console.log("Not matched..");
      });
      professorList.each(function(indx, elem) {
        if (!found && priv.matches(query.name, priv.nameFromLisiting(elem), false)) {
          console.log("Matched");
          priv.scrape(priv.urlFromListing(elem), callback);
          found = true;
        }
        console.log("Not matched..");
      });
    };
    priv.ajax = function(url, callback) {
      $.post("https://still-island-94747.herokuapp.com/rmp", {
        url: url
      }, function(response) {
        console.log(response);
        callback(response);
      });
    };
    /* Search for professor on RMP */
    priv.search = function(query, url, callback) {
      console.log("Search url:");
      console.log(url);
      jQuery.ajaxSetup({
        scriptCharset: "utf-8", //or "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
      });
      priv.ajax(url, function(respText) {
        priv.scan(query, respText, callback);
      });
    };
    /* Get request (Just pretend..) to RateMyProfessors api */
    pub.get = function(options, callback) {
      // Generate a query using the options
      var query = priv.getOptionsAsQuery(options);
      // Get the search URL
      var searchUrl = priv.getSearchUrl(query);
      // Let the hunt begin
      priv.search(query, searchUrl, callback);
    };

    // Validate input
    _.extend(priv.options, priv.options(options));

    return pub;
  };

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
      exports = module.exports = _.extend(rmp, rmp());
    }
    exports.rmp = _.extend(rmp, rmp(""));
  }
  else {
    root.rmp = _.extend(rmp, rmp(""));
  }
}).call(this);