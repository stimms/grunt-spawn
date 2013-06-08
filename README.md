grunt-spawn
===========

A process launcher that does what it says on the tin

## What is this?

This project is a plugin for Grunt.JS that gives one the ability to spawn processes. 

## How do I use it?

### npm install

You can install this plugin via the node package manager. 

    npm install grunt-cli -g
    npm install grunt
    npm install grunt-spawn

### package.json

It is also good to create yourself a package.json file and emebed it in the dependencies or devDependencies section depending on how you plan to use it. For more please click [here](https://npmjs.org/doc/json.html). An example is listed below: 

    {
      "name": "my-project",
      "version": "0.0.1",
      "private": true,
      "author": "foo@world.com",
      "description": "my-project",
      "keywords": [
        "grunt",
        "spawn", 
        "gruntplugin"
      ],
      "repository": {
        "type": "git",
        "url": "https://github.com/me/my-project.git"
      },
      "dependencies": {
      },
      "devDependencies": {
        "grunt": "0.4.x",
        "grunt-spawn": "0.0.x"
      },
      "scripts": {
        "test": "grunt spawn:test"
      },
      "engines": {
        "node": "0.10.x"
      }
    }

## What about Grunt?

### gruntfile.js

You can use the following example to setup your grunt file. 

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
        }, 
        test: {
          cmd: "mocha", 
          clump: false,
          args: [
            "--reporter", 
            "spec",
            "{0}"
          ],
          incl: [{
            op: "startsWith", 
            val: "tests/"
          }],
          files: [{
            cwd: ".", 
            expand: true, 
            src: ["**/*.js"]
          }]
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
      grunt.registerTask("default", ["spawn:test", "release"]);
    
    };

## What does it all mean?

### The 'spawn' task

Pay close attention to the spawn task. There are two targets namely 'spawn' which can be targeted using the following command: 

    grunt spawn:list

OR

    grunt spawn:test

You can also add more of your own tasks. Here is a brief description of the elements involved:

 - `cmd`: The path to the executable you would like to spawn
 - `clump`: True for one command, many files. False for one command per file.
 - `args`: The parameters you want to supply to the cmd
 - `special args`:{0}: The parameter where the file/files should be put
 - `incl`:object: Additional filtering you might want to do for inclusions
 - `incl/op`: This would be the function to match backed on to string.js(see npm)
 - `incl'/val`: The value that should be used for the string comparison
 - `excl`: Same as incl but just the opposite
 - `files`: Please see the in depth article on how to configure tasks on the gruntjs web

Ciao! :)
