const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const pug = require("gulp-pug");
const reload = browserSync.reload;
const plumber = require("gulp-plumber");
const sassGlob = require("gulp-sass-glob");
const watch = require("gulp-watch");

gulp.task("sass", function() {
  return watch("./css/**/*.scss", function() {
    gulp
      .src("./css/main.scss")
      .pipe(plumber())
      .pipe(sassGlob())
      .pipe(sass().on("error", sass.logError))
      .pipe(
        autoprefixer({
          browsers: ["last 2 versions"],
          cascade: false
        })
      )
      .pipe(gulp.dest("./css/"))
      .pipe(reload({ stream: true }));
  });
});

gulp.task("pug", () => {
  gulp
    .src("./views/pages/*.pug")
    .pipe(plumber())
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest("."))
    .pipe(reload({ stream: true }));
});

gulp.task("serve", function() {
  browserSync.init({
    server: {
      baseDir: "./",
      open: false
    }
  });
});

gulp.task("watch", () => {
  gulp.watch("./css/**/*.scss", gulp.series("sass"));
  gulp.watch("./views/**/*.pug", gulp.series("pug"));
});

gulp.task("default", gulp.series("serve", "sass", "pug", "watch"));
