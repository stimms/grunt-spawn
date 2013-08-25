var path = require("path");

module.exports = function(grunt) {
  'use strict';

  grunt.option("force", true);
  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    jshint: {
      all: [
        'gruntfile.js',
        'tasks/*.js',
        'tasks/lib/*.js',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },
    spawn: {
      echo: {
        command: "echo",
        commandArgs: ["{0}"], 
        directory: "./tests",
        pattern: "**/*.js",
        useQuotes: true,
        quoteDelimiter: "\"",
        groupFiles: true,
        fileDelimiter: " "
      },
      list: {
        command: "ls",
        commandArgs: ["-la", "{0}"], 
        directory: "./tests"
      },
      test: {
        command: "mocha",
        commandArgs: ["--reporter", "spec", "{0}"],
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
  grunt.registerTask("default", ["jshint","spawn:test"]);

};