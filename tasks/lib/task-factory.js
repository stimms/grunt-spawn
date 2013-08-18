require("./include");

var GruntTask = require("./grunt-task");
var TaskFilter = require("./task-filter");

function TaskFactory(gruntTask) {

	var self = this;
	self.task = new GruntTask(gruntTask);
	self.filter = new TaskFilter(gruntTask);

	self.buildTaskCommands = function() {

		var tasks = [];
		var files = self.task.buildFiles();
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