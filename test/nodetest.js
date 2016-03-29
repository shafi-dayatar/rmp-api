var rmp = require("../index.js");

var callback = function(professor) {
  console.log("Name: " + professor.fname + " " + professor.lname);
  console.log("Quality: " + professor.quality);
  console.log("Easiness: " + professor.easiness);
  console.log("Helpfulness: " + professor.help);
  console.log("Average Grade: " + professor.grade);
};

rmp.get("Naseem Ibrahim", callback);
rmp.get("Meng Su", callback);