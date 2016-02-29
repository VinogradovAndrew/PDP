var gulp = require('gulp');
var less = require('gulp-less');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var watch = require("gulp-watch");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");
var cssmin = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var gulpif = require("gulp-if");
var del = require("del");
var cssnano = require('gulp-cssnano'),
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
        html:'src/index.html'
    },
    build: {
        css: 'build/css',
        img: 'build/img'
    }
};

gulp.task('images', function () {
    return gulp.src(path.src.images)
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest(path.build.img))


});
gulp.task('styles',function(){
   return gulp.src(path.src.css)
       .pipe(less())
       .pipe(autoprefixer())
       .pipe(cssmin())
       .pipe(rename({suffix: '.min'}))
       .pipe(gulp.dest(path.build.css))
});
gulp.task('html',function(){
   return gulp.src(path.src.html)
       .pipe(gulp.dest('build'))
});


gulp.task('build',function(){
   gulp.start('images','styles','html');
});
gulp.task('watch',function(){
    watch(path.src.less, function(event, cb) {
        gulp.start('styles');
    });

    watch(path.src.images, function(event, cb) {
        gulp.start('images');
    });
    watch(path.src.html,function(event,cb){
        gulp.start('html');
    });

});