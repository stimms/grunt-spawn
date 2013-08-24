path = require("path");

module.exports = function(grunt) {
  //grunt.option("force", true);
  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    jshint: {
      files: ["package.json", "gruntfile.js", "lib/**/*.js", "test/**/*.js"]
    },

    spawn: {
      echo: {
        command: "echo",
        arguments: ["{0}"], 
        directory: "./tests",
        pattern: "**/*.js",
        useQuotes: true,
        quoteDelimiter: "\"",
        groupFiles: true,
        fileDelimiter: " "
      },
      list: {
        command: "ls",
        arguments: ["-la", "{0}"], 
        directory: "./tests"
      },
      test: {
        command: "mocha",
        arguments: ["--reporter", "spec", "{0}"],
        directory: "./tests",
        pattern: "**/*.js"
      }
    },

    release: {
      options: {
        bump: true,
        file: "package.json",
        add: true,
        commit: true,
        tag: true,
        push: true,
        pushTags: true,
        npm: true
      }
    }

  });


  grunt.loadTasks("./tasks");
  grunt.loadNpmTasks("grunt-release");
  grunt.loadNpmTasks("grunt-contrib-jshint");

  grunt.registerTask("test", ["spawn:test"]);
  grunt.registerTask("default", ["spawn:test"]);

};