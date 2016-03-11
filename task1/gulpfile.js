var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var watch = require("gulp-watch");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");
var cssmin = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var inject = require('gulp-inject');
var jade = require('gulp-jade');
var
    //jshint = require('gulp-jshint'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');

var path = {
    src: {
        less:'src/styl/**/*',
        images: 'src/img/**/*',
        css: 'src/styl/all.less',
        js: 'src/js/**/*',
        mainJade:"src/templates/index.jade",
        templates: "src/templates/**/*",
        html:'src/index.html'
    },
    build: {
        css: './build/css',
        img: './build/img',
        html:'./build/index.html'
    }
};

gulp.task('images', function () {
    return gulp.src(path.src.images)
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest(path.build.img))
        .pipe(livereload());
});

gulp.task('styles',function(){
   return gulp.src(path.src.css)
       .pipe(less())
       .pipe(autoprefixer())
       .pipe(cssmin())
       .pipe(rename({suffix: '.min'}))
       .pipe(gulp.dest(path.build.css))
       .pipe(livereload());
});

gulp.task('html',function(){
    return gulp.src( path.src.mainJade)
       .pipe(jade({pretty: true}))
       .pipe(gulp.dest('build'))
       .pipe(livereload());
});

gulp.task('html:inject',function(){

    var sources = gulp.src(['build/css/*'], {read: false});

    return gulp.src(path.build.html)
        .pipe(inject(sources),{})
        .pipe(gulp.dest('build'))
        .pipe(livereload());
});


gulp.task('build',['images','styles','html'],function(){
    gulp.start('html:inject')
});

gulp.task('watch',function(){
    watch(path.src.less, function(){
        gulp.start('styles');
    });
    watch(path.src.images, function(){
        gulp.start('images');
    });
    watch(path.src.templates,function(){
        gulp.start('html');
    });
});
