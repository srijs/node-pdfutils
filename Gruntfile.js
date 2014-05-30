var REPORTER="dot";
var SRC = [ "lib/**/*.js" ];

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		gyp: {
			debug: {
				options: {
					debug: true
				}
			},
			release: {
				options: {
					debug: false
				}
			}
		},
		mochaTest: {
			all: {
				src: [ "test/*.js" ],
				options: {
					reporter: REPORTER,
				}
			}
		},
		jshint: {
			all: SRC
		},
		jsdoc : {
			all: {
				src: [].concat.apply([ 'README.md' ], SRC),
				options: {
					destination: "doc",
					private: false
				}
			}
		},
		clean: [ "build", "doc" ]
	});

	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-jsdoc");
	grunt.loadNpmTasks("grunt-mocha-test");
	grunt.loadNpmTasks('grunt-node-gyp');

	grunt.registerTask("default", [
			"gyp:release"
	]);
	grunt.registerTask("debug", [
			"gyp:debug"
	]);
	grunt.registerTask("doc", [
			"jsdoc"
	]);
	grunt.registerTask("test", [
			"jshint",
			"mochaTest"
	]);
};
