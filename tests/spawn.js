grunt = require("grunt");

describe("Given Spawn()", function() {

	grunt.initConfig({
		spawn: {
			list: {
				command: "ls",
				arguments: ["-la", "{0}"], 
				directory: __dirname,
				pattern: "**/*.js",
				groupFiles: true,
				fileSeparator: " "
			},
			print: {
				command: "cat",
				arguments: ["{0}"],
				directory: __dirname,
				pattern: "**/*.js" 
			}
		}
	});

	grunt.loadTasks("tasks/");

	describe("When #list()", function() {

		it("Then should not throw", function() {

			grunt.task.run("spawn:list");

		});

	});

	describe("When #print()", function() {

		it("Then should not throw", function() {

			grunt.task.run("spawn:print");

		});

	});

});