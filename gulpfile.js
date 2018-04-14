var gulp        = require('gulp'),
    sass         = require('gulp-sass'),
    concat = require('gulp-concat'),
    browserSync  = require('browser-sync'),
    rename       = require('gulp-rename'),
    imagemin     = require('gulp-imagemin'),
    cache        = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    htmlImport  = require('gulp-html-import'),
    //uglify      = require('gulp-uglifyjs'),
    //cssnano   = require('gulp-cssnano'),
    plumber     = require('gulp-plumber'),
    del          = require('del'),
    pngquant    = require('imagemin-pngquant');


gulp.task('sass',  function(){
     return gulp.src('sources/components/**/*.scss')
        .pipe(plumber())
        .pipe(concat("build.scss"))
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(rename("build.css"))
         //.pipe(cssnano())
        .pipe(gulp.dest('dev/css'))
        .pipe(browserSync.reload({stream: true}))
});


gulp.task('htmlImport', function () {
    gulp.src('sources/index.html')
        .pipe(htmlImport('sources/components/'))
        .pipe(gulp.dest('dev'))
        //.pipe(browserSync.reload({stream: true}))
});

gulp.task('buildJs', function() {
    return gulp.src('sources/js/**/*.js')
        .pipe(concat('build.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('dev/js'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dev'
        },
        notify: false
    });
});

gulp.task('fonts', function() {
    return gulp.src('sources/fonts/**/*')
        .pipe(gulp.dest('dev/fonts'))
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('watch', ['browser-sync', 'sass', 'htmlImport','buildJs','img'],  function() {
    gulp.watch('sources/components/**/*.html', ['htmlImport']);
    gulp.watch('sources/components/**/*.scss', ['sass']);
    gulp.watch('sources/components/**/*.html', browserSync.reload);
    gulp.watch('sources/js/**/*.js', ['buildJs']);
    gulp.watch('sources/fonts/**/*', ['fonts']);
    gulp.watch('sources/img/**/*', ['img']);
});

gulp.task('clean', function() {
    return del.sync('dev/img');
});



gulp.task('img',['clean'], function() {
    return gulp.src('sources/img/**')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dev/img'))
        .pipe(browserSync.reload({stream: true}))
});


/*gulp.task('clear', function () {
    return cache.clearAll();
});*/

gulp.task('default', ['watch']);

