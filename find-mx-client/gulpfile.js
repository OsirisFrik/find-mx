const gulp = require('gulp');
const connect = require('gulp-connect');

gulp.task('serve', function () {
  connect.server({
    root: './public',
    port: 4000,
    livereload: true,
  });
});

gulp.task('html', function () {
  gulp.src('/public/*.html')
  .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['/public/*.html'], ['html']);
});

gulp.task('default', ['server', 'watch']);
