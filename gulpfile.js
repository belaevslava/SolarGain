'use strict';

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    ts = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-clean-css'),
    image = require('gulp-image'),
    rimraf = require('rimraf'),
    fileinclude = require('gulp-file-include'),

    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'dist',
        ts: 'dist',
        css: 'dist',
        images: 'dist',
        fonts: 'dist'
    },
    src: {
        html: 'src/**/*.{html,tpl,tmpl}',
        ts: 'src/**/*.{ts,js}',
        style: 'src/**/*.{scss,sass}',
        images: 'src/**/*.{jpg,jpeg,png,gif,svg}',
        fonts: 'src/**/*.{ttf,otf,woff,woff2,svg,eot}'
    },
    watch: {
        html: 'src/**/*.{html,tpl,tmpl}',
        ts: 'src/**/*.{ts,js}',
        style: 'src/**/*.{scss,sass}',
        images: 'src/**/*.{jpg,jpeg,png,gif,svg}',
        fonts: 'src/**/*.{ttf,otf,woff,woff2,svg,eot}'
    },
    clean: './dist'
};

var config = {
    server: {
        baseDir: "./dist"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(fileinclude('@@'))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('ts:build', function () {
    gulp.src(path.src.ts)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(ts())
        .pipe(uglify()) 
        .pipe(sourcemaps.write()) 
        .pipe(gulp.dest(path.build.ts))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.images)
        .pipe(plumber())
        //.pipe(image())
        .pipe(gulp.dest(path.build.images))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(plumber())
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    'html:build',
    'style:build',
    'image:build',
    'fonts:build',
    'ts:build'
]);


gulp.task('watch', function() {
    watch(path.watch.html, function(event, cb) {
        gulp.start('html:build');
    });
    watch(path.watch.style, function(event, cb) {
        gulp.start('style:build');
    });
    watch(path.watch.images, function(event, cb) {
        gulp.start('image:build');
    });
    watch(path.watch.fonts, function(event, cb) {
        gulp.start('fonts:build');
    });
    watch(path.watch.ts, function(event, cb) {
        gulp.start('ts:build');
    });
});

gulp.task('default', ['build']);
gulp.task('serve', ['build', 'webserver', 'watch']);