_ = require("lodash");
require("string-format");
grunt = require("grunt");

spawn = require("./lib");

grunt.registerMultiTask("spawn", function(){
	
	var self = this;
	self.done = this.async();

	var factory = new spawn.TaskFactory(this);
	var tasks = factory.buildTasks();

	var counter = 0;

	_.each(tasks, function(task){
		
		task.execute(function(){
			counter++;
			if (counter == tasks.length) {
				self.done();
			}
		});

	});

});