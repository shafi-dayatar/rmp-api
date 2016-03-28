module.exports = function(grunt) {

    var buildFiles = [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/underscore/underscore-min.js',
        'src/main.js'
    ];

    grunt.initConfig({
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> */\n' +
            '/* GitHub <%= pkg.homepage %> */\n' +
            '/* Copyright 2016 (C) Yehya Awad */\n\n',
        pkg: grunt.file.readJSON('package.json'),
        // UglifyJS
        uglify: {
            min: {
                options: {
                    mangle: {
                        except: ['jQuery', '$'],
                        regex: "dist/rmp-api.min.js"
                    },
                    sourceMap: true,
                    banner: "<%= banner %>",
                },
                files: {
                    'dist/rmp-api.min.js': buildFiles
                }
            },
            nonmin: {
                options: {
                    compress: false,
                    mangle: false,
                    beautify: true,
                    preserveComments: 'all',
                    banner: "<%= banner %>"
                },
                files: {
                    'dist/rmp-api.js': buildFiles
                }
            }
        },
        // jshint
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                globals: [
                    "jQuery",
                    "exports",
                    "module"
                ]
            },
            files: [
                "./Gruntfile.js",
                "src/*.js",
                "src/vendor/*.js"
            ]
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    src: 'dist/rmp-api.min.js',
                    dest: '../rmp-api-server/cdn/',
                    rename: function(dest, src) {
                        return dest + "rmp-api-latest.min.js";
                    }
                }, {
                    expand: true,
                    src: 'dist/rmp-api.min.js',
                    dest: '../rmp-api-server/cdn/',
                    rename: function(dest, src) {
                        return dest + "rmp-api-<%= pkg.version %>.min.js";
                    }
                }],
            }
        },
    });

    // Load uglify
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Load jshint
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Load copy
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task
    grunt.registerTask('default', ["jshint", 'uglify:min', "uglify:nonmin", "copy:main"]);
};