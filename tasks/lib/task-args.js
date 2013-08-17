require("./include");

function TaskArgs(cmd, args) {
	var self = this;
	self.args = args;
	self.cmd = cmd;
}

module.exports = TaskArgs;