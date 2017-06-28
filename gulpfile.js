'use strict'

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass');

var controller = 'a/s/styles.scss',
    path = 'a/s/';

// dev
gulp.task('sass', function(){
	return sass(
			controller,
			{
				style: 'nested', // nested, compact, compressed, expanded
				sourcemap: true,
			}
		)
    	.on('error', function (err) {
      		console.error('Error!', err.message);
   		})
    	.pipe(gulp.dest(path));
});
// dist
gulp.task('sass-dist', function() {
    return sass(
            controller, {
                style: 'compressed', // nested, compact, compressed, expanded
                sourcemap: false,
            }
        )
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        .pipe(autoprefixer({
            browsers: ['> 5%', 'last 5 versions'],
            cascade: true
        }))
        .pipe(gulp.dest(path));
});
// run
gulp.task('watch', function() {
    gulp.watch( path + '**/*.scss', ['sass'] );
});

gulp.task('help', function() {
    console.log('========== HELP ===========');
    console.log('');
    console.log('');
    console.log('Available Commands:');
    console.log('');
    console.log('- gulp');
    console.log('The default task will run watch on the /a/s/* directory looking for any changes, modifications, additions, or deletions involving .scss files. If a change has happened it will execute the sass task.');
    console.log('');
    console.log('- gulp dist');
    console.log('The sass task will compile core.scss located in the /a/s/* directory with distribution spec. You can run gulp sass for manual compiling');
    console.log('');
    console.log('');
    console.log('======== END HELP =========');
});

gulp.task('default', ['watch', 'sass']);
gulp.task('dist', ['sass-dist']);
