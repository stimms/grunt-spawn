grunt = require("grunt");

describe("Given Spawn()", function(){

	grunt.initConfig({
		spawn: {
			list: {
				command: "ls",
				args: ["-la"]
			}, 
			print: {
				command: "cat", 
				args: ["{0}"], 
				files: {
					src: ["./../**/*.js"],
					filter: "isFile",
					expand: true
				}
			}
		}
	});

	grunt.loadTasks("./../tasks");

	describe("When #list()", function(){

		it("Then should not throw", function(){

			grunt.task.run("spawn:list");

		});

	});

	describe("When #print()", function(){

		it("Then should not throw", function(){

			grunt.task.run("spawn:print");

		});

	});

});