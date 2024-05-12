const gulp = require('gulp');
const chalk = require('chalk');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');

//全局配置
const config = {
	style: {
		src: [
			'./styles/base.wxss',
			'./styles/layout.wxss',
			'./styles/list.wxss',
			'./styles/form.wxss',
			'./styles/animate.wxss',
		],
		out: './'
	}
};

// 合并样式文件
gulp.task('build-style', function() {
	return gulp.src(config.style.src)
		.pipe(cleanCSS({
			advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
			inline: false,
			optimizeOutline: false,
			normalizeUrls: false,
			tidyAtRules: false,
			tidyBlockScopes: false,
			tidySelectors: false,
			restructureRules: true,
		}))
		.pipe(concat('app.wxss', {newLine: ''}))
		.pipe(gulp.dest(config.style.out));
});

// 合并样式文件：监听
gulp.task('build-style:watch', function() {
	console.log("监听文件(build-style)：");
	config.style.src.forEach(function(path) {
		console.log(path);
	});
	const watcher = gulp.watch(config.style.src, gulp.series('build-style'));
	watcher.on('change', function(e) {
		console.log(chalk.white("build-style(" + chalk.cyan('event:change') + ")："), chalk.green(e));
	});
	return gulp.series('build-style');
});

//默认执行
gulp.task('default', gulp.parallel('build-style:watch'));
