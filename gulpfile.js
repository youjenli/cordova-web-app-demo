var gulp = require('gulp'),
	mainBowerFiles = require('gulp-main-bower-files'),
	rename = require("gulp-rename"),
	clean = require('gulp-clean'),
	sourceMaps = require('gulp-sourcemaps'),
	print = require('gulp-print'),
	requirejsOptimize = require('gulp-requirejs-optimize'),
	inject = require('gulp-inject'),
	fs = require('fs')
	;
	//rjsConfig = require('./rjs-config.json');

if(!process.env.NODE_ENV) {
	process.env.NODE_ENV = 'development';
	//process.env.NODE_ENV = 'production';
}

var pathOfLibs = 'src/libs';//TODO

gulp.task('clean', function () {
	return gulp.src(['www/*', pathOfLibs + '/*'], {read: false})
		.pipe(clean());
});

gulp.task('mainBowerFiles', ['clean'], function(){
	return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
		.pipe(gulp.dest(pathOfLibs));
});

gulp.task('constructMainPage', ['clean'], function(){
	return gulp.src('src/index.html')
		.pipe(inject(gulp.src(['./src/template/dev/*.html']), {
			starttag: '<!-- inject:body:{{ext}} -->',
			transform: function (filePath, file) {
				// return file contents as string
				return file.contents.toString('utf8')
			}
		}))
		.pipe(gulp.dest('www'));
});

gulp.task('build',['mainBowerFiles', 'constructMainPage'], function(){
	if (process.env.NODE_ENV === 'production') {
		return gulp.src(['src/js/jqm-and-i18next-init.js', 'src/js/app.js'])
		//TODO
		.pipe(gulp.dest('www/js'));
	} else {
		return gulp.src(['src/**/*', '!src/template', '!src/index.html'])
			.pipe(gulp.dest('www'));
	}
});

gulp.task('default', ['build']);