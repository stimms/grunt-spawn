require("./include");

function GruntTaskConfig(gruntTask){

	var self = this;

	self.shouldClump = function(){
		return !_.isNull(gruntTask.data.clump) && gruntTask.data.clump;
	};

	self.hasFiles = function() {
		return !_.isNull(gruntTask) && 
			_.has(gruntTask, "files") && 
			_.has(gruntTask.files, "length") && 
			gruntTask.files.length > 0;
	};
}