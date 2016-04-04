/**
 * Created by yehyaawad on 3/25/16.
 */

// Just to print stuff on the page
var log = function(msg) {
  $("body").append(msg + " <br>");
};

// our callback to handle found professors
var callback = function(professor) {
  if (professor === null) {
    $("body").append("Not found.<br>");
    return;
  }
  log("Name: " + professor.fname + " " + professor.lname);
  log("University: " + professor.university);
  log("Quality: " + professor.quality);
  log("Easiness: " + professor.easiness);
  log("Helpfulness: " + professor.help);
  log("Average Grade: " + professor.grade);
  log("Chili: " + professor.chili);
  log("URL: <a target='_blank' href='" + professor.url + "'>" + professor.url + "</a>");
  log("First comment: " + professor.comments[0]);
  log("<br>");
};

// Using rmp-api
rmp.get("Naseem Ibrahim", callback);
rmp.get("Paul Lynch", callback);

// Penn State only instance
var pennState = rmp("Pennsylvania State University");

pennState.get("Douglas Dexter", callback);
