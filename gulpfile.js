var paths = {
    styles: {
        src: 'dev/styles/**/*.scss',
        dest: 'dist/styles'
    },
    scripts: {
        src: 'dev/scripts/**/*.js',
        dest: 'dist/scripts'
    }
};

var gulp = require('gulp');
var log = require('fancy-log');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();

function styles(cb) {
    log.info('Starting styles!');
    return (
        gulp
            .src(paths.styles.src)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on('error', notify.onError({
                message: 'Error: <%= error.message %>',
                title: 'Styles error!'
            }))
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(sourcemaps.write('.'))
            .pipe( gulp.dest(paths.styles.dest) )
            .pipe(browserSync.stream())
            .pipe(notify('Complete styles!'))
    );
	cb();
}
exports.styles = styles;

function scripts(cb) {
    log.info('Starting scripts!');
    return (
        gulp
            .src(paths.scripts.src)
			.pipe(sourcemaps.init())
            .pipe(eslint({
                'rules':{
                    'quotes': [1, 'single'],
                    'semi': [1, 'always']
                }
            }))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError())
            .on('error', notify.onError({
                message: 'Error: <%= error.message %>',
                title: 'Scripts error!'
            }))
    		.pipe( uglify() )
			.pipe(sourcemaps.write('.'))
    		.pipe( gulp.dest(paths.scripts.dest) )
            .pipe(browserSync.stream())
            .pipe(notify('Complete scripts!'))
    );
	cb();
}
exports.scripts = scripts;

function serve(){
	browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    watch();
    gulp.watch("*.html").on('change', browserSync.reload);
}
exports.serve = serve;

function watch(){
    log.info('Starting watch!');
    gulp.watch(paths.styles.src, gulp.series('styles'));
    gulp.watch(paths.scripts.src, gulp.series('scripts'));
}
exports.watch = watch;

function start(){
    watch();
}
exports.default = start;

function build(cb){
    styles();
    scripts();
	cb();
}
exports.build = build;
