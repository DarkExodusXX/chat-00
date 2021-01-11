import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import del from 'del';
import browserify from 'gulp-browserify';
import babelify from 'babelify';

const paths = {
  styles: {
    src: 'assets/scss/styles.scss',
    dest: 'src/static/styles',
    watch: 'assets/scss/**/*.scss'
  },
  js: {
    src: 'assets/js/main.js',
    dest: 'src/static/js',
    watch: 'assets/scss/**/*.js'
  }
};

const styles = () => {
  return gulp.src(paths.styles.src)
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(csso())
    .pipe(gulp.dest(paths.styles.dest));
};

const clean = () => {
  return del(['src/static']);
};

const js = () => {
  return gulp.src(paths.js.src)
    .pipe(browserify({
      transform: [
        babelify.configure({
          presets: ['@babel/preset-env']
        })
      ]
    }))
    .pipe(gulp.dest(paths.js.dest));
};

const watchFiles = () => {
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.js.watch, js);
};

const dev = gulp.series(clean, styles, js, watchFiles);

export const prod = gulp.series(clean, styles, js);

export default dev;
