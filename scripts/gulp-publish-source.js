gulp.task('clean-dist', () => {
  return gulp.src('dist', { read: false }).pipe(clean());
});

gulp.task('copy-api', ['clean-dist'], () => {
  return gulp.src('src/api/**/*.ts').pipe(gulp.dest('dist/api'));
});

gulp.task('copy-assets', ['copy-api'], () => {
  return gulp.src('src/assets/imgs/*').pipe(gulp.dest('dist/assets/imgs'));
});

gulp.task('copy-common', ['copy-assets'], () => {
  return gulp.src('src/common/**/*').pipe(gulp.dest('dist/common'));
});

gulp.task('copy-components', ['copy-common'], () => {
  return gulp.src('src/components/**/*').pipe(gulp.dest('dist/components'));
});

gulp.task('copy-langs', ['copy-components'], () => {
  return gulp.src('src/lang/*.json').pipe(gulp.dest('dist/lang'));
});

gulp.task('copy-models', ['copy-langs'], () => {
  return gulp.src('src/models/**/*').pipe(gulp.dest('dist/models'));
});

gulp.task('copy-router', ['copy-models'], () => {
  return gulp.src('src/router/index.ts').pipe(gulp.dest('dist/router'));
});

gulp.task('copy-store', ['copy-router'], () => {
  return gulp.src('src/store/**/*').pipe(gulp.dest('dist/store'));
});

gulp.task('copy-utils', ['copy-store'], () => {
  return gulp.src('src/utils/**/*').pipe(gulp.dest('dist/utils'));
});

gulp.task('copy-views', ['copy-utils'], () => {
  return gulp.src('src/views/**/*').pipe(gulp.dest('dist/views'));
});


gulp.task('build-lib', ['copy-views'], (done) => {
  done();
});