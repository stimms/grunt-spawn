require("./include");

function TaskArgs(cmd, args) {
	
	var self = this;
	self.args = args;
	self.cmd = cmd;

	self.format = function(filepath) {

			formattedArgs = [];

			_.each(args, function(arg) {

				if (arg != "{0}") 
					formattedArgs.push(arg);

				if (!_.isNull(filepath)) 
					formattedArgs.push(arg.format(filepath));
				else
					formattedArgs.push(arg);

			});

			return formattedArgs;
		};

	}

module.exports = TaskArgs;