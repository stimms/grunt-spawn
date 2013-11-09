require("../../tasks/lib/include");
var fs = require('fs');

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
	var cwd = "temp";
	var cwdArgs = new TaskArgs("ls", ["-la"], cwd);
	var cwdTask = new Task(cwdArgs);

	describe("When #execute() with cwd", function() {
		it("Then should not throw if cwd exists", function(){
			fs.mkdirSync(cwd);
			cwdTask.execute();
			fs.rmdirSync(cwd);
		});

		it("Then should fail if cwd doesn't exist", function()
		{
			var fails = false;
			cwdTask.fail = function()
			{
				fails = true;
			};
			cwdTask.execute(function(){
				assert(fails, "Throws exception");
			});
			
		});
	});

	describe("When #execute() with callback", function() {

		it("Then should not throw", function(done) {

			task.execute(function(code) {
				assert(code == 0, "Task did not exit cleanly");
				done();
			});

		});

	});

});