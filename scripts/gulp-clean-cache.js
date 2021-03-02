const gulp = require('gulp');
const del = require('del');

// 启动或build的时候保证cache被清除掉
gulp.task('cleanCache', () => {
  return del(['node_modules/.cache'])
});