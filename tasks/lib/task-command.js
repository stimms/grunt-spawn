require("./include");

function TaskCommand(taskArgs, taskEvents, taskPrinter, taskStream) {

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

	self.execute = function(done) {
		grunt.log.debug("spawn::lib::Task::#execute() ->");

		var opts = self.createOptions();
		var spawn = grunt.util.spawn(opts, function() {});
		self.redirectOutput(spawn);

		grunt.log.debug("spawn::lib::Task::#execute() <-");
	};
}

module.exports = Task;