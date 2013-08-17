require("./include");

function TaskPrinter() {

	var self = this;

	self.formatCommand = function(taskArgs){
		var stringArgs = _(taskArgs.args).toString();
		var formattedArgs = S(stringArgs).replaceAll(",", " ");
		return "{0} {1}".format(taskArgs.cmd, formattedArgs);
	};

	self.printCommand = function(taskArgs){
		var cmd = self.formatCommand();
		grunt.log.subhead("\nSpawn: Launching child process");
		grunt.log.ok("Spawn: Launching '{0}'".format(cmd));
	};


}

module.exports = TaskPrinter;