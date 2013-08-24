require("./include");

function Wildcard() {
	
	var self = this;

	self.isArrayAndNotNull = function(value) {
		return !_.isNull(value) && _(value).isArray();
	}

	self.matchArray = function(pattern, values){
		var results = [];
		var _values = _(values);
		var patternMatch = new Minimatch(pattern);
		if (self.isArrayAndNotNull(values)) {
			_values.each(function(value){
				if (patternMatch.match(value)) {
					results.push(value);
				}
			});
		}
		return results;
	};

	self.matchSingle = function(pattern, value){
		var patternMatch = new Minimatch(pattern);
		return !_.isNull(value) && patternMatch.match(value) ? true : false;
	};

	self.matches = function(pattern, listOfValues) {

		if (self.isArrayAndNotNull(listOfValues))
			return self.matchArray(pattern, listOfValues);
		return self.matchSingle(pattern, listOfValues);
	};
}

module.exports = Wildcard;