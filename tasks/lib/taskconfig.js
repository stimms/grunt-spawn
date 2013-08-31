var _ = require("lodash");
var assert = require('assert');


function TaskConfig(task) {
	'use strict';

	assert(task, "TaskConfig::task = null");
	
	var self = this;
	self.task = task;
	self._task = _(task);
	self._data = _(task.data);
	self.taskIsNotNull = !_.isNull(task);
	self.taskHasData = self._task.has("data");

	self.propertyDefinitions = {
		command: { required: true, type: "path", defaultValue: "ls" },
		commandArgs: { required: false, type: "array", defaultValue: ["{0}"] },
		directory: { required: false, type: "path", defaultValue: "../../../../" },
		pattern: { required: false, type: "string", defaultValue: "**/*.js" },
		useQuotes: { required: false, type: "bool", defaultValue: false },
		quoteDelimiter: { required: false, type: "char", defaultValue: "\"" },
		groupFiles: { required: false, type: "bool", defaultValue: false },
		fileDelimiter: { require: false, type: "char", defaultValue: " " }
	};

	self.hasData = function(){
		return self.taskIsNotNull && self.taskHasData;
	};

	self.hasProperty = function(propertyName) {
		var result = self.hasData() && _(self.task.data).has(propertyName);
		return result;
	};

	self.getProperty = function(propertyName) {
		var result = self.task.data[propertyName];
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
			var propertyValue = value.defaultValue;
			if (value.required)
				self.throwIfPropertyNotFound(key, value);
			if (self.hasProperty(key))
				propertyValue = self.getProperty(key);
			result[key] = propertyValue;
		});

		return result;

	};
}

module.exports = TaskConfig;