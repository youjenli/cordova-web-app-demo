var path = require('path'),
	gulp = require('gulp'),
	mainBowerFiles = require('gulp-main-bower-files'),
	clean = require('gulp-clean'),
	print = require('gulp-print'),
	inject = require('gulp-inject'),
	cheerio = require('gulp-cheerio'),
	requirejsOptimize = require('gulp-requirejs-optimize'),
	sourceMaps = require('gulp-sourcemaps')
	;

var	debugMinifiedCode = false,
	srcPath = 'src/',
	appPath = 'www/',
	appContent = [
		srcPath + "lib/**/*.css",
		srcPath + "lib/**/images/*",
		srcPath + "lib/**/*.gif",
		srcPath + "lib/requirejs/require.js",
		srcPath + "css/**/*",
		srcPath + "images/**/*",
		srcPath + "locales/**/*"
	],
	pathOfLibs = srcPath + 'lib',
	taskDependencies
	;
var rjsConfig = require('./src/js/requirejs-config.js');

//process.env.NODE_ENV = "production";
switch(process.env.NODE_ENV) {
	case "production":
		taskDependencies = ['mainBowerFiles', 'mainPage', 'optimize'];
		break;
	case "development":
	default:
		process.env.NODE_ENV = "development";
		taskDependencies = ['mainBowerFiles', 'mainPage'];
		appContent.push(srcPath + "lib/**/*.js",
						srcPath + "js/**/*");
		break;
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
		//將各模組的樣板寫入到主頁中, 形成 SPA
		.pipe(inject(
					gulp.src([srcPath + 'template/**/*.html', 
						'!' + srcPath + 'template/delivery/generalDelivery.html']),
					{
						starttag: '<!-- inject:body:{{ext}} -->',
						transform: function (filePath, file) {
							// return file contents as string
							return file.contents.toString('utf8')
						}
					}
		))
		//使用 cheerio 替換頁面上的 backbone 路徑
		.pipe(cheerio(function($, file){
				//載入各模組的設定檔
				var system = require('./src/js/system/config.js');
				var delivery = require('./src/js/project/dev/config.js');
				
				$("[data-backbone-route]").each(function(idx, element){
					var configOfRoute = $(element).attr("data-backbone-route");
					var keyOfRoute = configOfRoute.split(".");
					if(keyOfRoute.length < 2){
						console.log("Configuration of route : " + configOfRoute + " is not valid.");
						return;
					}
					var routePath;
					switch(keyOfRoute[0]){
						case "delivery":
							routePath = delivery[keyOfRoute[1]].route.path;
							break;
						case "system":
							routePath = system[keyOfRoute[1]].route.path;
							break;
						default:
							console.log("Application package " + keyOfRoute[0] + " is not valid.");
							break;
					}
					if(routePath != null){
						$(element).attr("href", "#" + routePath).removeAttr("data-backbone-route");
						console.log("Configure route id " + configOfRoute + ".route.path with path " + routePath);
					}
				});
			})
		)
		.pipe(gulp.dest(appPath));
});

gulp.task('optimize', ['mainBowerFiles'], function(){
	if (debugMinifiedCode) {
		return gulp.src([srcPath + 'js/boot.js'])
			.pipe(sourceMaps.init())
			.pipe(requirejsOptimize({
					baseUrl:path.join(__dirname, srcPath, rjsConfig.baseUrl),
					paths:rjsConfig.paths,
					optimize:"uglify2"
				}
			))
			.pipe(sourceMaps.write())
			.pipe(gulp.dest(appPath + 'js'));
	} else {
		return gulp.src([srcPath + 'js/boot.js'])
			.pipe(requirejsOptimize({
					baseUrl:path.join(__dirname, srcPath, rjsConfig.baseUrl),
					paths:rjsConfig.paths,
					optimize:"uglify2"
				}
			))
			.pipe(gulp.dest(appPath + 'js'));
	}	
});

gulp.task('prepare', taskDependencies, function(){
	return gulp.src(appContent, {base:srcPath})
			.pipe(gulp.dest(appPath));
});

gulp.task('default', ['prepare']);