require("./include");

function TaskCommand(taskArgs) {

	var self = this;
	self.cmd = taskArgs.cmd;
	self.args = taskArgs.args;

	self.formatCmd = function(){
		var stringArgs = _(taskArgs.args).toString();
		var formattedArgs = S(stringArgs).replaceAll(",", " ");
		return "{0} {1}".format(taskArgs.cmd, formattedArgs);
	};

	self.printCmd = function(){
		var cmd = self.formatCmd();
		grunt.log.subhead("\nSpawn: Launching child process");
		grunt.log.ok("Spawn: Launching '{0}'".format(cmd));
	};

	self.createOpts = function(){
		return {
			cmd: taskArgs.cmd,
			args: taskArgs.args,
			nodeSpawnOptions: {
				stdio: "inherit"
			}
		};
	};

	self.redirectIO = function(spawn){
		spawn.stdin.pipe(process.stdin);
		spawn.stdout.pipe(process.stdout);
		spawn.stderr.pipe(process.stderr);
	};

	self.execute = function(done) {
		grunt.log.debug("spawn::lib::Task::#execute() ->");

		self.printCmd();

		var opts = self.createOpts();
		var spawn = grunt.util.spawn(opts, function() {});
		self.redirectIO(spawn);

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