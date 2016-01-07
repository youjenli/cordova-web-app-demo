
var gulp = require('gulp');
var mainBowerFiles = require('gulp-main-bower-files');
var print = require('gulp-print');
var rename = require("gulp-rename");
var filter = require('gulp-filter');

gulp.task('default', function () {
    // place code for your default task here
	console.log(param);
	return gulp.src('./bower.json')
			.pipe(mainBowerFiles({
				env:"production"
			}))
			.pipe(rename({
				dirname: "js/lib"
			}))
			.pipe(print())
			//.pipe(gulp.dest('www'));
});

