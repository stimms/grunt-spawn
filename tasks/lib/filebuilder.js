require("./include");

function FileBuilder() {

	var self = this;
	self.scanPattern = /.*/;
	self.rootDirectory = path.normalize(__dirname + "/../../");

	self.setDirectory = function(directory) {
		self.rootDirectory = path.normalize(directory);
	};

	self.eachDirectory = function(directoryCallback) {
		
		assert(directoryCallback, "directoryCallback == null");
		
		var results = [];

		fstools.walkSync(
			self.rootDirectory, 
			self.scanPattern, 
			function(fileSystemItem) {
				var directory = path.dirname(fileSystemItem);
				directory = path.normalize(directory);
				results.push(directory);
			});

		results = _(results)
			.unique()
			.each(function(directory){
				directoryCallback(directory);
			});


	};

	self.eachFile = function(fileCallback) {

		assert(fileCallback, "fileCallback == null");
		
		fstools.walkSync(
			self.rootDirectory, 
			self.scanPattern, 
			function(fileSystemItem) {
				var filePath = path.normalize(fileSystemItem);
				fileCallback(filePath);
			});

	};

}

module.exports = FileBuilder;