grunt = require("grunt");
should = require("should");

TaskFactory = require("../../tasks/lib/taskfactory");

describe("Given TaskFactory() with files", function(){

	var task = {
		data: {
			cmd: "command", 
			args: ["arg1", "arg2", "{0}}"]
		},
		files: [{
			src: ["file1"]
		}, {
			src: ["file2"]
		},{
			src: ["file3"]
		}]
	};

	var taskFactory = new TaskFactory(task);
	
	describe("When #buildFiles()", function(){

		var result = taskFactory.buildFiles();

		it("Then should have ['file1', 'file2', 'file3']", function(){

			result.should.include("file1");
			result.should.include("file2");
			result.should.include("file3");

		});

	});

	describe("When #format()", function(){

		var args = [
			"arg1", 
			"arg2", 
			"{0}"
		];

		var file = "anyfile";

		var result = taskFactory.format(args, file);

		it("Then should have ['arg1', 'arg2', 'anyfile']", function(){

			result.should.include("arg1");
			result.should.include("arg2");
			result.should.include("anyfile");

		});	

	});

	describe("When #hasFiles()", function(){

		it("Then should be 'true'", function(){

			taskFactory.hasFiles().should.be.true;

		});

	});

	describe("When #buildTasks()", function(){

		var tasks = taskFactory.buildTasks();

		it("Then should have 3 tasks", function(){

			tasks.length.should.equal(3);

		});

		it("Then should have task[1..n].command == 'command'", function(){

			tasks[0].command.should.equal("command");
			tasks[1].command.should.equal("command");
			tasks[2].command.should.equal("command");

		});

	});

});

describe("Given TaskFactory() without files", function(){

	var task = {};

	var taskFactory = new TaskFactory(task);

	describe("When #hasFiles()", function(){

		it ("Then should be 'false'", function(){

			taskFactory.hasFiles().should.be.false;

		});

	});

	describe("When #format()", function(){

		var args = [
			"arg1", 
			"arg2", 
			"arg3"
		];

		var result = taskFactory.format(args);

		it("Then should have ['arg1', 'arg2', 'arg3']", function(){

			result.should.include("arg1");
			result.should.include("arg2");
			result.should.include("arg3");

		});	

	});

});
