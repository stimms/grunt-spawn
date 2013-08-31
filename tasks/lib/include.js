require("string-format");

_ = require("lodash");
S = require("string");
util = require("util");
path = require("path");
grunt = require("grunt");
async = require("async");
assert = require("assert");
fstools = require("fs-tools");
minimatch = require("minimatch");

l = console.log;
i = util.inspect;
ll = function(val) { l(i(val)); }
