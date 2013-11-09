require("./include");

function Task(taskArgs) {
	'use strict';
	
	var self = this;
	self.cmd = taskArgs.cmd;
	self.args = taskArgs.args;

	self.execute = function(done) {
		grunt.log.debug("spawn::lib::Task::#execute() ->");

		var options = {
			cmd: taskArgs.cmd,
			args: taskArgs.args,
			opts: {
				cwd: taskArgs.cwd
			}
		};

		var formattedCmd = taskArgs.cmd;
		var formattedArgs = S(_(taskArgs.args).toString()).replaceAll(",", " ");
		var spawnCommand = "{0} {1}".format(formattedCmd, formattedArgs);

		grunt.log.subhead("\nSpawn: Launching child process");
		grunt.log.ok("Spawn: Launching '{0}' in '{1}'".format(spawnCommand, options.opts.cwd));

		var spawn = grunt.util.spawn(options, function() {});
		spawn.stdin.pipe(process.stdin);
		spawn.stdout.pipe(process.stdout);
		spawn.stderr.pipe(process.stderr);

		spawn.on("error", function() {
			self.fail();
		});

		spawn.on("exit", function(code) {
			if (done != null) done(code);
			if (code !== 0) grunt.fail.fatal("Spawn: A child process generated error. Exiting.", 1);
		});

		grunt.log.debug("spawn::lib::Task::#execute() <-");
	};

	self.fail = function(){
		grunt.fail.fatal("Spawn: A child process generated error. Exiting.", 1);
	};
}

module.exports = Task;