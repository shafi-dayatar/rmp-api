var expect = require('chai').expect;
var rmp = require("../src/main.js");

describe('rmp', function() {
  // rmp
  it('should create a valid instance', function() {
    var instance = rmp("Instance");
    expect(instance).to.be.a("function");
  });
  it('should have a get property as a function', function() {
    expect(rmp).to.have.property('get');
    expect(rmp.get).to.be.a("function");
  });

  ///////////////
  // rmp.get() //
  ///////////////

  describe("get()", function() {
    it('should run the callback', function(done) {
      this.timeout(5000);
      rmp.get("Naseem Ibrahim", function(professor) {
        expect(true).to.equal(true);
        done();
      });
    });
    it('should return null when not found', function(done) {
      this.timeout(5000);
      var rmp = require("../src/main.js");
      rmp.get("hjkahdkad ajsdhakjdhj", function(professor) {
        expect(professor).to.be.null;
        done();
      });
    });
    it('should find Richard Parry', function(done) {
      this.timeout(5000);
      var rmp = require("../src/main.js");
      rmp.get("Richard Parry", function(professor) {
        expect(professor).to.not.be.null;
        expect(professor.fname).to.equal("Richard");
        done();
      });
    });
    describe("get('Naseem Ibrahim',..)", function() {
      it('should find Naseem Ibrahim using no University', function(done) {
        this.timeout(5000);
        var rmp = require("../src/main.js");
        rmp.get("Naseem Ibrahim", function(professor) {
          expect(professor.fname).to.equal("Naseem");
          done();
        });
      });
      // TODO add tests for values of properties
      it('should have properties fname, lname, quality, grade, university, clarity, easiness, comments, courses', function(done) {
        this.timeout(5000);
        var rmp = require("../src/main.js");
        rmp.get("Naseem Ibrahim", function(professor) {
          expect(professor).to.have.property('fname', "Naseem");
          expect(professor).to.have.property('lname', "Ibrahim");
          expect(professor.fname).to.be.a("string");
          expect(professor.lname).to.be.a("string");
          expect(professor.quality).to.be.a("string");
          expect(professor.university).to.be.a("string");
          expect(professor.grade).to.be.a("string");
          expect(professor.clarity).to.be.a("string");
          expect(professor.easiness).to.be.a("string");
          expect(professor.comments).to.be.a("array");
          expect(professor.courses).to.be.a("array");
          expect(professor.courseRatings).to.be.a("array");
          expect(professor.tags).to.be.a("array");
          done();
        });
      });
      it('should have same number of comments, courses, and ratings', function(done) {
        this.timeout(5000);
        var rmp = require("../src/main.js");
        rmp.get("Meng Su", function(professor) {
          expect(professor.courses.length).to.be.equal(professor.courseRatings.length);
          expect(professor.courseRatings.length).to.be.equal(professor.comments.length);
          done();
        });
      });
    });
    describe(".get({...}, callback);", function() {
      it('should find Naseem Ibrahim', function(done) {
        this.timeout(5000);
        rmp.get({
          name: "Naseem Ibrahim"
        }, function(professor) {
          expect(professor).to.not.be.null;
          expect(professor.fname).to.equal("Naseem");
          done();
        });
      });
      it('should find Jalaa Hoblos at Penn State', function(done) {
        this.timeout(5000);
        rmp.get({
          name: "Jalaa Hoblos",
          uni: "Pennsylvania State University"
        }, function(professor) {
          expect(professor.fname).to.equal("Jalaa");
          done();
        });
      });
      it('should not find Jalaa Hoblos at Ohio State', function(done) {
        this.timeout(5000);
        rmp.get({
          name: "Jalaa Hoblos",
          uni: "Ohio State"
        }, function(professor) {
          expect(professor).to.be.null;
          done();
        });
      });
      it('should not find Richard Parry at Penn State', function(done) {
        this.timeout(5000);
        rmp.get({
          name: "Richard Parry",
          uni: "Pennsylvania State University"
        }, function(professor) {
          expect(professor).to.be.null;
          done();
        });
      });
      it('should not find Meng Su at Penn State Harrisburg', function(done) {
        this.timeout(5000);
        rmp.get({
          name: "Meng Su",
          uni: "Pennsylvania State University",
          campus: "Harrisburg"
        }, function(professor) {
          expect(professor).to.be.null;
          done();
        });
      });
      it('should find Meng Su at Penn State Erie', function(done) {
        this.timeout(5000);
        rmp.get({
          name: "Meng Su",
          uni: "Pennsylvania State University",
          campus: "Erie"
        }, function(professor) {
          expect(professor.fname).to.equal("Meng");
          done();
        });
      });
    });
    describe("Searching professor with blank page", function() {
      // it("should not find Sunil Nair", function(done) {
      //   this.timeout(5000);
      //   var BC = rmp("Baruch College");
      //   BC.get("Sunil Nair", function(professor) {
      //     expect(professor).to.be.null;
      //     done();
      //   });
      // });
      // TODO Add new test here
    });
    describe("Searching with only first name", function() {
        it("should find John Pollard using only first name John to search", function(done) {
            this.timeout(5000);
            rmp.get("John", function (professor) {
              expect(professor.fname).to.equal("John");
              expect(professor.lname).to.equal("Pollard");
              done();
            });
        })
    })
  });

  ///////////////////////
  // Instance creation //
  ///////////////////////

  describe("pennState = rmp('Pennsylvania State University');", function() {
    var rmp = require("../src/main.js");
    var pennState = rmp("Pennsylvania State University");
    it("should be a function", function() {
      expect(pennState).to.be.a("function");
    });
    it("should have a get property", function() {
      expect(pennState).to.have.property('get');
    });
    describe(".get", function() {
      it("should find Meng Su", function(done) {
        this.timeout(5000);
        pennState.get("Meng Su", function(professor) {
          expect(professor).to.not.be.null;
          expect(professor.fname).to.equal("Meng");
          done();
        });
      });
      it('should not find Richard Parry', function(done) {
        this.timeout(5000);
        pennState.get("Richard Parry", function(professor) {
          expect(professor).to.be.null;
          done();
        });
      });
    });
  });
  describe("var erie = rmp('Pennsylvania State University')('Erie');", function() {
    var erie = rmp("Pennsylvania State University")("Erie");
    it("should be a function", function() {
      expect(erie).to.be.a("function");
    });
    it("should have a function property get", function() {
      expect(erie).to.have.property("get");
      expect(erie.get).to.be.a("function");
    });
    it("should find Jalaa Hoblos", function(done) {
      this.timeout(5000);
      erie.get("Jalaa Hoblos", function(professor) {
        expect(professor).to.not.be.null;
        expect(professor.fname).to.equal("Jalaa");
        done();
      });
    });
    it("should not find Sukmoon Chang", function(done) {
      this.timeout(5000);
      erie.get("Sukmoon Chang", function(professor) {
        expect(professor).to.be.null;
        done();
      });
    });
  });
  describe("rmp('Pennsylvania State University')('Harrisburg').get(...);", function() {
    it("should be a function", function() {
      expect(rmp('Pennsylvania State University')('Harrisburg').get).to.be.a("function");
    });
    it("should not find Jalaa Hoblos", function(done) {
      this.timeout(5000);
      rmp('Pennsylvania State University')('Harrisburg').get("Jalaa Hoblos", function(professor) {
        expect(professor).to.be.null;
        done();
      });
    });
    it("should find Sukmoon Chang", function(done) {
      this.timeout(5000);
      rmp('Pennsylvania State University')('Harrisburg').get("Sukmoon Chang", function(professor) {
        expect(professor).to.not.be.null;
        expect(professor.fname).to.equal("Sukmoon");
        done();
      });
    });
  });
});
