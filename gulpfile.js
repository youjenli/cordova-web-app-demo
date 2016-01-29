var gulp = require('gulp'),
	mainBowerFiles = require('gulp-main-bower-files'),
	clean = require('gulp-clean'),
	sourceMaps = require('gulp-sourcemaps'),
	print = require('gulp-print'),
	requirejsOptimize = require('gulp-requirejs-optimize'),
	inject = require('gulp-inject'),
	processHtml = require('gulp-processhtml'),
	fs = require('fs')
	;

var	srcPath = 'src/',
	appPath = 'www/',
	appContent,
	pathOfLibs = srcPath + 'lib',
	tasksBeforePrepare
	;

if(!process.env.NODE_ENV) {
	//process.env.NODE_ENV = 'development';
	process.env.NODE_ENV = 'production';
}

gulp.task('clean', function () {
	return gulp.src([appPath + '/*', pathOfLibs + '/*'], {read: false})
		.pipe(clean());
});

gulp.task('mainBowerFiles', ['clean'], function(){
	return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
		.pipe(gulp.dest(pathOfLibs));
});

gulp.task('mainPage', ['clean'], function(){
	return gulp.src(srcPath + 'index.html')
		.pipe(processHtml())
		.pipe(inject(gulp.src([srcPath + 'template/dev/*.html']), {
			starttag: '<!-- inject:body:{{ext}} -->',
			transform: function (filePath, file) {
				// return file contents as string
				return file.contents.toString('utf8')
			}
		}))
		.pipe(gulp.dest(appPath));
});

gulp.task('optimizejs', ['mainBowerFiles'], function(){
	var rjsConfig = require('./rjs-config.json');
	return gulp.src([
			srcPath + 'js/boot.js'
		])
		//.pipe(sourceMaps.init())
		.pipe(requirejsOptimize(rjsConfig))
		//.pipe(sourceMaps.write())
		.pipe(gulp.dest(appPath + '/js'));
});

switch(process.env.NODE_ENV) {
	case "production":
		appContent = [
			srcPath + "lib/**/*.css",
			srcPath + "lib/**/images/*",
			srcPath + "lib/**/*.gif",
			srcPath + "lib/requirejs/require.js",
			srcPath + "css/**/*",
			srcPath + "images/**/*",
			srcPath + "locales/**/*",
			'!' + srcPath  + 'template',
			'!' + srcPath  + 'index.html'
		];
		tasksBeforePrepare = ['mainBowerFiles', 'mainPage', 'optimizejs'];
		break;
	case "development":
	default:
		appContent = [
			srcPath + '**/*', 
			'!' + srcPath  + 'template',
			'!' + srcPath  + 'index.html'
		];
		tasksBeforePrepare = ['mainBowerFiles', 'mainPage'];
		break;
}

gulp.task('prepare', tasksBeforePrepare, function(){
	return gulp.src(appContent, {base:srcPath})
			.pipe(gulp.dest(appPath));
});

gulp.task('default', ['prepare']);