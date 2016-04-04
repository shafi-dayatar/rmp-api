var rmp = require("../src/main.js");

var callback = function(professor) {
  if (professor === null) {
    console.log("Professor not found.\n");
    return;
  }
  console.log("Name: " + professor.fname + " " + professor.lname);
  console.log("University: " + professor.university);
  console.log("Quality: " + professor.quality);
  console.log("Easiness: " + professor.easiness);
  console.log("Helpfulness: " + professor.help);
  console.log("Average Grade: " + professor.grade);
  console.log("");
};

// rmp.get("David Brown", callback);

// // rmp.get("Naseem Ibrahim", callback);

// var ps = rmp("Pennsylvania State University");

// // ps.get("Naseem Ibrahim", callback);

// rmp("Pennsylvania State University").get("Jalaa Hoblos", callback);

// ps.get("Meng Su", callback);

// ps.get("David Browm", callback);

// var erie = ps("Erie");
// var harris = ps("Harrisburg");


// erie.get("Naseem Ibrahim", callback);

// harris.get("Sukmoon Chang", callback);

// var harrisAdd = harris("Add");

// harrisAdd.get("Someone Else", callback);

rmp("Pennsylvania State University")("Erie").get("Naseem Ibrahim", callback);