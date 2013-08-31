var _ = require("lodash");
var async = require("async");
var grunt = require("grunt");
var spawn = require("./lib");

grunt.registerMultiTask("spawn", function() {
	'use strict';

	var counter = 0;
	var actions = [];
	var done = this.async();
	var factory = new spawn.TaskFactory(this);
	var tasks = factory.buildTasks();

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