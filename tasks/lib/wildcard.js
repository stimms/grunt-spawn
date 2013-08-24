require("./include");

function Wildcard() {
	
	var self = this;

	self.matches = function(pattern, listOfValues) {

		ll("Wildcard::matches ->");
		ll("Wildcard::matches::pattern = " + pattern);
		ll("Wildcard::matches::listOfValues = " + i(listOfValues));

		if (!_.isArray(listOfValues)) {
			ll("Wildcard::matches::isArray = false");
			var singleValue = listOfValues;
			var result = wildcard(pattern, singleValue);
			result = result ? [singleValue] : []
			ll("Wildcard::matches::result = " + i(result));
			ll("matches <-");
			return result;
		}

		var result = [];
		ll("Wildcard::matches::isArray = true");
		_(listOfValues).each(function(value){
			ll("Wildcard::matches::value = " + i(value));
			ll("Wildcard::matches::pattern = " + i(pattern));
			ll("Wildcard::matches::result = " + i(wildcard(pattern, value)));
			if (wildcard(pattern, value)){
				result.push(value);
			}
		});

		ll("Wildcard::matches::result = " + i(result));
		ll("matches <-");
		return result;
	};
}

module.exports = Wildcard;