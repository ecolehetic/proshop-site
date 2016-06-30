var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    sass        = require('gulp-sass'),
    csso        = require('gulp-csso'),
    uglify      = require('gulp-uglify'),
    jade        = require('gulp-jade'),
    concat      = require('gulp-concat'),
    livereload  = require('gulp-livereload'), // Livereload plugin needed: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
    tinylr      = require('tiny-lr'),
    express     = require('express'),
    connect     = require('gulp-connect'),
    app         = express(),
    marked      = require('marked'), // For :markdown filter in jade
    path        = require('path'),
    server      = tinylr(),
    rename = require('gulp-rename'),
    ts = require('gulp-typescript'),
    argv = require('yargs').argv,
    gulpif = require('gulp-if'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('css', function() {
  return gulp.src('src/assets/stylesheets/main.scss')
    .pipe(
      sass( {
        includePaths: ['src/assets/stylesheets'],
        errLogToConsole: true
      } ) )
    .pipe( csso() )
    .pipe( gulp.dest('dist/assets/stylesheets/') )
    .pipe( connect.reload());
});

// Concatenate & Minify JS
gulp.task('ts', function() {
	var tsResult = gulp.src('src/assets/scripts/*.ts')
		.pipe(sourcemaps.init()) // This means sourcemaps will be generated
		.pipe(ts({
			target: 'ES5',
			module: 'system',
			moduleResolution: 'node',
			sourceMap: true,
			declaration: true,
			emitDecoratorMetadata: true,
			experimentalDecorators: true,
			removeComments: false,
			noImplicitAny: false,
			out: 'scripts.js'
		}));
	return tsResult.js
		.pipe(concat('scripts.min.js')) // You can use other plugins that also support gulp-sourcemaps
		.pipe(uglify())
		.pipe(gulpif(argv.dev, sourcemaps.write())) // Now the sourcemaps are added to the .js file
		.pipe(gulp.dest('dist/assets/scripts/'))
    .pipe( connect.reload());
});

gulp.task('templates', function() {
  return gulp.src('src/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
    .pipe( connect.reload());
});

gulp.task('express', function() {
  app.use(express.static(path.resolve('./dist')));
  app.listen(1337);
  gutil.log('Listening on port: 1337');
});

gulp.task('watch', function () {
  server.listen(35729, function (err) {
    if (err) {
      return console.log(err);
    }

    gulp.watch('src/assets/stylesheets/*.scss',['css']);

    gulp.watch('src/assets/scripts/*.ts',['ts']);

    gulp.watch('src/**/*.jade',['templates']);

  });
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

// Default Task
gulp.task('default', ['ts','css','templates','express', 'watch', 'connect']);
