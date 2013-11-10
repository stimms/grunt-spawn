require("./include");

function TaskArgs(cmd, args, cwd) {
	var self = this;

	self.cmd = cmd;
	self.args = args;
	self.cwd = cwd;
}

module.exports = TaskArgs;