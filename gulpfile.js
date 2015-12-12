var gulp = require('gulp'),
    webpack = require('gulp-webpack'),
    min = require('gulp-ngmin'),
    sass = require('gulp-sass'),
    notify = require("gulp-notify"),
    bower = require('gulp-bower'),
    //del = require('del'),
    webpackConfig = require('./webpack.config.js');
    //inject = require('gulp-inject'),
    //ngAnnotate = require('gulp-ng-annotate');

gulp.task('default', ['bower', 'icons', 'css']);

gulp.task('default', ['webpack']);

gulp.task('run', function() {
  server.run(['app.js']);
})