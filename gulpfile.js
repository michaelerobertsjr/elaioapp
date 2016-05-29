var gulp = require('gulp'),
    gutil = require('gulp-util'),
    eslint = require('eslint'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    server = require('gulp-express'),
    sass   = require('gulp-sass'),
    concat = require('gulp-concat'),
    del = require('del'),
    connect = require('gulp-connect');

var paths = {
    HTML: 'app/index.html',
    JS: ['app/app.js', 'app/**/*.js'],
    SCSS: ['app/elaio.scss'],
    BOWER: 'bower_components/',
    WATCH: [
      'app/app.js',
      'app/**/*.js',
      'app/**/**/*.js',
      'app/**/*.scss',
      'app/**/*.html'],
    OUT: 'elaio.js',
    DEST: 'app',
    FROM_BUILD: ['app/index.html',
                'app/scripts.js',
                'app/styles.css',
                'app/elaio.css',
                'app/elaio.js',
                'app/assets'],
    FROM_BUILD_ASSETS: ['app/assets/**/'],
    DEST_BUILD: 'dist',
    ENTRY_POINT: __dirname + '/app/app.js',

    TEMPLATES: '/**/**/*.html'
}

var assets = ['app/**/*.ttf',
              'app/**/*.woff',
              'app/**/*.eot',
              'app/**/*.png',
              'app/**/*.jpg',
              'app/**/*.svg',
              'app/assets/images/*.png'
            ]

var vendorCSS = [
    paths.BOWER + 'bootstrap/dist/css/bootstrap.css'
]

var vendorJS = [
    paths.BOWER + 'jquery/dist/jquery.js',
    paths.BOWER + 'bootstrap/dist/js/bootstrap.js',
    paths.BOWER + 'Chart.js/dist/Chart.js',
    paths.BOWER + 'Chart.js/dist/Chart.bundle.js'
]

gulp.task('styles', function () {
    return gulp.src(paths.SCSS)
    .pipe(sass())
    .pipe(concat('elaio.css'))
    .pipe(gulp.dest(paths.DEST))
})

gulp.task('assets_styles', function () {
    return gulp.src(vendorCSS)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(paths.DEST))
})

gulp.task('assets_scripts', function () {
    return gulp.src(vendorJS)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(paths.DEST))
})

gulp.task('assets_media', function () {
    return gulp.src(assets)
    .pipe(gulp.dest(paths.DEST))
})

gulp.task('views', function () {
  return gulp.src('app/index.html')
  .pipe(gulp.dest(paths.DEST))
})

gulp.task('scripts', function () {
    return browserify({
        extensions: ['js'],
        entries: paths.ENTRY_POINT,
        debug: true,
        paths: './bower_components'

    })
    .transform(babelify.configure({
        ignore: /(bower_components)|(node_modules)/,
        presets: ['es2015']
    }))
    .bundle()
    .on('error', gutil.log)
    .pipe(source(paths.OUT))
    .pipe(gulp.dest(paths.DEST))
})

gulp.task('build_files', function() {
    return gulp.src(paths.FROM_BUILD)
    .pipe(gulp.dest(paths.DEST_BUILD))
})

gulp.task('build_assets', function() {
    return gulp.src(paths.FROM_BUILD_ASSETS)
    .pipe(gulp.dest(paths.DEST_BUILD + '/assets'))
})

gulp.task("build_templates", function() {
  gulp.src("app/" + paths.TEMPLATES)
  .pipe(gulp.dest(paths.DEST_BUILD));
})

gulp.task('watch', function() {
    gulp.watch(paths.WATCH);
})

gulp.task('connect', function() {
  connect.server();
})

gulp.task('production', ['build', 'connect'])

gulp.task("run", function() {
  server.run(["app.js"])
})

gulp.task('build', ['build_files', 'build_assets', 'build_templates'])

gulp.task('default', ['scripts', 'styles', 'assets_scripts', 'assets_styles', 'assets_media', 'build', 'run', 'views', 'watch'])
