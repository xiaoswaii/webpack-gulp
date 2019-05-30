let gulp = require('gulp');
var sass = require('gulp-sass')
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var clean = require('gulp-clean');
var inject = require('gulp-inject');
var serve = require('browser-sync').create();

gulp.task('sass', function(){
    return gulp.src('src/scss_style.scss')
      .pipe(sass()) // 用gulp-sass编译scss文件
      .pipe(cssnano())
      .pipe(gulp.dest('dist/css'))
});

gulp.task('concat',function(){
    return gulp.src('src/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('src/js'))
});

gulp.task('babel', () =>
    gulp.src('src/js/all.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
);

gulp.task('clean', function () {
    return gulp.src(['dist/js/*.*','dist/css/*.*','src/js/all.js'], {read: false, allowEmpty: true})
        .pipe(clean());
});

gulp.task('inject', function () {
    var target = gulp.src('./index.html');
    var sources = gulp.src(['./dist/js/*.js', './dist/css/*.css'], {read: false});
   
    return target.pipe(inject(sources))
      .pipe(gulp.dest('./src'));
  });

gulp.task('copy', function(){
    return gulp.src('./src/*.*')
        .pipe(gulp.dest('./dist/asset'))
}) 

gulp.task('serve', function() {
    serve.init({
        server: "./dist/"
    });

    gulp.watch("src/js/*.js",gulp.series('concat'));
    gulp.watch("src/js/all.js",gulp.series('babel'));
    gulp.watch("src/*.scss", gulp.series('sass'));
    gulp.watch("/index.html").on('change', serve.reload);
});


gulp.task('build', gulp.series('clean','concat','sass','babel', 'inject', function(done) {
    console.log("Everything is good");
    done()
  }));

