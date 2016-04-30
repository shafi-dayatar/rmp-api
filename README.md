[![npm version](https://badge.fury.io/js/rmp-api.svg)](https://badge.fury.io/js/rmp-api)
[![bower version](https://img.shields.io/bower/v/rmp-api.svg?maxAge=2592000)](http://bower.io/search/?q=rmp-api)
[![Build Status](https://travis-ci.org/yehya/rmp-api.svg?branch=master)](https://travis-ci.org/yehya/rmp-api)
[![downloads](https://img.shields.io/npm/dm/rmp-api.svg?maxAge=259200)](https://www.npmjs.com/package/rmp-api)

# rmp-api
A RateMyProfessor scraper that pretends to be the RMP API.

Try out the live demo [here](http://rmp-api-server.herokuapp.com/demo/index.html).

<a target="_blank" href="http://rmp-api-server.herokuapp.com/demo/index.html"><img src="http://www.yehyaawad.com/img/Projects/rmp-live-demo-short-LowQ.gif" width="80%"></a>

##In a nutshell

Get all the information you need with one line of code (and a callback...)

```javascript
var cb = function (prof) { /* .. do stuff with professor data .. */ };

rmp.get("FirstName LastName", cb);
```

that's it.

You can also make instances that only search within the domain of specific universities. 

Let's make one for **University of Massachippissippi**

```javascript
var massachippissippi = rmp("University of Massachippissippi");
```
we can then use it as we would with ```rmp```
```javascript
massachippissippi.get("Negan Edwarrds", cb);
```

##Installation

Node.js
```
$ npm install rmp-api --save
```
Bower
```
$ bower install rmp-api --save
```
CDN - Latest
```html
<script src="https://rmp-api-server.herokuapp.com/cdn/rmp-api-latest.min.js"></script>
```
CDN - Any release eg. v0.0.3
```html
<script src="https://rmp-api-server.herokuapp.com/cdn/rmp-api-0.0.3.min.js"></script>
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

**Instance chaining**

```javascript
var uc = rmp("University of California");
var ucLA = uc("Los Angeles");
// Los Angeles campus
// then ucLA.get(...);
```
or
```javascript
var ucLA = rmp("University of California")("Los Angeles");
// then ucLa.get(...);
```

Requesting professor

**.get(fullName, callback)**
```javascript
rmp.get("Paul Lynch", callback);
```
or
```javascript
var someUniv = rmp("Some University");

someUniv.get("First Last", callback);
```

**.get(options, callback)**
```javascript
rmp.get({ university: "Pennsylvania State University", campus: "Erie", name: "Douglas Dexter"}, callback);
```
or
```javascript
var someUniv = rmp("Some University");

someUniv.get({ campus: "Some Campus", name: "First Last"}, callback);
```

##Professor Object Structure
```json
{
    "url": "http://www.ratemyprofessors.com/ShowRatings.jsp?tid=14671241",
    "fname": "Name",
    "lname": "LastName",
    "quality": "4.5",
    "easiness": "3.0",
    "help": "5.0",
    "clarity": "4.0",
    "topTag": "Gives Pop Quizzes (1)",
    "grade": "B",
    "university": "Pennsylvania State University - Erie",
    "chili": "cold",
    "tags": [
        "TOUGH GRADER"
    ],
    "comments": [
        "Tough test questions"
    ],
    "courses": [
        "SWENG311"
    ],
    "courseRatings": [
        "GOOD"
    ]
}
```

##Example
Checkout this [fiddle](https://jsfiddle.net/tnxbj112/5/).

**More Chaining**
```javascript
rmp("University Name").get("Professor Name", callback);

rmp("University Name Campus Name").get("Professor Name", callback);

rmp("University Name")("Campus Name").get("Professor Name", callback);
```

##Sample Projects
####[PSU Rate My Professor Plugin](https://chrome.google.com/webstore/detail/psu-rate-my-professor-plu/mgcgmhhcjfknhchpfnkfhkoemaglookl?hl=en-US&gl=US&authuser=0)
<p align="left">
  <img src="http://g.recordit.co/EtGA2HEsCe.gif" width="80%">
</p>

License

Copyright (c) 2016 Yehya Awad
rmp-api is free software, licensed under the MIT License, See the file LICENSE.md in this distribution for more details.
