'use strict';
var gulp = require('gulp');
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var header = require('gulp-header');
var clean = require('gulp-clean');
var gulpIf = require('gulp-if');
var minimist = require('minimist');

// gulp --env=dev 不压缩代码，直接gulp，将压缩所有代码

var argv = require('minimist')(process.argv.slice(2));
var config = require('./config.json');
var webpackConfig = {
    entry: {
        h5go: './src/js/app.js'
    },
    output: {
        filename: '[name].min.js'
    },
    module: {
        loaders: [{
            test: /.js$/,
            loader: 'jsx-loader?harmony'
        }]
    }
};

// 公共头部
var banner = ['/**',
    ' * <%= config.name %> - <%= config.description %>',
    ' * @version v<%= config.version %>',
    ' */',
    ''
].join('\n');

gulp.task('clean', function() {
    return gulp
        .src(['./dist/*'], { read: false })
        .pipe(clean({ force: true }))
});

gulp.task('js', function() {
    return gulp
        .src('./src/js/app.js')
        .pipe(gulpWebpack(webpackConfig))
        .pipe(gulpIf(argv.env !== 'dev', uglify()))
        .pipe(gulpIf(argv.env !== 'dev', header(banner, { config: config })))
        .pipe(gulp.dest('./dist/js/'))
})


gulp.task('default', ['clean'], function() {
    gulp.start(['js']);
});
