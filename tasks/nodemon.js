'use strict';

let gulp = require('gulp');
let nodemon = require('gulp-nodemon');

gulp.task('nodemon', nodemonTask);

function nodemonTask(callback) {

  let options = {
    script: 'app/index.js',
    quiet: true,
    ext: 'js',
    ignore: [
      './docs',
    ],
    env: {
      ENV: 'development',
    },
  };

  let started = false;

  nodemon(options).on('start', setStartedStatus);

  function setStartedStatus() {
    if (!started){
      callback();
      started = true;
    }
  }
}
