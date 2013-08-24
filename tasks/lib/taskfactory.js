require("./include");

Task = require("./task");
TaskArgs = require("./taskargs");
TaskConfig = require("./taskconfig");
TaskFilter = require("./taskfilter");
FileBuilder = require("./filebuilder");
Wildcard = require("./wildcard");

function TaskFactory(task) {

	assert(task, "TaskFactory::task = null");

	var self = this;
	self.config = new TaskConfig(task);
	self.filter = new TaskFilter(task);

	grunt.log.debug("spawn::lib::TaskFactory::#ctor() ->");

	self.format = function(args, filepath) {

		grunt.log.debug("spawn::lib::TaskFactory::#format() ->");

		formattedArgs = [];

		_.each(args, function(arg) {
			if (!_.isNull(filepath)) {
				formattedArgs.push(arg.format(filepath));
			} else {
				if (arg != "{0}") formattedArgs.push(arg);
			}
		});

		grunt.log.debug("spawn::lib::TaskFactory::#format() <-");

		return formattedArgs;
	};

	self.quoteWith = function(delimiter, stringArray) {
		var result = [];
		_(stringArray).each(function(str){
			result.push(delimiter + str + delimiter);
		});
		return result;
	};

	self.buildTasks = function(){

		grunt.log.debug("spawn::lib::TaskFactory::#buildTasks() ->");

		var tasks = [];
		var config = self.config.get();

		grunt.log.debug("spawn::lib::TaskFactory::#buildTasks()::After configuration get");
		grunt.log.debug("spawn::lib::TaskFactory::#buildTasks()::config.directory=" + i(config.directory));
		
		var files = 
			(new FileBuilder())
				.setDirectory(config.directory)
				.allFiles();

		grunt.log.debug("spawn::lib::TaskFactory::#buildTasks()::After files get");
		
		var wildcard = new Wildcard();
		var filteredFiles = wildcard.matches(config.pattern, files);

		if(config.useQuotes)
			filteredFiles = self.quoteWith(config.quoteDelimiter, filteredFiles);

		if (config.groupFiles) {
			var groupedFiles = filteredFiles.join(config.fileDelimiter);
			var args = self.format(config.arguments, groupedFiles);
			var taskArgs = new TaskArgs(config.command, args);
			var task = new Task(taskArgs);
			tasks.push(task);
		} else {
			_(files).each(function(file){
				var args = self.format(config.arguments, file);
				var taskArgs = new TaskArgs(config.command, args);
				var task = new Task(taskArgs);
				tasks.push(task);
			});
		}

		grunt.log.debug("spawn::lib::TaskFactory::#buildTasks() <-");

		return tasks;
	};

}

module.exports = TaskFactory;