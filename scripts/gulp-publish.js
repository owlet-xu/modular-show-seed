const gulp = require('gulp');
const shell = require('gulp-shell');
const jsonEditor = require('gulp-json-editor');
const del = require('del');
const config = {
  npmPublish: {
    ip: 'http://nexus.xgychina.com/repository/npm-hosted/',
    username: 'deployment',
    password: '123456',
    email: 'deployment@xgychina.com'
  }
};

// 清理发布目录
gulp.task('clean', () => {
  return del(['publish'])
});

// 清除package.json中不需要的属性
gulp.task('editPackage', ['clean'], () => {
  return gulp.src('package.json')
    .pipe(jsonEditor({
      'scripts': '',
      'dependencies': '',
      'devDependencies': '',
      'config': ''
    }))
    .pipe(gulp.dest('publish'))
});

// 复制打包目录
gulp.task('copy', ['editPackage'], () => {
  return gulp.src('dist/**')
    .pipe(gulp.dest('publish/dist'))
});

gulp.task('npmSetConfig',  ['copy'], shell.task([
  'npm set //' + config.npmPublish.ip + '/:username=' + config.npmPublish.username,
  'npm set //' + config.npmPublish.ip + '/:_password=' + config.npmPublish.password,
  'npm set //' + config.npmPublish.ip + '/:email=' + config.npmPublish.email,
  'npm set //' + config.npmPublish.ip + '/:always-auth=false',
]));

gulp.task('npmPublish', ['npmSetConfig'], shell.task([
  'cd publish && npm publish --registry=http://nexus.xgychina.com/repository/npm-hosted/'
]));