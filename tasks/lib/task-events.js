require("./include");

function TaskEvents(){

	var self = this;

	self.subscribeEvents = function(spawn){

		spawn.on("error", function() {
			grunt.fail.fatal("Spawn: A child process generated error. Exiting.", 1);
		})

		spawn.on("exit", function(code) {
			if (done != null) 
				done(code);

			if (code !== 0) 
				grunt.fail.fatal("Spawn: A child process generated error. Exiting.", 1);
		})

	};

}