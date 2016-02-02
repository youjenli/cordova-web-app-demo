var gulp = require('gulp'),
	mainBowerFiles = require('gulp-main-bower-files'),
	clean = require('gulp-clean'),
	sourceMaps = require('gulp-sourcemaps'),
	print = require('gulp-print'),
	requirejsOptimize = require('gulp-requirejs-optimize'),
	inject = require('gulp-inject'),
	cheerio = require('gulp-cheerio')
	;

var	srcPath = 'src/',
	appPath = 'www/',
	appContent,
	cssSrcPaths,
	pathOfLibs = srcPath + 'lib',
	rjsConfig = require('./src/js/rjs-config.js'),
	tasksBeforePrepare
	;

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
		cssSrcPaths = [
			"lib/jquery-mobile-for-synnex/jquery-mobile-theme-for-synnex.min.css",
			"lib/jquery-mobile-for-synnex/jquery.mobile.icons.min.css",
			"lib/jquery-mobile-for-synnex/jquery.mobile.structure.min.css"
		];
		tasksBeforePrepare = ['mainBowerFiles', 'mainPage'/*, 'optimize'*/];
	case "development":
	default:
		process.env.NODE_ENV = "development";
		appContent = [
			srcPath + '**/*', 
			'!' + srcPath  + 'template',
			'!' + srcPath  + 'index.html'
		];
		cssSrcPaths = [
			"lib/jquery-mobile-for-synnex/jquery-mobile-theme-for-synnex.css",
			"lib/jquery-mobile-for-synnex/jquery.mobile.icons.css",
			"lib/jquery-mobile-for-synnex/jquery.mobile.structure.css"
		];
		rjsConfig.optimize = 'none';
		tasksBeforePrepare = ['mainBowerFiles', 'mainPage'];
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
		//.pipe(processHtml())
		//根據 production 或 development 的設定插入 css 檔案連結
		.pipe(inject(gulp.src(cssSrcPaths), {
				starttag: '<!-- inject:head:{{ext}} -->',
				transform: function(filePath, file){
						return filePath;
				}
			}
		))
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
	return gulp.src([
			srcPath + 'js/boot.js'
		])
		//.pipe(sourceMaps.init())
		.pipe(requirejsOptimize(rjsConfig))
		//.pipe(sourceMaps.write())
		.pipe(gulp.dest(appPath + '/js'));
});

gulp.task('prepare', tasksBeforePrepare, function(){
	return gulp.src(appContent, {base:srcPath})
			.pipe(gulp.dest(appPath));
});

gulp.task('default', ['prepare']);