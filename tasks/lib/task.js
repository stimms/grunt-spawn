grunt = require("grunt");

function Task(taskArgs){

	var self = this;
	self.command = taskArgs.command;
	self.args = taskArgs.args;

	self.execute = function(done) {

		var options = {
			cmd: taskArgs.command,
			args: taskArgs.args,
			nodeSpawnOptions: {
				stdio: "inherit"
			}
		};

		var process = grunt.util.spawn(options, function(error, result, code){
			if (done) {
				done(error, result, code);
			}
		});

		process.stdin.pipe(process.stdin);
		process.stdout.pipe(process.stdout);
		process.stderr.pipe(process.stderr);
	};
}

module.exports = Task;