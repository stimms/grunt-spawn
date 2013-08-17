require("./lib/include");
spawn = require("./lib");

grunt.registerMultiTask("spawn", function() {

	this.buildCommands = function(){
		var factory = new spawn.TaskFactory(this);
		var commands = factory.buildTaskCommands();
		return commands;
	};

	this.buildActions = function(commands){
		var counter = 0;
		var actions = [];

		_.each(commands, function(command) {
			actions.push(function(callback) {
				command.execute(function() {
					callback(null, counter++);
				});
			});
		});

		return actions;
	};

	var done = this.async();
	var commands = this.buildCommands();
	var actions = this.buildActions(commands);
	
	async.series(actions, function() {
		done();
	});

});