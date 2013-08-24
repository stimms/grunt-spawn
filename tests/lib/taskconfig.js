require("../../tasks/lib/include");

grunt = require("grunt");
should = require("should");

TaskConfig = require("../../tasks/lib/taskconfig");

describe("Given TaskConfig()", function() {

	var taskConfig = new TaskConfig({
		data: {
			command:"anyCommand", 
			arguments: ["anyArg"], 
			pattern: "anyPattern",
			directory: "anyDirectory"
		}
	});

	describe("When #get()", function() {

		var config = taskConfig.get();

		it("Then should find 'command'", function() {
			assert(config.command == "anyCommand", "command != null");
		});

		it("Then should find 'arguments'", function() {
			assert(config.arguments, "arguments != null");
			assert(config.arguments.length > 0, "arguments.length > 0");
			assert(config.arguments[0] == "anyArg", "arguments[0] != 'anyArg'");
		});

		it("Then should find 'pattern'", function() {
			assert(config.pattern == "anyPattern", "pattern == null");
		});

		it("Then should find 'directory'", function() {
			assert(config.directory == "anyDirectory", "directory == null");
		});

	});

});