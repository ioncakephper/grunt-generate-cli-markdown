module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-generate-cli-markdown');
    grunt.loadNpmTasks('grunt-insert-file-tag');

    grunt.registerTask('default', ['generate-cli-markdown', 'insert_file_tag']);
};
