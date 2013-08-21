require("string-format");

S = require("string");
_ = require("lodash");

fs = require("fs");
path = require("path");
util = require("util");
grunt = require("grunt");
async = require("async");
assert = require("assert");
fstools = require("fs-tools");
wildcard = require("wildcard");

l = function(val) { console.log(val); }
i = function(val) { return util.inspect(val); }
ll = function(val) { l(i(val)); }
