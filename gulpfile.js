var gulp = require('gulp');
var watch = require('gulp-watch');

// fetch command line arguments
var arg = (function(argList) {

  var arg = {}, a, opt, thisOpt, curOpt;
  for (a = 0; a < argList.length; a++) {

    thisOpt = argList[a].trim();
    opt = thisOpt.replace(/^\-+/, '');

    if (opt === thisOpt) {

      // argument value
      if (curOpt) arg[curOpt] = opt;
      curOpt = null;

    }
    else {

      // argument name
      curOpt = opt;
      arg[curOpt] = true;

    }

  }

  return arg;

})(process.argv);

var cwd = arg.src;

if (!cwd) {
  throw new Error('Please provide a project path with a --cwd argument when running `gulp`');
}

// excludes all .psd files in source directory
var SOURCE_PATH = [cwd, '!' + cwd + '/**/*.psd']; 
var PRODUCTION_PATH = arg.production || 'production';
var STAGING_PATH = arg.staging || 'staging';

gulp.task('default', function() {
  return gulp.src(SOURCE_PATH)
          .pipe(watch(SOURCE_PATH, { ignoreInitial: false }))
          .pipe(gulp.dest(STAGING_PATH))
          .pipe(gulp.dest(PRODUCTION_PATH));
});