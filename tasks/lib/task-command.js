require("./include");

function TaskCommand(taskArgs) {

	var self = this;
	self.cmd = taskArgs.cmd;
	self.args = taskArgs.args;

	self.createOptions = function(){
		return {
			cmd: taskArgs.cmd,
			args: taskArgs.args,
			nodeSpawnOptions: {
				stdio: "inherit"
			}
		};
	};

	self.redirectOutput = function(spawn){
		spawn.stdin.pipe(process.stdin);
		spawn.stdout.pipe(process.stdout);
		spawn.stderr.pipe(process.stderr);
	};

	self.execute = function(done) {
		grunt.log.debug("spawn::lib::Task::#execute() ->");

		self.printCommand();

		var opts = self.createOptions();
		var spawn = grunt.util.spawn(opts, function() {});
		self.redirectOutput(spawn);

		spawn.on("error", function() {
			grunt.fail.fatal("Spawn: A child process generated error. Exiting.", 1);
		})

		spawn.on("exit", function(code) {
			if (done != null) 
				done(code);

			if (code !== 0) 
				grunt.fail.fatal("Spawn: A child process generated error. Exiting.", 1);
		})

		grunt.log.debug("spawn::lib::Task::#execute() <-");
	};
}

module.exports = Task;