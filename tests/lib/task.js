require("string-format");

var grunt = require("grunt");
var should = require("should");

var Task = require("../../tasks/lib/task");
var TaskArgs = require("../../tasks/lib/taskargs");

describe("Given Task('ls', ['-la'])", function() {

	var args = new TaskArgs("ls", ["-la"]);
	var task = new Task(args);

	describe("When #execute()", function() {

		it("Then should not throw", function() {

			task.execute();

		});

	});

	describe("When #execute() with callback", function() {

		it("Then should not throw", function(done) {

			task.execute(function(code) {
				code.should.equal(0);
				done();
			});

		});

	});

});