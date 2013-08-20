require("./include");

Task = require("./task");
TaskArgs = require("./taskargs");
TaskFilter = require("./taskfilter");

function TaskFactory(task) {

	var self = this;
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

	self.hasFiles = function() {

		grunt.log.debug("spawn::lib::TaskFactory::#hasFiles() ->");
		grunt.log.debug("spawn::lib::TaskFactory::#hasFiles() <-");

		return !_.isNull(task) && _.has(task, "files") && _.has(task.files, "length") && task.files.length > 0;

	};

	self.buildFiles = function() {

		grunt.log.debug("spawn::lib::TaskFactory::#buildFiles() ->");

		var files = [];

		if (self.hasFiles()) {

			grunt.log.debug("spawn::lib::TaskFactory::#buildFiles() -> hasFiles = true");

			_.each(task.files, function(file) {
				files.push(file.src[0]);
			});

		} else {
			grunt.log.debug("spawn::lib::TaskFactory::#buildFiles() -> hasFiles = false");
		}

		grunt.log.debug("spawn::lib::TaskFactory::#buildFiles() <-");

		return files;
	};

	self.buildTasks = function() {

		grunt.log.debug("spawn::lib::TaskFactory::#buildTasks() ->");

		var tasks = [];
		var files = self.buildFiles();
		files = self.filter.zap(files);

		if (_.any(files)) {

			grunt.log.debug("spawn::lib::TaskFactory::#buildTasks() -> clump? = " + task.data.clump);

			if (!_.isNull(task.data.clump) && task.data.clump) {
				
				var clumpedFiles = files.join(" ");
				var args = self.format(task.data.args, clumpedFiles);
				var taskArgs = new TaskArgs(task.data.cmd, args);
				tasks.push(new Task(taskArgs));

			} else {
				
				_.each(files, function(file) {
					var args = self.format(task.data.args, file);
					var taskArgs = new TaskArgs(task.data.cmd, args);
					tasks.push(new Task(taskArgs));
				});

			}

		} else {

			var args = self.format(task.data.args, null);
			var taskArgs = new TaskArgs(task.data.cmd, args);
			tasks.push(new Task(taskArgs));

		}

		grunt.log.debug("spawn::lib::TaskFactory::#buildTasks() <-");

		return tasks;
	};

}

module.exports = TaskFactory;