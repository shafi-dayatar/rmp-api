var expect = require('chai').expect;
var rmp = require("../index.js");

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
      rmp.get("Naseem Ibrahim", function(professor) {
        expect(true).to.equal(true);
        done();
      });
    });
    it('should return null when not found', function(done) {
      var rmp = require("../src/main.js");
      rmp.get("hjkahdkad ajsdhakjdhj", function(professor) {
        expect(professor).to.be.null;
        done();
      });
    });
    it('should find Richard Parry', function(done) {
      var rmp = require("../src/main.js");
      rmp.get("Richard Parry", function(professor) {
        expect(professor).to.not.be.null;
        expect(professor.fname).to.equal("Richard");
        done();
      });
    });
    describe("get('Naseem Ibrahim',..)", function() {
      it('should find Naseem Ibrahim using no University', function(done) {
        var rmp = require("../src/main.js");
        rmp.get("Naseem Ibrahim", function(professor) {
          expect(professor.fname).to.equal("Naseem");
          done();
        });
      });
      it('should have properties fname, lname, quality, grade, university, clarity, easiness', function(done) {
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
          done();
        });
      });
    });
  });

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
        pennState.get("Meng Su", function(professor) {
          expect(professor).to.not.be.null;
          expect(professor.fname).to.equal("Meng");
          done();
        });
      });
      it('should not find Richard Parry', function(done) {
        pennState.get("Richard Parry", function(professor) {
          expect(professor).to.be.null;
          done();
        });
      });
    });
  });
});
