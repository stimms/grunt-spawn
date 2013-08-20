require("./include");

function TaskFilter(task) {

	var self = this;

	grunt.log.debug("spawn::lib::TaskFilter::#ctor() ->");

	self.include = function(files, incl) {

		var result = [];

		grunt.log.debug("spawn::lib::TaskFilter::#include() ->");

		_.each(incl, function(i) {
			_.each(files, function(file) {
				var shouldInclude = S(file)[i.op](i.val);
				if (shouldInclude) {
					result.push(file);
				}
			});
		});

		grunt.log.debug("spawn::lib::TaskFilter::#include() -> result = " + util.inspect(result));
		grunt.log.debug("spawn::lib::TaskFilter::#include() <-");

		return result;
	};

	self.exclude = function(files, excl) {

		var result = [];

		grunt.log.debug("spawn::lib::TaskFilter::#exclude() ->");

		_.each(excl, function(e) {
			_.each(files, function(file) {
				var shouldExclude = S(file)[e.op](e.val);
				if (!shouldExclude) {
					result.push(file);
				}
			});

		});

		grunt.log.debug("spawn::lib::TaskFilter::#exclude() -> result = " + util.inspect(result));
		grunt.log.debug("spawn::lib::TaskFilter::#exclude() <-");

		return result;
	}

	self.zap = function(files) {

		grunt.log.debug("spawn::lib::TaskFilter::#zap() ->");

		if (_.has(task.data, "incl")) {
			files = self.include(files, task.data.incl);
		}

		if (_.has(task.data, "excl")) {
			files = self.exclude(files, task.data.excl);
		}

		grunt.log.debug("spawn::lib::TaskFilter::#zap() <-");

		return files;
	};

}

module.exports = TaskFilter;