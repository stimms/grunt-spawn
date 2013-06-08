require("string-format");

_ = require("lodash")
util = require("util");
grunt = require("grunt");

function Task(taskArgs){

	var self = this;
	self.cmd = taskArgs.cmd;
	self.args = taskArgs.args;

	self.execute = function(done) {

		grunt.log.debug("spawn::lib::Task::#execute() ->");

		var options = {
			cmd: taskArgs.cmd,
			args: taskArgs.args,
			nodeSpawnOptions: {
				stdio: "inherit"
			}
		};

		grunt.log.subhead("Spawn: Launching child process");
		grunt.log.ok("Spawn: Launching '{0} {1}'".format(taskArgs.cmd, _(taskArgs.args).toString()));

		var spawn = grunt.util.spawn(options);
		spawn.stdin.pipe(process.stdin);
		spawn.stdout.pipe(process.stdout);
		spawn.stderr.pipe(process.stderr);

		spawn.on("error", function(){
			grunt.fail.fatal("Spawn: A child process generated error. Exiting.", 1);
		})

		spawn.on("exit", function(code){
			
			if (!_.isNull(done))
				done(code);
			
			if (code !== 0)
				grunt.fail.fatal("Spawn: A child process generated error. Exiting.", 1);
		})

		grunt.log.debug("spawn::lib::Task::#execute() <-");
	};
}

module.exports = Task;