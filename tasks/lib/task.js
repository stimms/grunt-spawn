util = require("util");
grunt = require("grunt");

function Task(taskArgs){

	var self = this;
	self.command = taskArgs.command;
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

		grunt.log.debug("spawn::lib::Task::#execute() -> options = \n" + util.inspect(options));

		var process = grunt.util.spawn(options, function(error, result, code){
			if (done) {
				done(error, result, code);
			}
		});

		process.stdin.pipe(process.stdin);
		process.stdout.pipe(process.stdout);
		process.stderr.pipe(process.stderr);

		grunt.log.debug("spawn::lib::Task::#execute() <-");
	};
}

module.exports = Task;