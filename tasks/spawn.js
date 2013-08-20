require("./lib/include");

grunt = require("grunt");
spawn = require("./lib");

grunt.registerMultiTask("spawn", function() {

	var done = this.async();
	var factory = new spawn.TaskFactory(this);
	var tasks = factory.buildTasks();

	var counter = 0;
	var actions = [];
	_.each(tasks, function(task) {
		actions.push(function(callback) {
			task.execute(function() {
				callback(null, counter++);
			});
		});
	});

	async.series(actions, function() {
		done();
	});

});