require("./include");

function GruntTask(gruntTask, gruntTaskConfig, gruntTaskFilter) {
	
	var self = this; 
	self.files = [];
	self.task = gruntTask;
	self.config = gruntTaskConfig;
	self.filter = gruntTaskFilter;

	self.extractFile = function(gruntFile) {
		return gruntFile.dest; // Might need to be gruntFile.src[0];
	}

	self.getFiles = function() {
		var files = [];		

		if (self.config.hasFiles()) {
			_.each(self.task.files, function(file) {
				var filePath = self.extractFile(file);
				files.push(filePath);
			});
		}

		files = self.filter.zap(files);

		if (self.config.shouldClump()) {
			self.files = [files.join(" ")];
			return self.files;
		}

		self.files = files;
		return self.files;
	};
}

module.exports = GruntTask;