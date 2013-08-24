function TaskConfig(task) {

	assert(task, "TaskConfig::task = null");
	
	var self = this;
	self.task = task;
	self._task = _(task);
	self._data = _(task.data);
	self.taskIsNotNull = !_.isNull(task);
	self.taskHasData = self._task.has("data");

	self.propertyDefinitions = {
		command: { required: true, type: "path", default: "ls" },
		arguments: { required: false, type: "array", default: "{0}" },
		pattern: { required: true, type: "string", default: "**/**.js" },
		directory: { required: false, type: "path", default: "../../../../" },
		groupFiles: { required: false, type: "bool", default: false },
		fileSeparator: { require: false, type: "char", default: " " }
	};

	self.hasData = function(){
		return self.taskIsNotNull && self.taskHasData;
	};

	self.hasProperty = function(propertyName) {
		var result = self.hasData() && !_.isNull(self.task.data[propertyName]);
		return result;
	};

	self.getProperty = function(propertyName) {
		var result = self.task.data[propertyName];
		grunt.log.debug("propertyName = " + i(propertyName));
		grunt.log.debug("result = " + i(self.task));
		return result;
	};

	self.throwIfPropertyNotFound = function(propertyName, propertySpecification) {
		if (!self.hasProperty(propertyName))
			throw "Could not find property '{0}' for task '{1}', please make sure you define one of type '{2}'"
				.format(propertyName, self.task.name, propertySpecification);
	};

	self.get = function(){

		var result = {};

		_(self.propertyDefinitions).forIn(function(value, key, object){
			self.throwIfPropertyNotFound(key, value);
			if (self.hasProperty(key))
				result[key] = self.getProperty(key);
			else
				result[key] = value.default;
		});

		return result;

	};
}

module.exports = TaskConfig;