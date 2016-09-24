'use strict';

let gulp = require('gulp');

let tasks = [
  'apiDocs',
  'nodemon',
  'lint',
  'watch',
];

gulp.task('default', tasks);
