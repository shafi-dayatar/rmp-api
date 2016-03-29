[![npm version](https://badge.fury.io/js/rmp-api.svg)](https://badge.fury.io/js/rmp-api)

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
CDN
```html
<script src="https://rmp-api-server.herokuapp.com/cdn/rmp-api-latest.min.js"></script>
```

##Usage

###Node.js

```javascript
var rmp = require("rmp-api");

var callback = function(professor) {
  if (professor === null) {
    console.log("No professor found.");
    return;
  }
  console.log("Name: " + professor.fname + " " + professor.lname);
  console.log("University: "+ professor.university);
  console.log("Quality: " + professor.quality);
  console.log("Easiness: " + professor.easiness);
  console.log("Helpfulness: " + professor.help);
  console.log("Average Grade: " + professor.grade);
  console.log("Chili: " + professor.chili);
  console.log("URL: " + professor.url);
  console.log("First comment: " + professor.comments[0]);
};

rmp.get("Paul Lynch", callback);
```

Output:
```
Name: Paul Lynch 
University: Pennsylvania State University 
Quality: 5.0 
Easiness: 3.6 
Helpfulness: 5.0 
Average Grade: A- 
Chili: cold 
URL: http://www.ratemyprofessors.com/ShowRatings.jsp?tid=1572913 
First comment: He is the best professor I have ever had here at Behrend
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
var callback = function(professor) {
  if (professor === null) {
    console.log("No professor found.");
    return;
  }
  console.log("Name: " + professor.fname + " " + professor.lname);
  console.log("University: "+ professor.university);
  console.log("Quality: " + professor.quality);
  console.log("Easiness: " + professor.easiness);
  console.log("Helpfulness: " + professor.help);
  console.log("Average Grade: " + professor.grade);
  console.log("Chili: " + professor.chili);
  console.log("URL: " + professor.url);
  console.log("First comment: " + professor.comments[0]);
};

// rmp global is exposed for use
rmp.get("Douglas Dexter", callback);
```
Output:
```
Name: Douglas Dexter 
University: Pennsylvania State University 
Quality: 5.0 
Easiness: 3.5 
Helpfulness: 5.0 
Average Grade: N/A 
Chili: warm 
URL: http://www.ratemyprofessors.com/ShowRatings.jsp?tid=1266583 
First comment: I'm inspired to be a better teacher.
```

### API

Creating instances

**rmp(university)**
```javascript
var pennState = rmp("Pennsylvania State University");

// Only search for Penn State professors
pennState.get("Naseem Ibrahim", callback);
```

Requesting professor

**.get(fullName, callback)**
```javascript
rmp.get("Paul Lynch", callback);
```

**.get(options, callback)**
```javascript
rmp.get({ university: "Pennsylvania State University", campus: "Erie", name: "Douglas Dexter"}, callback);
```

##Example
Checkout this [fiddle](https://jsfiddle.net/tnxbj112/5/).