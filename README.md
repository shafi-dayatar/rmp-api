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

// Get data for Banana Man on RateMyProfessor.com (first one listed on the search page)
var bananaSu = rmp.get("Banana Man"); 

// Professor John Cena at Harvard University
var johnCena = rmp.get({ name: "John Cena", university: "Harvard" });

// Create instance that only searches for Penn State professors
var pennState = rmp("Pennsylvania State University");

// Terry Blakney at Penn State
var terryBlakney = pennState.get("Terry Blakney");

// Searching other Penn State campuses
var naseemIbrahim = pennState.get({ name: "Naseem Ibrahim", campus: "Erie" });

// Campus instance
var ucSanDiego = rmp({university: "University of California", campus: "San Diego"});

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