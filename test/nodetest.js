var rmp = require("../index.js");

var callback = function(professor) {
  if (professor === null) {
    console.log("Professor not found.\n");
    return;
  }
  console.log("Name: " + professor.fname + " " + professor.lname);
  console.log("Quality: " + professor.quality);
  console.log("Easiness: " + professor.easiness);
  console.log("Helpfulness: " + professor.help);
  console.log("Average Grade: " + professor.grade);
  console.log("");
};

rmp.get("Naseem Ibrahim", callback);
rmp.get("Meng Su", callback);

var pennState = rmp("Pennsylvania State University");

pennState.get("Naseem Ibrahim", callback);

var pennStateErie = pennState("Erie");

pennStateErie.get("Naseem Ibrahim", callback);

pennStateErie.get("Paul Lynch", callback);