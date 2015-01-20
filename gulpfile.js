var gulp = require('gulp')
	, jsdoc = require('gulp-jsdoc');

gulp.task('default', function() {

  gulp.src("./*.js")
  	.pipe(jsdoc('./docs', {}, '', {
  		showPrivate: true
  	}));

});