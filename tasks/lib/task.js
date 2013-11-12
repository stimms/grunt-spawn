require("./include");

function Task(taskArgs) {
	'use strict';
	
	var self = this;
	self.taskArgs = taskArgs;
	self.__type__ = "<grunt-spawn/>::tasks::lib::Task::";

	self.fail = function(){
		grunt.fail.fatal("<grunt-spawn/>: A child process generated error. Exiting.", 1);
	};

	self.execute = function(done) {
		grunt.log.debug(self.__type__ + "execute(done) ->");

		var options = self.taskArgs;
		var formattedCmd = taskArgs.cmd;
		var formattedArgs = S(_(taskArgs.args).toString()).replaceAll(",", " ");
		var spawnCommand = "{0} {1}".format(formattedCmd, formattedArgs);

		grunt.log.subhead("\n<grunt-spawn/>: Launching child process");

		if (taskArgs.opts && taskArgs.opts.cwd) {
			grunt.log.ok("<grunt-spawn/>: Launching '{0}' starting in '{1}' overridden with cwd='{2}'".format(spawnCommand, process.cwd(), taskArgs.opts.cwd));
		} else {
			grunt.log.ok("<grunt-spawn/>: Launching '{0}' in current process working directory '{1}'".format(spawnCommand, process.cwd()));
		}

		var spawn = grunt.util.spawn(options, function() {});
		spawn.stdin.pipe(process.stdin);
		spawn.stdout.pipe(process.stdout);
		spawn.stderr.pipe(process.stderr);

		spawn.on("error", function() {
			self.fail();
		});

		spawn.on("exit", function(code) {
			spawn.stdin.unpipe(process.stdin);
			spawn.stdout.unpipe(process.stdout);
			spawn.stderr.unpipe(process.stderr);
			if (done != null) done(code);
			if (code !== 0) self.fail();
		});

		grunt.log.debug(self.__type__ + "execute(result=void) <-");
	};
}

module.exports = Task;