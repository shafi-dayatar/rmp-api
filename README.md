# rmp-api
A RateMyProfessor scraper that pretends to be the RMP API

##Installation

Node.js
```
$ npm install rmp-api --save
```
Bower
```
$ bower install rmp-api --save
```

##Usage

###Node.js

```javascript

var rmp = require("rmp-api");

var callback( professor ) {
  console.log("Name: "+professor.fname+" "+professor.lname);
  console.log("Quality: "+professor.quality);
  console.log("Easiness: "+professor.easiness);
  console.log("Helpfulness: "+professor.help);
  console.log("Average Grade: "+professor.grade);
};

/* Creating Campus/University instance */

// Create instance that only searches for Penn State professors
var pennState = rmp("Pennsylvania State University");

// Erie campus
var pennStateErie = pennState({campus: "Erie"});

// University of California
var uc = rmp("University of California");

// Using both University and Campus
var ucSanDiego = rmp({university: "University of California", campus: "San Diego"});

// Adding a campus
var ucLA = uc("Los Angeles");

/* Searching for professsors */

// Get data for Banana Man on RateMyProfessor.com (first one listed on the search page)
rmp.get("Paul Lynch", callback); 

// Professor John Cena at Harvard University
rmp.get({ name: "John Cena", university: "Harvard" }, callback);

// Terry Blakney at Penn State
pennState.get("Terry Blakney", callback);

// Searching other Penn State campuses
pennState.get({ name: "Naseem Ibrahim", campus: "Erie" }, callback);

// Searching for a professor at ucSanDiego
ucSanDiego.get("Some guy", callback);
```

###Bower

HTML:
```html
<head>
    <script src="bower_components/rmp-api/rmp-api.min.js"></script>
</head>
```
JS:
```javascript

// rmp global is exposed for use
var bananaMan = rmp.get("Banana Man");

// Everything else is the same...

```