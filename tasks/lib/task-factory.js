require("./include");

var TaskFilter = require("./task-filter");

function TaskFactory(gruntTask) {

	var self = this;
	self.filter = new TaskFilter(gruntTask);

	self.format = function(args, filepath) {

		formattedArgs = [];

		_.each(args, function(arg) {

			if (!_.isNull(filepath)) {
				formattedArgs.push(arg.format(filepath));
			} else {
				if (arg != "{0}") formattedArgs.push(arg);
			}

		});

		return formattedArgs;
	};

	self.hasFiles = function() {

		return !_.isNull(task) && _.has(task, "files") && _.has(task.files, "length") && task.files.length > 0;

	};

	self.buildFiles = function() {

		var files = [];

		if (self.hasFiles()) {
			_.each(task.files, function(file) {
				files.push(file.src[0]);
			});
		}

		return files;
	};

	self.buildTaskCommands = function() {

		var tasks = [];
		var files = self.buildFiles();
		files = self.filter.zap(files);

		if (_.any(files)) {

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

		return tasks;
	};

}

module.exports = TaskFactory;