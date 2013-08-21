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

	self.allDirectories = function(){

		var results = [];

		self.eachDirectory(function(directory){
			results.push(directory);
		});

		return results;

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

	self.allFiles = function(){

		var results = [];

		self.eachFile(function(file){
			results.push(file);
		});

		return results;

	};

	self.all = function(){

		var results = [];
		results = results.concat(self.allDirectories());
		results = results.concat(self.allFiles());
		return results;

	};

}

module.exports = FileBuilder;