var path = require('path'),
	gulp = require('gulp'),
	mainBowerFiles = require('gulp-main-bower-files'),
	clean = require('gulp-clean'),
	print = require('gulp-print'),
	inject = require('gulp-inject'),
	cheerio = require('gulp-cheerio'),
	concat = require('gulp-concat'),
	cssNano = require('gulp-cssnano'),
	requirejsOptimize = require('gulp-requirejs-optimize'),
	sourceMaps = require('gulp-sourcemaps')
	;

var	debugMinifiedCode = false,
	srcPath = 'src/',
	appPath = 'www/',
	appContent = [
		srcPath + "lib/**/images/*",
		srcPath + "lib/**/*.gif",
		srcPath + "lib/requirejs/require.js",
		srcPath + "images/**/*",
		srcPath + "locales/**/*"
	],
	pathOfLibs = srcPath + 'lib',
	buildTaskDependencies,
	mainPageTaskDependencies
	;
var rjsConfig = require('./src/js/requirejs-config.js');

//process.env.NODE_ENV = "production";
switch(process.env.NODE_ENV) {
	case "production":
		buildTaskDependencies = ['mainBowerFiles', 'optimizeJS', 'optimizeCSS', 'mainPage'];
		mainPageTaskDependencies = ['clean', 'optimizeJS', 'optimizeCSS'];
		break;
	case "development":
	default:
		process.env.NODE_ENV = "development";
		buildTaskDependencies = ['mainBowerFiles', 'mainPage'];
		mainPageTaskDependencies = ['clean'];
		appContent.push(srcPath + "lib/**/*.js",
						srcPath + "lib/**/*.css",
						srcPath + "css/main.css",
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

gulp.task('optimizeCSS', ['mainBowerFiles'], function(){
	var compressedCssFileName = 'main.css';
		
	var gulpSrc = gulp.src([
			srcPath + "lib/jquery-mobile-for-synnex/jquery-mobile-theme-for-synnex.css",
			srcPath + "lib/jquery-mobile-for-synnex/jquery.mobile.icons.css",
			srcPath + "lib/jquery-mobile-for-synnex/jquery.mobile.structure.css",
			srcPath + "css/main.css"
		]).pipe(concat(compressedCssFileName));
		
	if (debugMinifiedCode) {
		gulpSrc
			.pipe(sourceMaps.init())
			.pipe(cssNano())
			.pipe(sourceMaps.write())
	} else {
		gulpSrc.pipe(cssNano())
	}
	return gulpSrc.pipe(gulp.dest(appPath + 'css'));
});

gulp.task('optimizeJS', ['mainBowerFiles'], function(){
	var requirejsOptimizeConfig = {
			baseUrl:path.join(__dirname, srcPath, rjsConfig.baseUrl),
			paths:rjsConfig.paths,
			optimize:"uglify2"
	};
	var gulpSrc = gulp.src([srcPath + 'js/boot.js']);
	
	if (debugMinifiedCode) {
		gulpSrc
			.pipe(sourceMaps.init())
			.pipe(requirejsOptimize(requirejsOptimizeConfig))
			.pipe(sourceMaps.write())
	} else {
		gulpSrc
			.pipe(requirejsOptimize(requirejsOptimizeConfig))
	}
	
	return gulpSrc.pipe(gulp.dest(appPath + 'js'));
});

gulp.task('mainPage', mainPageTaskDependencies, function(){
	var spaFileName = 'index.html';
	return gulp.src(srcPath + spaFileName)
		//將各模組的樣板寫入到主頁中, 形成 SPA
		.pipe(inject(
				gulp.src([srcPath + 'template/**/*.html', 
					'!' + srcPath + 'template/delivery/generalDelivery.html']),
				{
					starttag: '<!-- inject:body:{{ext}} -->',
					transform: function (filePath, file) {
						// return file contents as string
						console.log("Inject " + filePath + " into " + spaFileName);
						return file.contents.toString('utf8')
					}
				}
		))
		//根據頁面上的 route id 替換對應設定中的 backbone 路徑
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
		).pipe(gulp.dest(appPath));
});

gulp.task('build', buildTaskDependencies, function(){
	return gulp.src(appContent, {base:srcPath})
			.pipe(gulp.dest(appPath));
});

gulp.task('default', ['build']);