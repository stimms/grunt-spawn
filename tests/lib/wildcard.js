require("../../tasks/lib/include");

Wildcard = require("../../tasks/lib/wildcard");
FileBuilder = require("../../tasks/lib/filebuilder");

describe("Given Wildcard()", function(){

	describe("When #matches('anyValue', 'anyValue')", function(){

		var wildcard = new Wildcard();

		it("Then should match correctly", function(){

			var result = wildcard.matches("anyValue", "anyValue");
			ll(result);

		});

	});

	describe("When #matches('anyValue', ['anyValue'])", function(){

		var wildcard = new Wildcard();

		it("Then should match correclty", function(){

			var result = wildcard.matches("anyValue", ["anyValue"]);
			ll(result);

		});

	});
	
	describe("When #matches('any*', ['anyValue1', 'anyValue2', 'anyValue3'])", function(){

		var wildcard = new Wildcard();

		it("Then should match correclty", function(){

			// TODO: Figure out why the wildcard '*' does not seem to have any significance
			// TODO: When comparing values using the wildcard function
			var result = wildcard.matches("*Value*", ["anyValue1", "anyValue2", "anyValue3"]);
			ll(result);

		});

	});
	
	// describe("When #matches() with FileBuilder() #allDirectories()", function(){

	// 	var wildcard = new Wildcard();
	// 	var fileBuilder = new FileBuilder();
	// 	var allFiles = fileBuilder.allFiles();
	// 	ll(allFiles);

	// 	it("Then should find package.*", function(){

	// 		var pattern = "*package.*";
	// 		var result = wildcard.matches(pattern, allFiles);
	// 		ll(result);
	// 		//assert(result.length > 0, "Could not find any matches for 'package.json'");

	// 	});

	// });

});