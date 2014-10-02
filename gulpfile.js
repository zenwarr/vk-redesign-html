var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var spritesmith = require('gulp.spritesmith');
var clean = require('gulp-clean');
var sync_files = require('gulp-sync-files');
var plumber = require('gulp-plumber');

var styles_input = 'src/styles';
var styles_output = 'css';
var images_input = 'src/img';
var images_output = 'img';
var scripts_input = 'src/scripts';
var scripts_output = 'js';
var sprites = ['sprite'];

function onError(err) {
  console.log(err)
}

gulp.task('sass', function() {
  gulp.src(styles_input + '/*.sass')
      .pipe(plumber({
        errorHandler: onError
      }))
      .pipe(sass({
        style: 'expanded'
      }))
      .pipe(autoprefixer(
        'last 2 versions', '> 1%', 'ie 8'
      ))
      .pipe(gulp.dest(styles_output))
      .pipe(livereload());
});

gulp.task('raw_css', function() {
  gulp.src(styles_input + '/*.css')
      .pipe(autoprefixer(
        'last 2 versions', '> 1%', 'ie 8'
      ))
      .pipe(gulp.dest(styles_output))
      .pipe(livereload());
})

gulp.task('js', function() {
  gulp.src(scripts_input + '/*')
      .pipe(gulp.dest(scripts_output))
      .pipe(livereload());
});

gulp.task('html', function() {
  gulp.src('*.html')
      .pipe(livereload());
});

gulp.task('images', function() {
  gulp.src(images_input + '/*.*')
      .pipe(sync_files({
        src: images_input,
        dest: images_output
      }))
      .pipe(gulp.dest(images_output))
      .pipe(livereload());

  gulp.src(images_input + '/content/*.*')
      .pipe(sync_files({
        src: images_input + '/content',
        dest: images_output + '/content'
      }))
      .pipe(gulp.dest(images_output + '/content'))
      .pipe(livereload());
});

for (var j = 0; j < sprites.length; ++j) {
  var sprite_name = sprites[j];
  gulp.task('sprite-' + sprite_name, function() {
    var sprite_data = gulp.src(images_input + '/' + sprite_name + '/*.png')
        .pipe(spritesmith({
          imgName: sprite_name + '.png',
          cssName: 'sprites/' + sprite_name + '.sass',
          algorithm: 'binary-tree',
          padding: 5,
          imgPath: '../img/sprites/' + sprite_name + '.png'
        }));

    sprite_data.img.pipe(gulp.dest(images_output));
    sprite_data.css.pipe(gulp.dest(styles_input));
  });
}

gulp.task('sprites', function() {
  for (var j = 0; j < sprites.length; ++j) {
    gulp.start('sprite-' + sprites[j]);
  }
});

gulp.task('watch', function() {
  gulp.watch(styles_input + '/**', ['sass']);
  gulp.watch(scripts_input + '/**', ['js']);
  gulp.watch(images_input + '/*.*', ['images']);
  gulp.watch(images_input + '/content/*.*', ['images']);
  gulp.watch('*.html', ['html']);

  for (var j = 0; j < sprites.length; ++j) {
    var sprite_name = sprites[j];
    gulp.watch(images_input + '/' + sprite_name + '/*.png',
               ['sprite-' + sprite_name]);
  }
});

gulp.task('default', function() {
  gulp.start('html', 'sass', 'raw_css', 'js', 'sprites', 'images', 'watch');
});
