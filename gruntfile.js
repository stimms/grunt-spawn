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


    spawn: {
      list: {
        cmd: "ls", 
        args: [
          "-la"
        ]
      }
    },

    release: {
      options: {
        bump: false,
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

  grunt.registerTask("default", ["release"]);
};