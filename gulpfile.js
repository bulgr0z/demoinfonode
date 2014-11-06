var gulp = require('gulp')
	, jsdoc = require('gulp-jsdoc');

gulp.task('default', function() {
  console.log("gulped ?")

  gulp.src("./*.js")
  	.pipe(jsdoc('./docs', {}, '', {
  		showPrivate: true
  	}));

});