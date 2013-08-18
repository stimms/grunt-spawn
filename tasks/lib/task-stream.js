require("./include");

function TaskStream(){

	var self = this;

	self.redirectOutput = function(spawn){
		spawn.stdin.pipe(process.stdin);
		spawn.stdout.pipe(process.stdout);
		spawn.stderr.pipe(process.stderr);
	};

}