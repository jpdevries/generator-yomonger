module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dirs: { /* just defining some properties */
			lib: './lib/',
			<% if ('sass' === cssType) { %>scss: './sass/',<% } else if ('less' === cssType) {  %>less: './less/',<% } %>
			template: '<%= themeDir %>',
			css: '<%%= dirs.template %>css/',
		},
		bower: {
			install: {
				options: {
					targetDir: './lib',
					layout:'byComponent'
				}
			}
		},
		<% if (modxSass) { %>
		copy: { /* move files */
			bourbon: {
				files:[
					{src:'bourbon/**/*',cwd:'<%%= dirs.lib %>',dest:'<%%= dirs.scss %>',expand:true}
				]
			},
			fontawesome: {
				files:[
					{src: '<%%= dirs.lib %>font-awesome/scss/**/*.scss',dest:'<%%= dirs.scss %>font-awesome/',expand:true,flatten:true},
					{src: 'font/**/*',cwd:'<%%= dirs.lib %>font-awesome/',dest:'<%%= dirs.template %>',expand:true}
				]
			}
		},
		<% } %>
		cssmin: {
			compress: {
				options: {
					report: 'min',
					keepSpecialComments:1,
					//banner: '/*!\n* <%%= pkg.title %> - v<%%= pkg.version %> - <%%= grunt.template.today("yyyy-mm-dd") %> \n* see https://github.com/modxcms/revolution/tree/develop/_build/templates/default\n*/'
					banner : '/*!'
+  '\n* '
+  '\n* Copyright (C) <%%= grunt.template.today("yyyy") %> <%= prefix %>'
+  '\n* '
+  '\n* This file is part of <%%= pkg.title %> and was compiled using Grunt.'
+  '\n* '
+  '\n* <%%= pkg.title %> is free software: you can redistribute it and/or modify it under the terms of the'
+  '\n* GNU General Public License as published by the Free Software Foundation, either version 2 of the'
+  '\n* License, or (at your option) any later version.'
+  '\n* '
+  '\n* <%%= pkg.title %> is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;'
+  '\n* without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.'
+  '\n* '
+  '\n* See the GNU General Public License for more details. You should have received a copy of the GNU'
+  '\n* General Public License along with <%%= pkg.title %>. If not, see <http://www.gnu.org/licenses/>.'
+  '\n* '
//+  '\n* Authors: TODO'
+  '\n*/'
				},
				files: {
					'<%%= dirs.css %>index.min.css': '<%%= dirs.css %>index.css',
					'<%%= dirs.css %>login.min.css': '<%%= dirs.css %>login.css'
				}
			},
			ship: {
				options: {
					report: 'min',
					keepSpecialComments:1,
					//banner: '/*!\n* <%%= pkg.title %> - v<%%= pkg.version %> - <%%= grunt.template.today("yyyy-mm-dd") %> \n* see https://github.com/modxcms/revolution/tree/develop/_build/templates/default\n*/'
					banner : '/*!'
+  '\n* <%%= pkg.title %> - v<%%= pkg.version %> - <%%= grunt.template.today("yyyy-mm-dd") %>'
+  '\n* '
+  '\n* Copyright (C) <%%= grunt.template.today("yyyy") %> <%= prefix %>'
+  '\n* '
+  '\n* This file is part of <%%= pkg.title %> and was compiled using Grunt.'
+  '\n* '
+  '\n* <%%= pkg.title %> is free software: you can redistribute it and/or modify it under the terms of the'
+  '\n* GNU General Public License as published by the Free Software Foundation, either version 2 of the'
+  '\n* License, or (at your option) any later version.'
+  '\n* '
+  '\n* <%%= pkg.title %> is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;'
+  '\n* without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.'
+  '\n* '
+  '\n* See the GNU General Public License for more details. You should have received a copy of the GNU'
+  '\n* General Public License along with <%%= pkg.title %>. If not, see <http://www.gnu.org/licenses/>.'
+  '\n* '
//+  '\n* Authors: TODO'
+  '\n*/'
				},
				files: {
					'<%%= dirs.css %>index.min.css': '<%%= dirs.css %>index.css',
					'<%%= dirs.css %>login.min.css': '<%%= dirs.css %>login.css'
				}
			}
		},
		<% if ('sass' === cssType) { %>
		sass: {
			dist: {
				options: {
					style: 'compressed',
					compass: false
				},
				files: {
					'<%%= dirs.css %>index.css': 'sass/index.scss',
					'<%%= dirs.css %>login.css': 'sass/login.scss'
				}
			},
			dev: {
				options: {
					style: 'expanded',
					compass: false,
                    sourcemap:true
				},
				files: {
					'<%%= dirs.css %>index.css': 'sass/index.scss',
					'<%%= dirs.css %>login.css': 'sass/login.scss'
				}
			}
		},
		<% } else if ('less' === cssType) {  %>
		less : {
			dist : {
				files: {
					'<%%= dirs.css %>index.css': 'less/index.less',
					'<%%= dirs.css %>login.css': 'less/login.less'
				}
			},
			dev : {
				compress: false,
				files: {
					'<%%= dirs.css %>index.css': 'less/index.less',
					'<%%= dirs.css %>login.css': 'less/login.less'
				}
			}
		},
		<% } %>
		autoprefixer: { /* this expands the css so it needs to get compressed with cssmin afterwards */
			options: {
				// Task-specific options go here.
			},

			// just prefix the specified file
			index: {
				options: {},
				src: '<%%= dirs.css %>index.min.css',
				dest: '<%%= dirs.css %>index.min.css'
			},
			login: {
				options: {},
				src: '<%%= dirs.css %>login.min.css',
				dest: '<%%= dirs.css %>login.min.css'
			}
		},
		csslint: {
		  strict: {
		    options: {
		      import: 2
		    },
		    src: ['<%%= dirs.css %>*.css']
		  }
		},
		watch: { /* trigger tasks on save */
			options: {
				livereload: true
			},
			<% if ('sass' === cssType) { %>
			scss: {
				files: ['<%%= dirs.scss %>*','<%%= dirs.scss %>components/**/*'],
				tasks: ['sass:dist', 'autoprefixer', 'cssmin:compress', 'growl:sass']
			}
			<% } else if ('less' === cssType) {  %>
			less: {
				files: ['<%%= dirs.less %>*'],
				tasks: ['less:dist','autoprefixer','cssmin:compress','growl:less']
			}
			<% } %>
		},
		<% if (modxSass) { %>
		clean: { /* take out the trash */
			prebuild: ['<%%= dirs.scss %>bourbon','<%%= dirs.scss %>font-awesome'],
			postbuild: ['<%%= dirs.lib %>']
		},
		<% } %>
		growl: {
			<% if ('sass' === cssType) { %>
			sass: {
				message: "Sass files created.",
				title: "grunt"
			},
			<% } else if ('less' === cssType) {  %>
			less: {
				message: "Less files created.",
				title: "grunt"
			},
			<% } %>
			build: {
				title: "grunt",
				message: "Build complete."
			},
			prefixes: {
				title: "grunt",
				message: "CSS prefixes added."
			},
			watch: {
				title: "grunt",
				message: "Watching. Grunt has its eye on you."
			},
			expand: {
				title: "grunt",
				message: "CSS Expanded. Don't check it in."
			}
		}
	});

	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-copy');
	<% if ('sass' === cssType) { %>
	grunt.loadNpmTasks('grunt-contrib-sass');
	<% } else if ('less' === cssType) {  %>
	grunt.loadNpmTasks('grunt-contrib-less');
	<% } %>
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-growl');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-csslint');

	// Tasks
	grunt.registerTask('default', ['growl:watch', 'watch']);
	grunt.registerTask('build', [<% if (modxSass) { %>'clean:prebuild',<% } %>'bower', <% if (modxSass) { %>'copy',<% } %> <% if ('sass' === cssType) { %>'sass:dist', <% } else if ('less' === cssType) {  %>'less:dist', <% } %>'autoprefixer', 'growl:prefixes', <% if ('sass' === cssType) { %>'growl:sass', <% } else if ('less' === cssType) {  %>'growl:less', <% } %>'cssmin:compress'<% if (modxSass) { %>,'clean:postbuild'<% } %>]);
	grunt.registerTask('expand', [<% if ('sass' === cssType) { %>'sass:dev', <% } else if ('less' === cssType) {  %>'less:dev', <% } %> 'autoprefixer', 'growl:prefixes', 'growl:sass', 'growl:expand']);
	grunt.registerTask('ship', [<% if (modxSass) { %>'clean:prebuild','bower',<% } %> <% if (modxSass) { %>'copy',<% } %> <% if ('sass' === cssType) { %>'sass:dist', <% } else if ('less' === cssType) {  %>'less:dist', <% } %>,'autoprefixer', 'growl:prefixes', <% if ('sass' === cssType) { %>'growl:sass', <% } else if ('less' === cssType) {  %>'growl:less', <% } %>'cssmin:ship'<% if (modxSass) { %>,'clean:postbuild'<% } %>]);
};
