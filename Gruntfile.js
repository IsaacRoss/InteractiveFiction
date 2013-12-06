
module.exports = function(grunt){
	/*global module:false*/
	grunt.initConfig({
		jshint: {
			src: ['Gruntfile.js', 'dragDrop.js', 'game.js'],
			options:{
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				//boss: true,
				eqnull: true,
				browser: true,
				globals: {
					require: true,
					define: true,
					requirejs: true,
					describe: true,
					expect: true,
					it: true,
					module: true,
					game: true
				}
			}
		},

		watch: {
			files: '<%= jshint.src %>',
			tasks: ['jshint']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', 'watch');
};