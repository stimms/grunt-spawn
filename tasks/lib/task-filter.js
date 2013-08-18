require("./include");

function TaskFilter(task) {

	var self = this;

	self.include = function(files, incl) {

		var result = [];

		_.each(incl, function(i) {
			_.each(files, function(file) {
				var shouldInclude = S(file)[i.op](i.val);
				if (shouldInclude) {
					result.push(file);
				}
			});
		});

		return result;
	};

	self.exclude = function(files, excl) {

		var result = [];

		_.each(excl, function(e) {
			_.each(files, function(file) {
				var shouldExclude = S(file)[e.op](e.val);
				if (!shouldExclude) {
					result.push(file);
				}
			});

		});

		return result;
	}

	self.zap = function(files) {

		if (_.has(task.data, "incl")) {
			files = self.include(files, task.data.incl);
		}

		if (_.has(task.data, "excl")) {
			files = self.exclude(files, task.data.excl);
		}

		return files;
	};

}

module.exports = TaskFilter;