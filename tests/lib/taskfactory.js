require("../../tasks/lib/include");

var TaskFactory = require("../../tasks/lib/taskfactory");
var FileBuilder = require("../../tasks/lib/filebuilder");

describe("Given TaskFactory() with files", function() {

	var task = {
		data: {
			command: "command",
			commandArgs: ["arg1", "arg2", "{0}"],
			directory: __dirname, 
			pattern: "**/*.js"
		},
	};

	var taskFactory = new TaskFactory(task);

	describe("When #format()", function() {

		var file = "anyfile";
		var args = ["arg1", "arg2", "{0}"];
		var result = taskFactory.format(args, file);

		it("Then should have ['arg1', 'arg2', 'anyfile']", function() {
			assert(result.length == 3);
			assert(result[0] == "arg1");
			assert(result[1] == "arg2");
			assert(result[2] == "anyfile");
		});

	});

	describe("When #buildTasks()", function() {

		var tasks = taskFactory.buildTasks();

		var files = 
			(new FileBuilder())
				.setDirectory(__dirname)
				.allFiles();

		it("Then should have {0} tasks".format(files.length), function() {
			assert(tasks.length == files.length, "Tasks dont match files");
		});

	});

});

describe("Given TaskFactory() without files", function() {

	var task = {};

	var taskFactory = new TaskFactory(task);

	describe("When #format()", function() {

		var args = ["arg1", "arg2", "arg3"];
		var result = taskFactory.format(args);

		it("Then should have ['arg1', 'arg2', 'arg3']", function() {
			assert(result.length == 3);
			assert(result[0] == "arg1");
			assert(result[1] == "arg2");
			assert(result[2] == "arg3");

		});

	});

});