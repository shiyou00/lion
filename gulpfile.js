//引入相关插件
var gulp = require('gulp');
var rename = require('gulp-rename');   //文件重命名
var uglify = require('gulp-uglify');   //JS代码压缩
var minCSS = require('gulp-clean-css'); //CSS代码压缩
var autoprefixer = require('gulp-autoprefixer');  //添加浏览器前缀
var clean   = require('gulp-clean');     //清空文件
var cleanDest = require('gulp-clean-dest'); //清空dist目录指定文件
var changed = require('gulp-changed');  //仅仅传递更改过的文件
const filter = require('gulp-filter');   //js压缩过滤器，排除已压缩过的
var scss = require('gulp-sass');  //处理sass文件
var browserSync = require('browser-sync'); //拥有实时重载服务器
var reload = browserSync.reload;  //编译后重新刷新浏览器

var pageSrc = './src/html/**/*.html';
var pageDist = './dist/html/';
var imgSrc = './src/img/**/*';
var imgDist = './dist/img/';
var jsSrc = './src/js/**/*.js';
var jsDist = './dist/js/';
var cssSrc = './src/css/**/*.css';
var cssDist = './dist/css/';
var sassSrc = './src/scss/**/*.scss';
var sassDist = './src/css/';

gulp.task('html', function() {  //拷贝html
    return gulp.src(pageSrc)
        .pipe(changed(pageDist))
        .pipe(cleanDest(pageDist))//先清空后生成
        .pipe(gulp.dest(pageDist))
        .pipe(reload({ stream:true }));
});

gulp.task('img', function() {
    return gulp.src(imgSrc)
        .pipe(changed(imgDist))
        .pipe(cleanDest(imgDist))//先清空后生成
        .pipe(gulp.dest(imgDist))
});

//对已经压缩过的文件进行过滤，不再压缩
var  jsFilter = filter([jsSrc, '!src/js/**/*.min.js'], {restore: true});
gulp.task('js', function() {  //拷贝压缩js
    return gulp.src(jsSrc)
        // .pipe(changed(jsDist))
        .pipe(cleanDest(jsDist))//先清空后生成
        // .pipe(jsFilter)
        // 这会输出一个未压缩过的版本
        // .pipe(gulp.dest(jsDist))
        // .pipe(jsFilter.restore)
        .pipe(gulp.dest(jsDist))
        // .pipe(reload({ stream:true }));
});
gulp.task('css', function() {  //拷贝压缩css
    return gulp.src(cssSrc)
        .pipe(changed(cssDist))
        .pipe(cleanDest(cssDist))//先清空后生成
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        // 这会输出一个未压缩过的版本
        .pipe(gulp.dest(cssDist))
        .pipe(minCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(cssDist))
        .pipe(reload({ stream:true }));
});
gulp.task('scss', function () {  //将sass文件编译成css
    return gulp.src(sassSrc)
        .pipe(changed(sassSrc))
        .pipe(cleanDest(sassDist))//先清空后生成
        .pipe(scss())
        .pipe(gulp.dest(sassDist))
        .pipe(reload({ stream:true }));
});

//清除dist目录
gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

//初始化时，批量执行多个操作
gulp.task('build', ['html','scss', 'css','js','img']);

//开启本地服务器监视文件改动
gulp.task('serve', function() {
    browserSync({
        open:false,
        server: {
            baseDir: '',
            index : "/index.html"  //将dist目录下的index.html作为入口页面访问
        }
    });
});

//启动项目，命令:gulp start ,
gulp.task('start',['clean'], function() {
    gulp.start(['build','serve']);
    gulp.watch(pageSrc, ['html']);
    gulp.watch(sassSrc, ['scss']);
    gulp.watch(cssSrc, ['css']);
    gulp.watch(jsSrc, ['js']);
    gulp.watch(imgSrc, ['img']);
});
