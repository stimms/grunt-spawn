require("./include");

function Wildcard() {
	'use strict';

	var self = this;

	self.isArrayAndNotNull = function(value) {
		return !_.isNull(value) && _(value).isArray();
	};

	self.matchArray = function(pattern, values){
		var results = [];
		var _values = _(values);
		if (self.isArrayAndNotNull(values)) {
			_values.each(function(value){
				if (minimatch(value, pattern, { matchBase: true })) {
					results.push(value);
				}
			});
		}
		return results;
	};

	self.matchSingle = function(pattern, value){
		return minimatch(value, pattern, { matchBase: true });
	};

	self.matches = function(pattern, listOfValues) {
		if (self.isArrayAndNotNull(listOfValues)) {
			return self.matchArray(pattern, listOfValues);
		}
		return self.matchSingle(pattern, listOfValues);
	};
}

module.exports = Wildcard;