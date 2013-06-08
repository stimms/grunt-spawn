path = require("path");

module.exports = function(grunt) {
  //grunt.option("force", true);
  
  grunt.initConfig({
    
    pkg: grunt.file.readJSON("package.json"),

    jshint: {
      files: [
        "package.json",
        "gruntfile.js", 
        "lib/**/*.js",
        "test/**/*.js"
      ]
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

  grunt.loadNpmTasks("grunt-release");
  grunt.loadNpmTasks("grunt-contrib-jshint");

  grunt.registerTask("default", ["release"]);
};