module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! \n PROJECT: <%= pkg.name %> ' +
        '\n VERSION: <%= pkg.version %> ' +
        '\n AUTHOR: <%= pkg.author %> ' +
        '\n GITHUB: <%= pkg.github %>' +
        '\n LATEST BUILD DATE AND TIME: <%= grunt.template.today("mmmm dd, yyyy hh:MM TT") %> PHILIPPINE TIME*/\n',
        watch: {
            source: {
                files: ['src/**/*.js'],
                tasks: ['clean:source', 'concat:source', 'uglify:source']
            }
        },
        clean: {
            source: ['dist/<%= pkg.version %>/*.js']
        },
        concat: {
            source: {
                options: {
                    banner: '<%= banner %>',
                },
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.version %>/<%= pkg.filename %>.js'
            }
        },
        uglify: {
            source: {
                options: {
                    banner: '<%= banner %>',
                    compress: {
                        pure_funcs: ['console.log']
                    }
                },
                files: {
                    'dist/<%= pkg.version %>/<%= pkg.filename %>.min.js': ['dist/<%= pkg.version %>/<%= pkg.filename %>.js']
                }
            }
        }
    });

    grunt.registerTask('default', ["watch", "clean", "clean", "concat", "uglify"]);
    grunt.registerTask('build_all', ["clean", "clean", "concat", "uglify"]);

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
};