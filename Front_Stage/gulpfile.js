'use strict';
var fs = require('fs');
var gulp = require('gulp');
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var header = require('gulp-header');
var clean = require('gulp-clean');
var gulpIf = require('gulp-if');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minimist = require('minimist');
var replace = require('gulp-replace');

var pwd = __dirname;

// gulp --env=pro 压缩代码，直接执行gulp，不压缩代码
var argv = require('minimist')(process.argv.slice(2));
var config = require('./config.json');

// 根据不同环境使用不同的第三方库
var aliasFile = function(name) {
    if (argv.env == 'pro') {
        return name + '.min.js';
    } else {
        return name + '.js';
    }
}

var vendorPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.min.js',
    minChunks: Infinity,
});
var webpackConfig = {
    entry: {
        goh5: './src/js/app.js',
        vendor: [
            pwd + '/src/js/fastclick.min.js',
            pwd + '/src/js/swiper.js'
        ]
    },
    output: {
        filename: '[name].min.js'
    },
    module: {
        loaders: [{
            test: /.js$/,
            loader: 'jsx-loader?harmony'
        }, {
            test: /.vue$/,
            loader: 'vue-loader'
        }]
    },
    plugins: [vendorPlugin],
    resolve: {
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            Swiper: pwd + '/src/js/swiper.js',
            Event: pwd + '/src/js/event.js',
            utils: pwd + '/src/js/utils.js',
        }
    },
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
        .pipe(gulpIf(argv.env == 'pro', uglify()))
        .pipe(gulpIf(argv.env == 'pro', header(banner, { config: config })))
        .pipe(gulp.dest('./dist/js/'))
})

gulp.task('css', function() {
    return gulp
        .src('./src/css/*.css')
        .pipe(concat('all.css'))
        .pipe(gulpIf(argv.env == 'pro', minifyCss()))
        .pipe(gulpIf(argv.env == 'pro', header(banner, { config: config })))
        .pipe(rename('goh5.min.css'))
        .pipe(gulp.dest('./dist/css/'))
})

gulp.task('img', function() {
    return gulp
        .src('./src/img/*')
        .pipe(gulp.dest('./dist/img/'))
})

gulp.task('fonts', function() {
    return gulp
        .src('./src/fonts/*')
        .pipe(gulp.dest('./dist/fonts/'))
})

gulp.task('rev', function() {
    return gulp
        .src('./index.html')
        .pipe(gulpIf(argv.env == 'pro', replace(/goh5.min.css[\s\S]*?"/, 'goh5.min.css?ver=' + config.version + '"')))
        .pipe(gulpIf(argv.env == 'pro', replace(/goh5.min.js[\s\S]*?"/, 'goh5.min.js?ver=' + config.version + '"')))
        .pipe(gulpIf(argv.env == 'pro', replace(/vendor.min.js[\s\S]*?"/, 'vendor.min.js?ver=' + config.version + '"')))
        .pipe(gulp.dest('./'))
})

gulp.task('watch', function() {
    webpackConfig.watch = argv.env != 'pro';
    gulp.watch('./src/js/*', ['js']);
    gulp.watch('./src/css/*', ['css']);
    gulp.watch('./src/img/*', ['img']);
    gulp.watch('./src/fonts/*', ['fonts']);
})

gulp.task('default', ['clean'], function() {
    gulp.start(['js', 'css', 'img', 'fonts', 'rev']);
});