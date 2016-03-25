module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                options: {
                    mangle: {
                        except: ['jQuery'],
                        sourceMap: true
                    },
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */\n' +
                    '/* Copyright 2016 (C) Yehya Awad */\n'
                },
                files: {
                    'dist/rmp-api.min.js': [
                        'src/vedor/cors-bypass.js',
                        'src/main.js'
                    ]
                }
            }
        }
    });
    
    // Load uglify
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task
    grunt.registerTask('default', ['uglify:dist']);
};